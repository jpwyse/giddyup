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

	def __init__(self, ticker1, ticker2, period='1y', interval='1d', window=4):
		self.ticker1 = ticker1
		self.ticker2 = ticker2
		self.period = period
		self.interval = interval
		self.window = window

		self.tickers = [ticker1, ticker2]
		self.data = self.getData(tickers=self.tickers, period=period, interval=interval, window=window)


	def getData(self, tickers, period, interval, window):
		df = yf.download(tickers=tickers, period=period, interval=interval, group_by='ticker')
		df = df.stack(level=1)
		df = df.replace(',', '', regex=True)
		df = df.loc[(slice(None), 'Adj Close'), tickers]
		df = df.reset_index()
		df = df.drop(columns=['level_1'])
		df['Date'] = df['Date'].dt.date
		df = df.set_index(['Date'])
		df['Correlation'] = (df[self.ticker1].rolling(window=window).corr(df[self.ticker2], pairwise=True))
		df['Covariance'] = df[self.ticker1].rolling(window=window).cov(df[self.ticker2], pairwise=True) * -1
		df[f"{self.ticker1}PctChange"] = df[self.ticker1].pct_change().mul(100)
		df[f"{self.ticker2}PctChange"] = df[self.ticker2].pct_change().mul(100)
		
		objs = df.select_dtypes(object).columns
		df[objs] = df[objs].apply(pd.to_numeric, errors='coerce')
		df = df.fillna(0)
		df = df.round(5)
		#df.columns = df.columns.str.replace("^", "")
		df = df.reset_index()

		return df

