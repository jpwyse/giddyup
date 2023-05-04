import pandas as pd
from ninja import Router, Query
from ninja.errors import HttpError
from typing import List
from . schema import VolSpreadSchema
from . views import VolSpread

# Create your api's here.

router = Router()

@router.get("/spread")
def spread(request, query: VolSpreadSchema = Query(...)):
	tickers = query.tickers
	if len(tickers) == 1:
		tickers.append('UVXY')
	try:
		spread = VolSpread(tickers=tickers, period=query.period)
		df = spread.data
	except Exception as error:
		print(error)
		raise HttpError(417, "Error retrieving volspread data.")
	else:
		sum_quant = df['Sum'].quantile([0.1, 0.25, 0.5, 0.75, 0.9, 0.95, 0.99])
		q10 = sum_quant.iloc[0]
		q25 = sum_quant.iloc[1]
		q50 = sum_quant.iloc[2]
		q75 = sum_quant.iloc[3]
		q90 = sum_quant.iloc[-3]
		q95 = sum_quant.iloc[-2]
		q99 = sum_quant.iloc[-1]
		data = df.to_dict(orient='index')
		return {'data': data, 'q10': q10, 'q25': q25, 'q50': q50, 'q75': q75, 'q90': q90, 'q95': q95, 'q99': q99}
