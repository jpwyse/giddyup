import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'mui-image'
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeChartImage from '../design/images/HomeChartImage.png';
import { ReactComponent as GiddyIconSideBar } from '../design/icons/GiddyIconSideBar.svg';


const Home = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ height: '100vh', mt: 5, p: 4 }}>
        <CssBaseline />
        <Grid item xs={12} md={6.5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', m: 'auto' }}>
            <Typography align="left" sx={{ font: '88px Aldrich', fontWeight: 'bold', color: '#A8E4A0', textShadow: '3px 4px 4px rgba(136,132,216,0.75)', lineHeight: 1.1, mt: 2 }}>
              A financial data & analytics dashboard built with the future in mind.
            </Typography>
            <Button
              size="large"
              variant='contained' 
              onClick={() => navigate("/dashboard/correlation")} 
              sx={{ 
                display: 'block', 
                font: '50px Aldrich', 
                fontWeight: 'bold', 
                color: '#A8E4A0', 
                textShadow: '2px 3px 4px rgba(245,245,245,0.5)',
                boxShadow: 'rgba(245,245,245,0.75) 0px 5px 15px;',
                border: '3px solid #A8E4A0',
                bgcolor: '#8884D8',
                m: "auto",
                mt: { xs: 5, md: 10 },
                mb: 5,
                p: 1.5 ,
                "&:hover": { 
                  color: '#8884D8', 
                  transform: 'scale(1.03)', 
                  border: '3px solid #8884D8',
                  bgcolor: '#A8E4A0',
                  boxShadow: 'rgba(245,245,245,0.95) 0px 5px 15px;',
                } 
              }}
            >
              Dashboard
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={5.5}>
          <Box sx={{ border: '3px solid #8884D8' }}>
            <Image src={HomeChartImage} showLoading />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="column" justifyContent="center" alignItems="center" sx={{ mt: { xs: 10, md: 40 } }}>
            <GiddyIconSideBar />
          </Stack>
        </Grid>
        <Copyright />
      </Grid>
    </React.Fragment>
  );
};

export default Home;


const Copyright = () => {
  return (
    <Grid item xs={12}>
      <Stack direction='row' justifyContent='center' sx={{ mt: 2 }}>
        <Typography align="center" sx={{ font: '14px Aldrich', fontWeight: 'bold', color: '#F8F8FF', mt: 'calc(10% + 60px)', position: 'fixed', bottom: 2, zIndex: -1, opacity: '0.7' }}>
          Copyright © GiddyUp Analytics {new Date().getFullYear()}. Not financial advice.
        </Typography>
      </Stack>
    </Grid>
  );
};