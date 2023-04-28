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
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';


const CorrNav = ({ ticker1, setTicker1, ticker2, setTicker2, period, setPeriod, window, setWindow, chartDisplay, setChartDisplay, splitChart, setSplitChart, ...props }) => {
  
  const handleTicker = (event) => {
    if (event.target.name === 'ticker1') {
      setTicker1(event.target.value);
    } else {
      setTicker2(event.target.value);
    }
  };

  const handlePeriod = (event) => {
    setPeriod(event.target.value);
  };

  const handleWindow = (event) => {
    setWindow(event.target.value);
  };

  const handleChartDisplay = (event, line) => {
    if (chartDisplay.includes(line)) {
      let newDisplay = chartDisplay.filter(items => items !== line);
      setChartDisplay(newDisplay);
    } else {
      setChartDisplay(chartDisplay => [...chartDisplay, line]);
    }
  };

  const windows = [...Array(31).keys()].slice(3);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: { xs: 'column', md: 'row' },  maxWidth: 1650, py: 2,  mx: "auto", justifyContent: 'space-evenly', alignItems: 'center',  zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#2D3436', boxShadow: 'rgba(245, 245, 245, 0.25) 0px 3px 8px;', border: '2px solid #838996'  }}>
      <Typography noWrap sx={{ font: '36px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', ml: -2, mt: 0.25 }} >
        Correlation
      </Typography>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: '#F8F8FF' }} />      
      <FormControl margin='none' sx={{ minWidth: 120 }} size="small">
        <Stack direction='column' alignItems='flex-start' justifyContent='flex-start' spacing={0} sx={{ mt: -1, mx: -2 }}>
          <FormHelperText sx={{ font: '13px Aldrich', fontWeight: 'bold', color: '#F8F8FF', ml: 0, pb: 1  }}>Select Ticker #1</FormHelperText>
          <Select name="ticker1" value={ticker1} onChange={handleTicker} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#82CA9D', width: 150, height: 50, pt: 1, border: '1px solid #82CA9D', '.MuiSelect-iconOutlined': {color: '#82CA9D'} }} >
            <MenuItem value={'SPY'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#82CA9D' }}>
              SPY
            </MenuItem>
            <MenuItem value={'QQQ'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#82CA9D' }}>
              QQQ
            </MenuItem>
          </Select>
        </Stack>
      </FormControl>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: '#F8F8FF' }} />   
      <FormControl margin='none' sx={{ minWidth: 120 }} size="small">
        <Stack direction='column' alignItems='flex-start' justifyContent='flex-start' spacing={0} sx={{ mt: -1, mx: -2 }}>
          <FormHelperText sx={{ font: '13px Aldrich', fontWeight: 'bold', color: '#F8F8FF', ml: 0, pb: 1  }}>Select Ticker #2</FormHelperText>
          <Select name="ticker2" value={ticker2} onChange={handleTicker} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#FF6961', width: 150, height: 50, pt: 1, border: '1px solid #FF6961', '.MuiSelect-iconOutlined': {color: '#FF6961'} }} >
            <MenuItem value={'^VIX'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#FF6961' }}>
              ^VIX
            </MenuItem>
          </Select>
        </Stack>
      </FormControl>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: '#F8F8FF' }} />
      <FormControl margin='none' sx={{ minWidth: 120 }} size="small">
        <Stack direction='column' alignItems='flex-start' justifyContent='flex-start' spacing={0} sx={{ mt: -1, mx: -2 }}>
          <FormHelperText sx={{ font: '13px Aldrich', fontWeight: 'bold', color: '#F8F8FF', ml: 0, pb: 1  }}>Date Range</FormHelperText>
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
            <MenuItem value={'1Y'} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8' }}>
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
      <FormControl margin='none' sx={{ minWidth: 120 }} size="small">
        <Stack direction='column' alignItems='flex-start' justifyContent='flex-start' spacing={0} sx={{ mt: -1, mx: -2 }}>
          <FormHelperText sx={{ font: '13px Aldrich', fontWeight: 'bold', color: '#F8F8FF', ml: 0, pb: 1  }}>Window Range</FormHelperText>
          <Select name="window" value={window} onChange={handleWindow} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8', width: 150, height: 50, pt: 1, border: '1px solid #8884D8', '.MuiSelect-iconOutlined': {color: '#8884D8'} }}>
            {windows.map((number) =>
              <MenuItem value={number} sx={{ font: '26px vt323', fontWeight: 'bold', color: '#8884D8' }}>
                {number}
              </MenuItem>
            )}
          </Select>
        </Stack>
      </FormControl>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: '#F8F8FF' }} />   
      <Stack direction="column" alignItems="center" justifyContent="flex-start" spacing={1} sx={{ m: -2 }}>
        <Typography sx={{ font: '22px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 4px rgba(245,245,245,0.5)' }}>
          Split Chart:
        </Typography>
        <Checkbox
          checked={splitChart}
          onChange={() => setSplitChart(!splitChart)}
          sx={{
            color: '#8884D8',
            '&.Mui-checked': {
              color: '#8884D8',
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default CorrNav;


const ticker1Label = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#82CA9D', textShadow: '1px 1px 2px rgba(245,245,245,0.5)' }} >
    Ticker 1
  </Typography>
);

const ticker2Label = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#FF6961', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    Ticker 3
  </Typography>
);

const statLabel = (
  <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#966FD6', textShadow: '1px 1px 2px rgba(245,245,245,0.5)', pt: 0.5 }} >
    Correlation
  </Typography>
);

