import pandas as pd
from ninja import Router
from ninja.errors import HttpError
from . views import ZeroDteData

# Create your api's here.

router = Router()

@router.get("/get/{symbol}")
def get_zero_dte(request, symbol: str):
	if symbol == 'SPY':
		asset_type = 'etf-funds'
		quote_ticker = symbol

	if symbol == 'QQQ':
		asset_type = 'etf-funds'
		quote_ticker = symbol

	if symbol == '$SPX':
		asset_type = 'stocks'
		quote_ticker = '^GSPC'

	try:
		zero = ZeroDteData(symbol=symbol, asset_type=asset_type, quote_ticker=quote_ticker)
	except Exception as error:
		print(error)
		raise HttpError(417, "Error retrieving ticker 0dte data.")
	else:
		data = zero.data
		expiry_date = zero.front_expiration
		spot = zero.spot_price
		period = zero.period
		return {'data': data, 'date': expiry_date, 'spot_price': spot, 'period': period}
