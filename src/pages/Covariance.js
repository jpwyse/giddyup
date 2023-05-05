import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import _ from 'lodash';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from '../axios/api';
import Loading from '../pages/Loading';
import CovNav from '../components/Stats/CovNav';
import CovChart from '../components/Stats/CovChart';
import '@fontsource/vt323';
import '@fontsource/aldrich';


const Covariance = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [ticker1, setTicker1] = useState('SPY');
  const [ticker2, setTicker2] = useState('^VIX');
  const [period, setPeriod] = useState('2y');
  const [interval, setInterval] = useState('1d');
  const [window, setWindow] = useState(3);
  const [splitChart, setSplitChart] = useState(true);
  const [data, setData] = useState(null);
  const [dataError, setDataError] = useState(false);
  const [dataAlert, setDataAlert] = useState(false);
  const [marketClosed, setMarketClosed] = useState(false);
  const dataAlertDone = useRef(false);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("api/corrcov/get/", {
          params: {
            auth: isAuth,
            ticker1: ticker1,
            ticker2: ticker2,
            period: period,
            interval: interval,
            window: window,
          },
        });
        if (!response.data){
          setLoading(false);
          setMarketClosed(true);
        } else {
          setData(Object.values(response.data.data));
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
        if (!user && !dataAlertDone.current) {
          setDataAlert(true);
        }
      } catch (error) {
        console.log('error', error.response);
        setDataError(true);
        setLoading(false);
      }
    };
    setLoading(true);
    setTimeout(() => {
      if (!dataError) {
        fetchData();
      } else {
        setLoading(false);
      }
    }, 1000);
  }, [ticker1, ticker2, period, interval, window, dataError]);


  const handleDataAlert = () => {
    setDataAlert(false);
    dataAlertDone.current = true;
  };


  const dataNotice = (
    <Dialog open={dataAlert} onClose={handleDataAlert}>
      <DialogTitle sx={{ bgcolor: '#2D3436' }}>{dataMsg}</DialogTitle>
      <DialogActions sx={{ bgcolor: '#2D3436' }}>
        <Button 
          size="medium"
          variant="contained" 
          onClick={() => navigate("/login")}
          sx={{  
            font: '20px Aldrich',
            fontWeight: 'bold',
            color: '#A8E4A0',
            textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
            height: '40px',
            background: 'none',
            border: '3px solid #A8E4A0',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
            mr: 1.5,
            pt: 1,
            pb: 1,
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
          Login
        </Button>
        <Button
          size="medium"
          variant="contained" 
          onClick={() => navigate("/signup")}
          sx={{  
            font: '20px Aldrich',
            fontWeight: 'bold',
            color: '#8884D8',
            textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
            height: '40px',
            background: 'none',
            border: '3px solid #8884D8',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
            mr: 1.5,
            pt: 1,
            pb: 1,
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
          SignUp
        </Button>
        <Button
          size="medium"
          variant="contained" 
          onClick={handleDataAlert} 
          sx={{  
            font: '20px Aldrich',
            fontWeight: 'bold',
            color: '#d3d3d3',
            textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
            height: '40px',
            background: 'none',
            border: '3px solid #d3d3d3',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
            mr: 1.5,
            pt: 1,
            '&:hover': { 
              fontWeight: 'bold',
              color: '#F8F8FF', 
              background: 'none',
              border: '3px solid #F8F8FF',
              transform: 'scale(1.05)',
              boxShadow: 'none',
            }
          }}
        >
          Maybe Later
        </Button>
      </DialogActions>
    </Dialog>
  );


  const renderPage = () => {
    if (loading && !dataError) {
      return (
        <React.Fragment>
          <Grid container spacing={4}>
            <Grid item xs={12} sx={{ mt: 2 }}>
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
              Error retrieving stats data.
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
            {dataNotice}
            <Grid item xs={12}>
              <CovNav 
                ticker1={ticker1} 
                setTicker1={setTicker1}
                ticker2={ticker2} 
                setTicker2={setTicker2}
                period={period}
                setPeriod={setPeriod}
                window={window}
                setWindow={setWindow}
                splitChart={splitChart}
                setSplitChart={setSplitChart}
              />
            </Grid>
            <Grid item xs={12}>
              { !marketClosed ?
                <Box sx={{ height: '80%' }}>
                  <CovChart 
                    data={data}
                    ticker1={ticker1} 
                    ticker2={ticker2}
                    splitChart={splitChart}
                  />
                </Box>
              : 
                <Stack direction="column" alignItems="center" justifyContent="center">
                  <Typography align="center" sx={{ font: '108px Aldrich', fontWeight: 'bold', color: '#8884D8', textShadow: '2px 4px 4px rgba(245,245,245,0.5)', mt: 15, width: '75%' }}>
                    U.S. financial markets are currently closed. Go touch some grass.
                  </Typography>
                </Stack>
              }
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


export default Covariance;


const dataMsg = (
  <React.Fragment>
    <Typography sx={{ font: '26px Aldrich', fontWeight: 'bold', color: '#8884D8', lineHeight: 1.25, mb: 2 }}>
      ALERT:
    </Typography>
    <Typography sx={{ font: '26px Aldrich', fontWeight: 'bold', color: '#F8F8FF', lineHeight: 1.25, mb: 2 }}>
      Data currently being displayed is a <u>day behind</u> live market data.
    </Typography>
    <Typography sx={{ font: '26px Aldrich', fontWeight: 'bold', color: '#F8F8FF', lineHeight: 1.25 }}>
      To view live market data please login or sign-up.
    </Typography>
  </React.Fragment>
);

