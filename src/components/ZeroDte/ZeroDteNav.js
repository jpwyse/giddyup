import React from "react";
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
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';


const ZeroDteNav = ({chartConfigOptions, ticker, setTicker, marketDate, period, activeChart, chartIndex, setChartIndex, contracts, setContracts, ...props}) => {
  
  const handleTicker = (event) => {
    setTicker(event.target.value);
  };

  const handleChartConfig = (event) => {
    setChartIndex(event.target.value);
  };

  const handleContracts = (event, contract) => {
    if (contracts.includes(contract)) {
      let newContracts = contracts.filter(items => items !== contract);
      setContracts(newContracts);
    } else {
      setContracts(contracts => [...contracts, contract]);
    }
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: '85%', mx: "auto", height: 110, zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#2D3436', boxShadow: 'rgba(245, 245, 245, 0.25) 0px 3px 8px;', border: '2px solid #838996' }}>
        <Toolbar sx={{ mt: 1 }}>
          <Grid container direction="row" justifyContent="space-between" spacing={0}>
            <Stack direction='row' divider={<Divider orientation="vertical" flexItem sx={{ bgcolor: '#F8F8FF' }} />} alignItems='center' justifyContent='center' spacing={{ xs: 4, md: 6, lg: 10 }} sx={{ my: 1 }}>
              <Grid item xs={2}>
                <Typography sx={{ font: '36px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', mr: -4, mt: 0.25 }} >
                  0DTE
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <FormControl margin='none' sx={{ minWidth: 120 }} size="small">
                  <Stack direction='column' alignItems='flex-start' justifyContent='flex-start' spacing={0} sx={{ mt: -1, mx: -2 }}>
                    <FormHelperText sx={{ font: '13px Aldrich', fontWeight: 'bold', color: '#F8F8FF', ml: 0, pb: 1  }}>Select Ticker</FormHelperText>
                    <Select value={ticker} onChange={handleTicker} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8', width: 150, height: 50, pt: 1, border: '1px solid #8884D8', '.MuiSelect-iconOutlined': {color: '#8884D8'} }} >
                      <MenuItem value={'SPY'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8' }}>
                        SPY
                      </MenuItem>
                      <MenuItem value={'QQQ'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8' }}>
                        QQQ
                      </MenuItem>
                      <MenuItem value={'$SPX'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8' }}>
                        $SPX
                      </MenuItem>
                    </Select>
                  </Stack>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl margin='none' sx={{ minWidth: 120 }} size="small">
                  <Stack direction='column' alignItems='flex-start' justifyContent='flex-start' spacing={0} sx={{ mt: -1, mx: -4 }}>
                    <FormHelperText sx={{ font: '13px Aldrich', fontWeight: 'bold', color: '#F8F8FF', ml: 0, pb: 1  }}>Select Data</FormHelperText>
                    <Select value={activeChart?.id} onChange={handleChartConfig} sx={{ font: '24px vt323', fontWeight: 'bold', color: '#8884D8', width: 325, height: 50, pt: 1, border: '1px solid #8884D8', '.MuiSelect-iconOutlined': {color: '#8884D8'} }}>
                      {chartConfigOptions.map((config) =>
                        <MenuItem key={config.id} value={config.id} sx={{ font: '24px vt323', fontWeight: 'bold', color: '#8884D8' }}>
                          {config.title}
                        </MenuItem>
                      )}
                    </Select>
                  </Stack>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1} sx={{ mx: -4 }}>
                  <Typography sx={{ font: '22px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 4px rgba(245,245,245,0.5)' }}>
                    Chart:
                  </Typography>
                  <FormGroup>
                    <FormControlLabel 
                      control= {
                        <Checkbox 
                          name="calls" 
                          checked={contracts?.includes("calls")} 
                          onChange={(event) => handleContracts(event, "calls")}
                          disabled={chartIndex === 0 || chartIndex === 1}
                          sx={{ color: '#82CA9D', '&.Mui-checked': { color: '#82CA9D' }, '&.Mui-disabled': { color: '#8B8589' } }} 
                        /> 
                      } 
                      label={callsLabel} 
                      sx={{ m: 0, p: 0, mb: -1.25 }} 
                    />
                    <FormControlLabel 
                      control= {
                        <Checkbox 
                          name="puts" 
                          checked={contracts?.includes("puts")} 
                          onChange={(event) => handleContracts(event, "puts")}
                          disabled={chartIndex === 0 || chartIndex === 1}
                          sx={{ color: '#4C6293', '&.Mui-checked': { color: '#4C6293' }, '&.Mui-disabled': { color: '#8B8589' } }} 
                        /> 
                      } 
                      label={putsLabel} 
                      sx={{ m: 0, p: 0 }} 
                    />
                  </FormGroup>
                </Stack>
              </Grid>
              <Grid item xs="auto">
                <Stack direction='column' alignItems='flex-start' justifyContent='center' spacing={1} sx={{ mt: 0, mx: -2 }}>
                  <Stack direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={1}>
                    <Typography sx={{ font: '22px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 4px rgba(245,245,245,0.5)' }} >
                      Ticker:
                    </Typography>
                    <Typography sx={{ font: '22px Aldrich', fontWeight: 'bold', color: '#A8E4A0', textShadow: '2px 3px 4px rgba(245,245,245,0.5)' }} >
                      {ticker}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={1}>
                    <Typography sx={{ font: '22px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 4px rgba(245,245,245,0.5)' }} >
                      Exp:
                    </Typography>
                    <Typography sx={{ font: '22px Aldrich', fontWeight: 'bold', color: '#A8E4A0', textShadow: '2px 3px 4px rgba(245,245,245,0.5)' }}>
                      {marketDate} [{period}]
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ZeroDteNav;


const callsLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#82CA9D', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    Calls
  </Typography>
);

const putsLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#4C6293', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    Puts
  </Typography>
);

