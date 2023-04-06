import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const NavBar = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location?.pathname;
  const [urlPath, setUrlPath] = useState(path);
  const [dashRoute, setDashRoute] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    const getUrlPath = async () => {
      const path = location?.pathname;
      setUrlPath(path); 
    };
    if (location) {
      getUrlPath();
    }
  }, [location]);


  const handleDashRoute = useMemo(() => {
    if (urlPath.includes('/dashboard')) {
      setDashRoute(true);
    } else {
      setDashRoute(false);
    }
  }, [urlPath]);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={null}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        { dashRoute ? <ArrowForwardIosIcon sx={{ color: '#8884D8' }} /> : <ArrowForwardIosIcon sx={{ color: '#FFFFFF' }} /> }
        <Button onClick={() => navigate("../dashboard/zerodte")} sx={{ display: 'block', font: '22px Aldrich', fontWeight: 'bold', color: '#8884D8', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', textDecoration: dashRoute ? 'underline' : null, textDecorationThickness: dashRoute ? '4px' : null, "&:hover": { color: '#A8E4A0', transform: 'scale(1.03)', textDecoration: 'underline', textDecorationThickness: '4px' } }}>
          Dashboard
        </Button>
      </MenuItem>
      <MenuItem>
        {urlPath === "/contact" ? <ArrowForwardIosIcon sx={{ color: '#8884D8' }} /> : <ArrowForwardIosIcon sx={{ color: '#FFFFFF' }} /> }
        <Button onClick={() => navigate("../contact")} sx={{ display: 'block', font: '22px Aldrich', fontWeight: 'bold', color: '#8884D8', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', textDecoration: urlPath === "/contact" ? 'underline' : null, textDecorationThickness: urlPath === "/contact" ? '4px' : null, "&:hover": { color: '#A8E4A0', transform: 'scale(1.03)', textDecoration: 'underline', textDecorationThickness: '4px'} }}>
          Contact
        </Button>
      </MenuItem>
    </Menu>
  );

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ height: 70, zIndex: (theme) => theme.zIndex.drawer + 1, background: 'linear-gradient(15deg, #2D3436 0%, #000000 74%);' }}>
        <Toolbar sx={{ mt: 1 }}>
          <Typography sx={{ display: 'flex', font: { xs: '34px Aldrich', md: '36px Aldrich' }, fontWeight: { xs: 'bold', md: 'bold' }, color: '#8884D8', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', background: 'none', boxShadow: 'none', border: 'none' }} >
            GiddyUp Analytics
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={() => navigate("../dashboard/zerodte")} sx={{ display: 'block', font: '22px Aldrich', fontWeight: 'bold', color: dashRoute ? '#A8E4A0' : '#8884D8', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', ml: "auto", textDecoration: dashRoute ? 'underline' : null, textDecorationThickness: dashRoute ? '4px' : null, "&:hover": { color: '#A8E4A0', transform: 'scale(1.03)', textDecoration: 'underline', textDecorationThickness: '4px' } }}>
              Dashboard
            </Button>
            <Button onClick={() => navigate("../contact")} sx={{ display: 'block', font: '22px Aldrich', fontWeight: 'bold', color: urlPath === "/contact" ? '#A8E4A0' : '#8884D8', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', textDecoration: urlPath === "/contact" ? 'underline' : null, textDecorationThickness: urlPath === "/contact" ? '4px' : null, "&:hover": { color: '#A8E4A0', transform: 'scale(1.03)', textDecoration: 'underline', textDecorationThickness: '4px'} }}>
              Contact
            </Button>
            {!dashRoute && !isAuth ?
              <React.Fragment>
                <Button hidden={dashRoute} variant='outlined' onClick={() => navigate("../login")} sx={{ display: 'block', font: '20px Aldrich', fontWeight: 'bold', color: urlPath === "/login" ? '#A8E4A0' : '#8884D8', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', border: '3px solid', ml: 5, mt: -0.5, pt: 1, "&:hover": { color: '#A8E4A0', transform: 'scale(1.03)', border: '3px solid' } }}>
                  Login
                </Button>
                <Button variant='outlined' onClick={() => navigate("../signup")} sx={{ display: 'block', font: '20px Aldrich', fontWeight: 'bold', color: urlPath === "/signup" ? '#A8E4A0' : '#8884D8', textShadow: '2px 3px 4px rgba(245,245,245,0.5)', border: '3px solid', ml: 1, mt: -0.5, pt: 1, "&:hover": { color: '#A8E4A0', transform: 'scale(1.03)', border: '3px solid' } }}>
                  Signup
                </Button>
              </React.Fragment>
            : null }
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: -1 }}>
            <IconButton onClick={handleMobileMenuOpen}>
              <MenuIcon sx={{ color: '#8884D8', height: 35, width: 35 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default NavBar;



