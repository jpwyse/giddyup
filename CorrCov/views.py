import traceback
import time
import timeit
import os
import math
from datetime import datetime, timedelta
from dateutil.relativedelta import *
import numpy as np
import pandas_market_calendars as mcal
import pandas as pd 
import yfinance as yf


class CorrCov():

	def __init__(self, ticker1, ticker2, inverse=False, period='1y', interval='1d', window=4):
		self.ticker1 = ticker1
		self.ticker2 = ticker2
		self.inverse = inverse
		self.period = period
		self.interval = interval
		self.window = window

		self.tickers = [ticker1, ticker2]
		self.data = self.getData(tickers=self.tickers, period=period, interval=interval, window=window)


	def getData(self, tickers, period, interval, window):
		df = yf.download(tickers=tickers, period=period, interval=interval, group_by='ticker')

		# Defensive: Stop if empty
		if df.empty:
			raise ValueError("No data retrieved from yfinance")

		# Use future_stack to avoid deprecation warning
		df = df.stack(level=1, future_stack=True)

		# Keep only rows where the column level is 'Close'
		df = df[df.index.get_level_values(1) == 'Close']

		# Flatten structure: index = date, columns = tickers
		df = df.reset_index(level=1, drop=True)
		df.columns.name = None  # remove multi-index column name

		# Defensive: ensure tickers exist in DataFrame
		if self.ticker1 not in df.columns or self.ticker2 not in df.columns:
			raise ValueError(f"One or both tickers not found in data: {df.columns.tolist()}")

		# Correlation & Covariance calculation
		if self.inverse:
			df['Correlation'] = df[self.ticker1].rolling(window=window).corr(df[self.ticker2]) * -1
			df['Covariance'] = df[self.ticker1].rolling(window=window).cov(df[self.ticker2]) * -1
		else:
			df['Correlation'] = df[self.ticker1].rolling(window=window).corr(df[self.ticker2])
			df['Covariance'] = df[self.ticker1].rolling(window=window).cov(df[self.ticker2])

		# Clean up types and structure
		objs = df.select_dtypes(object).columns
		df[objs] = df[objs].apply(pd.to_numeric, errors='coerce')
		df = df.fillna(0)
		df = df.round(5)
		df = df.reset_index()

		return df



	# def getData(self, tickers, period, interval, window):
	# 	try:
	# 		print("fetching data")
	# 		df = yf.download(tickers=tickers, period=period, interval=interval, group_by='ticker')
	# 		print(df.head())
	# 	except Exception as e:
	# 		print(f"Error: {e}")

	# 	# df = df.stack(level=1)
	# 	# df = df.replace(',', '', regex=True)
	# 	# df = df.loc[(slice(None), 'Close'), tickers]
	# 	# df = df.reset_index()
	# 	# df = df.drop(columns=['level_1'])
	# 	# df['Date'] = df['Date'].dt.date
	# 	# df = df.set_index(['Date'])

	# 	# Use future_stack=True to avoid the FutureWarning
	# 	df = df.stack(level=1, future_stack=True)

	# 	# Keep only 'Close' prices
	# 	df = df[df.index.get_level_values(1) == 'Close']

	# 	# Pivot to wide format (tickers as columns, Date as index)
	# 	df = df.reset_index(level=1, drop=True)
	# 	#df = df.pivot(columns=[tickers], values='Close')
	# 	df = df.unstack().transpose()['Close'].transpose()

	# 	# Ensure Date is a proper index and clean
	# 	df.index.name = 'Date'
	# 	df = df.sort_index()


	# 	if self.inverse:
	# 		df['Correlation'] = (df[self.ticker1].rolling(window=window).corr(df[self.ticker2], pairwise=True)) * -1
	# 		df['Covariance'] = df[self.ticker1].rolling(window=window).cov(df[self.ticker2], pairwise=True) * -1
	# 	else:
	# 		df['Correlation'] = (df[self.ticker1].rolling(window=window).corr(df[self.ticker2], pairwise=True))
	# 		df['Covariance'] = df[self.ticker1].rolling(window=window).cov(df[self.ticker2], pairwise=True)
		
	# 	objs = df.select_dtypes(object).columns
	# 	df[objs] = df[objs].apply(pd.to_numeric, errors='coerce')
	# 	df = df.fillna(0)
	# 	df = df.round(5)
	# 	df = df.reset_index()
		
	# 	return df

