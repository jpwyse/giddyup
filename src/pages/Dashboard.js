import React, { useEffect, useState, useMemo } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { logout } from '../redux/actions/auth';
import { useSnackbar } from 'notistack';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SideBar from '../components/Dashboard/SideBar';
import NavBar from '../components/Dashboard/NavBar';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      background: 'linear-gradient(315deg, #2d3436 0%, #000000 74%);',
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(6),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(8),
        },
      }),
    },
  }),
);


const Dashboard = () => {
  const mdTheme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(true);
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize[0] < 600) {
      setSmallScreen(true);
      setOpen(false);
    } else {
      setSmallScreen(false);
      setOpen(null);
    }
  }, [windowSize]);


  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logoutUser = () => {
    dispatch(logout());
    setLogoutAlert(false);
    navigate("../login", { replace: true });
    setTimeout(() => {
      enqueueSnackbar(logoutSuccess, {
        variant: 'success',
        preventDuplicate: true,
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
    }, 500);
  };


  const logoutNotice = (
    <Dialog open={logoutAlert} onClose={() => setLogoutAlert(false)}>
      <DialogTitle sx={{ bgcolor: '#2D3436' }}>{logoutMsg}</DialogTitle>
      <DialogActions sx={{ bgcolor: '#2D3436' }}>
        <Button 
          variant="contained" 
          onClick={logoutUser} 
          sx={{  
            font: '20px Aldrich',
            fontWeight: 'bold',
            color: '#F8F8FF',
            textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
            height: '40px',
            background: 'none',
            border: '3px solid #F8F8FF',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
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
          Yes
        </Button>
        <Button 
          variant="contained" 
          onClick={() => setLogoutAlert(false)} 
          sx={{  
            font: '20px Aldrich',
            fontWeight: 'bold',
            color: '#F8F8FF',
            textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
            height: '40px',
            background: 'none',
            border: '3px solid #F8F8FF',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
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
          Nevermind
        </Button>
      </DialogActions>
    </Dialog>
  );


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavBar 
          open={open} 
          toggleDrawer={toggleDrawer}
          smallScreen={smallScreen}
        />
        <Drawer variant="permanent" open={!smallScreen ? open : false}>
          <Toolbar />
          <List component="nav">
            <SideBar 
              open={open} 
              setOpen={setOpen} 
              setLogoutAlert={setLogoutAlert} 
              drawerWidth={drawerWidth} 
            />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: 'transparent',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="false" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
                  <Outlet />
                </Box>
              </Grid>
            </Grid>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;


const logoutMsg = (
  <Typography sx={{ font: '26px Aldrich', fontWeight: 'bold', color: '#F8F8FF' }}>
    Are you sure you want to logout?
  </Typography>
);

const logoutSuccess = (
  <Typography sx={{ font: '22px VT323', color: '#F8F8FF', fontWeight: 'bold' }}>
    You have been successfully logged out. 
  </Typography>
);



const Copyright = () => {
  return (
    <Grid item xs={12}>
      <Stack direction='row' justifyContent='center' sx={{ mt: 2 }}>
        <Typography align="center" sx={{ font: '14px Aldrich', fontWeight: 'bold', color: '#F8F8FF', mt: 'calc(10% + 60px)', position: 'fixed', bottom: 2, zIndex: -1, opacity: '0.7' }}>
          Copyright © GiddyUp Analytics {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Grid>
  );
};
