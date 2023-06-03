import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';


const SpreadNav = ({ period, setPeriod, tickers, setTickers, priceTicker, setPriceTicker, ...props }) => {

  const handlePeriod = (event) => {
    console.log(event.target.value);
    setPeriod(event.target.value);
  };

  const handleTickers = (event, ticker) => {
    if (tickers.includes(ticker)) {
      let newTickers = tickers.filter(items => items !== ticker);
      setTickers(newTickers);
    } else {
      setTickers(tickers => [...tickers, ticker]);
    }
  };

  const handlePriceTicker = (event, ticker) => {
   if (ticker) {
    setPriceTicker(ticker);
   }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: { sm: 'column', md: 'row' }, maxWidth: 1800, height: { md: 100 }, py: 1, mx: "auto", justifyContent: 'space-evenly', alignItems: 'center',  zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#2D3436', boxShadow: 'rgba(245, 245, 245, 0.25) 0px 3px 8px;', border: '2px solid #838996'  }}>
      <Typography noWrap sx={{ font: '36px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', ml: -2, mt: 0.25 }} >
         Vol ETF Spread
      </Typography>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: '#F8F8FF' }} />
      <FormControl margin='none' sx={{ minWidth: 120 }} size="small">
        <Stack direction='column' alignItems='flex-start' justifyContent='flex-start' spacing={0} sx={{ mt: -1, mx: -1 }}>
          <FormHelperText sx={{ font: '13px Aldrich', fontWeight: 'bold', color: '#F8F8FF', ml: 0, pb: 1  }}>Period</FormHelperText>
          <Select name="period" value={period} onChange={handlePeriod} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8', width: 150, height: 50, pt: 1, border: '1px solid #8884D8', '.MuiSelect-iconOutlined': {color: '#8884D8'} }} >
            <MenuItem value={'1mo'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8' }}>
              1M
            </MenuItem>
            <MenuItem value={'3mo'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8' }}>
              3M
            </MenuItem>
            <MenuItem value={'6mo'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8' }}>
              6M
            </MenuItem>
            <MenuItem value={'1y'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8' }}>
              1Y
            </MenuItem>
            <MenuItem value={'2y'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8' }}>
              2Y
            </MenuItem>
            <MenuItem value={'5y'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8' }}>
              5Y
            </MenuItem>
          </Select>
        </Stack>
      </FormControl>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: '#F8F8FF' }} />   
      <Stack direction="column" alignItems="center" spacing={1}>
        <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', mt: -0.75 }}>
          Spread Tickers:
        </Typography>
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem sx={{ bgcolor: '#F8F8FF' }} />} alignItems="center" justifyContent="center">
          <Stack direction="column" alignItems="center" justifyContent="flex-start" >
            <FormLabel sx={{ font: '15px Aldrich', color: '#F8F8FF', mt: -1.25, ml: -2 }}>(Short)</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  disabled
                  checked={true}
                  onChange={null}
                  sx={{
                    mt: 0.25,
                    color: '#8884D8',
                    '&.Mui-checked': {
                      color: '#8884D8',
                    },
                  }}
                />
              }
              label={svxyLabel}
              sx={{ ml: 0.5, mr: 1.5, mt: -1 }}
            />
          </Stack>
          <FormControlLabel
            control={
              <Checkbox
                checked={tickers.includes('^VIX')}
                onChange={(event) => handleTickers(event, '^VIX')}
                sx={{
                  color: '#82CA9D',
                  '&.Mui-checked': {
                    color: '#82CA9D',
                  },
                }}
              />
            }
            label={vixLabel}
            sx={{ ml: 0.5, mr: 1.5 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={tickers.includes('UVXY')}
                onChange={(event) => handleTickers(event, 'UVXY')}
                sx={{
                  color: '#82CA9D',
                  '&.Mui-checked': {
                    color: '#82CA9D',
                  },
                }}
              />
            }
            label={uvxyLabel}
            sx={{ ml: 0.5, mr: 1.5 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={tickers.includes('VXZ')}
                onChange={(event) => handleTickers(event, 'VXZ')}
                sx={{
                  color: '#82CA9D',
                  '&.Mui-checked': {
                    color: '#82CA9D',
                  },
                }}
              />
            }
            label={vxzLabel}
            sx={{ ml: 0.5, mr: 1.5 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={tickers.includes('^VVIX')}
                onChange={(event) => handleTickers(event, '^VVIX')}
                sx={{
                  color: '#82CA9D',
                  '&.Mui-checked': {
                    color: '#82CA9D',
                  },
                }}
              />
            }
            label={vvixLabel}
            sx={{ ml: 0.5, mr: 1.5 }}
          />
        </Stack>
      </Stack>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: '#F8F8FF' }} />   
      <Stack direction="column" alignItems="center" spacing={1}>
        <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', mt: -0.75 }}>
          Price Tickers:
        </Typography>
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem sx={{ bgcolor: '#F8F8FF' }} />} alignItems="center" justifyContent="center">
          <Stack direction="column" alignItems="center" justifyContent="flex-start">
            <FormLabel sx={{ font: '15px Aldrich', color: '#F8F8FF', mt: -1.25, ml: -2 }}>(Short)</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!tickers.includes('SVXY')}
                  checked={priceTicker === 'SVXY'}
                  onChange={(event) => handlePriceTicker(event, 'SVXY')}
                  sx={{
                    mt: 0.25,
                    color: '#FF6961',
                    '&.Mui-checked': {
                      color: '#FF6961',
                    },
                    '&.Mui-disabled': {
                      color: '#696969',
                    },
                  }}
                />
              }
              label={svxyPriceLabel}
              sx={{ ml: 0.5, mr: 1.5, mt: -1 }}
            />
          </Stack>
          <FormControlLabel
            control={
              <Checkbox
                disabled={!tickers.includes('^VIX')}
                checked={priceTicker === '^VIX'}
                onChange={(event) => handlePriceTicker(event, '^VIX')}
                sx={{
                  color: '#FF6961',
                  '&.Mui-checked': {
                    color: '#FF6961',
                  },
                  '&.Mui-disabled': {
                    color: '#696969',
                  },
                }}
              />
            }
            label={vixPriceLabel}
            sx={{ ml: 0.5, mr: 1.5 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!tickers.includes('UVXY')}
                checked={priceTicker === 'UVXY'}
                onChange={(event) => handlePriceTicker(event, 'UVXY')}
                sx={{
                  color: '#FF6961',
                  '&.Mui-checked': {
                    color: '#FF6961',
                  },
                  '&.Mui-disabled': {
                    color: '#696969',
                  },
                }}
              />
            }
            label={uvxyPriceLabel}
            sx={{ ml: 0.5, mr: 1.5 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!tickers.includes('VXZ')}
                checked={priceTicker === 'VXZ'}
                onChange={(event) => handlePriceTicker(event, 'VXZ')}
                sx={{
                  color: '#FF6961',
                  '&.Mui-checked': {
                    color: '#FF6961',
                  },
                  '&.Mui-disabled': {
                    color: '#696969',
                  },
                }}
              />
            }
            label={vxzPriceLabel}
            sx={{ ml: 0.5, mr: 1.5 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={!tickers.includes('^VVIX')}
                checked={priceTicker === '^VVIX'}
                onChange={(event) => handlePriceTicker(event, '^VVIX')}
                sx={{
                  color: '#FF6961',
                  '&.Mui-checked': {
                    color: '#FF6961',
                  },
                  '&.Mui-disabled': {
                    color: '#696969',
                  },
                }}
              />
            }
            label={vvixPriceLabel}
            sx={{ ml: 0.5, mr: 1.5 }}
          />
        </Stack>
      </Stack>


    </Box>
  );
};

export default SpreadNav;


const svxyLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#8884D8', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    SVXY
  </Typography>
);

const vxxLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#82CA9D', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    VXX
  </Typography>
);

const uvxyLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#82CA9D', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    UVXY
  </Typography>
);

const vxzLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#82CA9D', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    VXZ
  </Typography>
);

const vixLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#82CA9D', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    VIX
  </Typography>
);

const vvixLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#82CA9D', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    VVIX
  </Typography>
);


const svxyPriceLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#FF6961', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    SVXY
  </Typography>
);

const vxxPriceLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#FF6961', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    VXX
  </Typography>
);

const uvxyPriceLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#FF6961', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    UVXY
  </Typography>
);

const vxzPriceLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#FF6961', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    VXZ
  </Typography>
);

const vixPriceLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#FF6961', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    VIX
  </Typography>
);

const vvixPriceLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#FF6961', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    VVIX
  </Typography>
);



