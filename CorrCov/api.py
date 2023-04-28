import pandas as pd
from ninja import Router
from ninja.errors import HttpError
from . views import CorrCov

# Create your api's here.

router = Router()


@router.get("/get/")
def get_corrcov(request, auth: bool = False, ticker1: str = 'SPY', ticker2: str = '^VIX', period: str = '1y', interval: str = '1d', window: int = 4):
	try:
		corrcov = CorrCov(ticker1=ticker1, ticker2=ticker2, period=period, interval=interval, window=window)
		df = corrcov.data
		if auth:
			data = df.to_dict(orient='index')
			return {'data': data}
		else:
			df = df.iloc[:-1]
			data = df.to_dict(orient='index')
			return {'data': data}

	except Exception as error:
		print(error)
		raise HttpError(417, "Error retrieving stat data.")





