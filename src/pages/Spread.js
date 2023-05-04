import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from "axios";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import api from '../axios/api';
import Loading from '../pages/Loading';
import SpreadNav from '../components/Volatility/SpreadNav';
import SpreadChart from '../components/Volatility/SpreadChart';


const Spread = () => {
  const user = useSelector(state => state.auth.user);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('2y');
  const [tickers, setTickers] = useState(['SVXY', 'UVXY', 'VXZ', '^VIX']);
  const [priceTicker, setPriceTicker] = useState('^VIX');
  const [data, setData] = useState(null);
  const [quant10th, setQuant10th] = useState(null);
  const [quant25th, setQuant25th] = useState(null);
  const [quant50th, setQuant50th] = useState(null);
  const [quant75th, setQuant75th] = useState(null);
  const [quant90th, setQuant90th] = useState(null);
  const [quant95th, setQuant95th] = useState(null);
  const [quant99th, setQuant99th] = useState(null);
  const [dataError, setDataError] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("api/volatility/spread", {
          params: {
            tickers: tickers,
            period: period,
          },
          paramsSerializer: {
            indexes: null            
          }
        });
        console.log(response.data);
        setData(Object.values(response.data.data));
        setQuant10th(response.data.q10);
        setQuant25th(response.data.q25);
        setQuant50th(response.data.q50);
        setQuant75th(response.data.q75);
        setQuant90th(response.data.q90);
        setQuant95th(response.data.q95);
        setQuant99th(response.data.q99);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.log('error', error);
        setDataError(true);
        setLoading(false);
        let errMsg = "Error retrieving spread data.";
        enqueueSnackbar(errMsg, {
          variant: 'error',
          preventDuplicate: true,
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        });
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [period, tickers]);


  const renderPage = () => {
    if (loading) {
      return (
        <React.Fragment>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Loading />
            </Grid>
          </Grid>
        </React.Fragment>
      );
  	} else if (dataError) {
      return (
        <React.Fragment>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Typography align="center" sx={{ font: '108px Aldrich', fontWeight: 'bold', color: '#8884D8', textShadow: '2px 4px 4px rgba(245,245,245,0.5)', mt: 15, width: '75%' }}>
              Error retrieving volatility spread data.
            </Typography>
            <Button
              type="submit"
              variant="contained"
              size="small"
              onClick={() => setDataError(false)}
              sx={{  
                font: '44px Aldrich',
                fontWeight: 'bold',
                color: '#8884D8',
                textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                height: '60px',
                background: 'none',
                border: '4px solid #8884D8',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                m: "auto",
                mt: 5,
                pt: 1,
                '&:hover': { 
                  fontWeight: 'bold',
                  color: '#D0F0C0', 
                  background: 'none',
                  border: '3px solid #D0F0C0',
                  transform: 'scale(1.05)',
                  boxShadow: 'rgba(208, 240, 192, 0.19) 0px 10px 20px, rgba(208, 240, 192, 0.23) 0px 6px 6px;',
                }
              }}
            >
              Try Again
            </Button>
          </Stack>
        </React.Fragment>
      );
    } else {
			return (
				<React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SpreadNav
                period={period}
                tickers={tickers}
                setTickers={setTickers}
                priceTicker={priceTicker}
                setPriceTicker={setPriceTicker}
              />
            </Grid>
  					<Grid item xs={12}>
              <Box sx={{ height: '80vh' }}>
                <SpreadChart 
                  data={data}
                  quant10th={quant10th}
                  quant25th={quant25th}
                  quant50th={quant50th}
                  quant75th={quant75th}
                  quant90th={quant90th}
                  quant95th={quant95th}
                  quant99th={quant99th}
                  priceTicker={priceTicker}
                />
              </Box>
            </Grid>
          </Grid>
				</React.Fragment>
			);
  	}
  };


	return (
		renderPage()
	);
};


export default Spread;
