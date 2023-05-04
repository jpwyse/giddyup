from datetime import date
from typing import List
from ninja import Router, Schema, ModelSchema, Form
from ninja.orm import create_schema
from pydantic import Field

# Create your schemas's here.

class VolSpreadSchema(Schema):
	period: str = '1y'
	tickers: List[str] = Field(None, alias="tickers")
	