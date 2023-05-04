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

# Create your views here.


class VolSpread():

	def __init__(self, tickers, period, indpv='SVXY'):
		self.tickers = tickers
		self.period = period
		self.indpv = indpv
		self.data = self.getSpreadData()

	def getSpreadData(self):
		df = yf.download(tickers=self.tickers, period=self.period)
		df = df.loc[:, ('Adj Close', self.tickers)]
		df = df.droplevel(0, axis=1)

		for tick in self.tickers:
			if tick != self.indpv:
				df[f"{tick}-{self.indpv}"] = (df[self.indpv] - df[tick]).abs()

		cols = df.columns.tolist()
		df['Sum'] = df[cols].sum(axis=1)
		df['SumDiff'] = df['Sum'].diff()
		#df.columns = df.columns.str.replace('^', '')
		df = df.round(0)
		df = df.reset_index()
		df = df.dropna()
		df['Date'] = df['Date'].dt.date
		return df
