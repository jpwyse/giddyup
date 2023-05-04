from ninja import NinjaAPI
from Users.api import router as auth_router
from ZeroDte.api import router as zero_dte_router
from CorrCov.api import router as corrcov_router
from Volatility.api import router as volatility_router

# Create your router's here.

api = NinjaAPI()

api.add_router("/auth/", auth_router)
api.add_router("/zero_dte/", zero_dte_router)
api.add_router("/corrcov/", corrcov_router)
api.add_router("/volatility/", volatility_router)


