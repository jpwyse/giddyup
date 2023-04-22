import traceback
import time
import timeit
import os
import math
import requests
import json
import itertools
import urllib.request
from urllib.parse import unquote
from datetime import date, datetime, timedelta
from dateutil.relativedelta import *
import pandas as pd
import pandas_market_calendars as mcal
import yfinance as yf
from http import HTTPStatus
from django.core.exceptions import PermissionDenied, BadRequest, ObjectDoesNotExist
from django.http import HttpResponse
#from django_pandas.io import read_frame

# Create your views here.

class BarchartAPI():

	def __init__(self):
		self.session = requests.Session()
		self.getheaders = {
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
			'accept-encoding': 'gzip, deflate, br',
			'accept-language': 'en-US,en;q=0.9',
			'cache-control': 'max-age=0',
			'upgrade-insecure-requests': '1',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'
		}
		self.getpay = {
			'page': 'all'
		}
		self.headers = {
			'accept': 'application/json',
			'accept-encoding': 'gzip, deflate, br',
			'accept-language': 'en-US,en;q=0.9',
			'referer': None,
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36',
			'x-xsrf-token': None 
		}

	def sendRequest(self, request_url, response_url, params):
		session = self.session
		request = session.get(request_url, params=self.getpay, headers=self.getheaders)
		request.raise_for_status()
		headers = self.headers
		headers['x-xsrf-token'] = unquote(unquote(request.cookies.get_dict()['XSRF-TOKEN']))
		response = session.get(response_url, params=params, headers=headers)
		return response


class ZeroDteData(BarchartAPI):

	def __init__(self, symbol, asset_type, quote_ticker):
		super().__init__()

		today = date.today()
		next_day = today + timedelta(days=1)
		self.today = date.today().strftime("%Y-%m-%d")
		self.next_day = next_day.strftime("%Y-%m-%d")

		self.symbol = symbol
		self.asset_type = asset_type
		self.quote_ticker = quote_ticker
		self.period = 'weekly'

		self.request_url = 'https://www.barchart.com/{}/quotes/{}/options'.format(self.asset_type, self.symbol)
		self.response_url = 'https://www.barchart.com/proxies/core-api/v1/options/get'
		self.options_fields = 'strikePrice,volume,openInterest,volumeOpenInterestRatio,volatility,optionType'
		self.greeks_fields = 'strikePrice,theoretical,delta,gamma,rho,theta,vega,optionType,'

		
		self.derivs_params = {
			'baseSymbol': self.symbol,
			'fields': None,
			'groupBy': 'optionType',
			'expirationDate': None,
			'meta': 'expirations',
			'orderBy': 'strikePrice',
			'orderDir': 'asc',
			'raw': None
		}

		self.front_expiration = self.getFrontExpiration()
		self.spot_price = self.getSpotPrice(ticker=self.quote_ticker)
		
		self.options_data = self.getDerivativesData(fields=self.options_fields, data_type='options')
		self.greeks_data = self.getDerivativesData(fields=self.greeks_fields, data_type='greeks')
		self.zero_dte_dataframe = pd.concat([self.options_data, self.greeks_data], axis=1)

		self.call_dataframe = self.zero_dte_dataframe.loc[('Call', slice(None)), :]
		self.put_dataframe = self.zero_dte_dataframe.loc[('Put', slice(None)), :]

		self.calls_data = self.getChartData(dataframe=self.call_dataframe, contract='call')
		self.puts_data = self.getChartData(dataframe=self.put_dataframe, contract='put')

		self.dataframe = self.getChartDataTotals(calls=self.calls_data, puts=self.puts_data)
		self.data = self.dataframe.to_dict(orient='index')

		
	def requestData(self, fields, expiration_date='nearest'):
		params = self.derivs_params
		params['fields'] = fields
		params['expirationDate'] = expiration_date

		response = super().sendRequest(request_url=self.request_url, response_url=self.response_url, params=params)
		if response.status_code == 429:
			print("API Request taking quick nap...")
			time.sleep(10)
			print("API Request firing up again for second try...")
			try:
				response = super().sendRequest(request_url=self.request_url, response_url=self.response_url, params=params)
				response.raise_for_status()
			except Exception:
				print(traceback.format_exc())
				return response
			else:
				json = response.json()
				return json

		elif response.status_code == 200:
			json = response.json()
			return json
		else:
			print(response.status_code)
			return response


	def getSpotPrice(self, ticker):
		ticker = yf.Ticker(ticker)
		price = ticker.history(period='1d')
		spot = price['Close'][0]
		spot_price = spot.round(4)
		return spot_price


	def getFrontExpiration(self):
		json = self.requestData(fields=self.options_fields)
		expirys = json['meta']['expirations']
		expirations = list(itertools.chain(*expirys.values()))
		front_expiration = expirations[0]
		return front_expiration


	def cleanData(self, data):
		dataframes = []
		for opt_type in data.keys():
			df = pd.json_normalize(data, record_path=opt_type)
			df = df.replace(['%', ','], '', regex=True)
			df = df.set_index(['optionType', 'strikePrice'])
			dataframes.append(df)

		df = pd.concat(dataframes)
		df.sort_index(inplace=True)
		objs = df.select_dtypes(object).columns
		df[objs] = df[objs].apply(pd.to_numeric, errors='coerce')
		df = df.fillna(0)
		return df


	def getDerivativesData(self, data_type, fields):
		print(f"Getting {data_type} data for {self.symbol}.")
		json = self.requestData(fields=fields, expiration_date=self.front_expiration)
		data = json['data']
		if isinstance(data, dict):
			df = self.cleanData(data=data)
			return df
		else:
			print(f"Error with {data_type} data json response - did not return a dictionary.")
			return data
		

	def getChartData(self, dataframe, contract):
		df = dataframe
		cols = df.columns.tolist()
		for col in cols:
			df = df.rename(columns={col: f"{contract}{col.capitalize()}"})

		if contract == 'call':
			k = 1
		else:
			k = -1

		df[f"{contract}Gamma$"] = df[f"{contract}Openinterest"] * df[f"{contract}Gamma"] * 100 * self.spot_price * k
		df[f"{contract}Gamma%"] = df[f"{contract}Openinterest"] * df[f"{contract}Gamma"] * 100 * (self.spot_price ** 2) * 0.01 * k
		df = df.reset_index()
		df['strikePrice'] = pd.to_numeric(df['strikePrice'])
		return df


	def getChartDataTotals(self, calls, puts):
		df = pd.concat([calls, puts], axis=1)
		df['totalGamma$'] = df['callGamma$'] + df['putGamma$']
		df['totalGamma%'] = df['callGamma%'] + df['putGamma%']
		df = df.T.drop_duplicates().T
		df = df.round(4)
		return df


