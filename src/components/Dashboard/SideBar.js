import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Clock from 'react-live-clock';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ReactComponent as GiddyIconSideBar } from '../../design/icons/GiddyIconSideBar.svg';
import { ReactComponent as AccountIcon } from '../../design/icons/AccountIcon.svg';
import { ReactComponent as AccountIconActive } from '../../design/icons/AccountIconActive.svg';
import { ReactComponent as LogoutIcon } from '../../design/icons/LogoutIcon.svg';
import { ReactComponent as LogoutIconActive } from '../../design/icons/LogoutIconActive.svg';
import { ReactComponent as LoginIcon } from '../../design/icons/LoginIcon.svg';
import { ReactComponent as LoginIconActive } from '../../design/icons/LoginIconActive.svg';
import { ReactComponent as SignUpIcon } from '../../design/icons/SignUpIcon.svg';
import { ReactComponent as SignUpIconActive } from '../../design/icons/SignUpIconActive.svg';
import OptionsIcon from '../../design/icons/OptionsIcon';
import OptionsIconActive from '../../design/icons/OptionsIconActive';
import ZeroDteIcon from '../../design/icons/ZeroDteIcon';
import ZeroDteIconActive from '../../design/icons/ZeroDteIconActive';
import StatsIcon from '../../design/icons/StatsIcon';
import StatsIconActive from '../../design/icons/StatsIconActive';
import CorrCovIcon from '../../design/icons/CorrCovIcon';
import CorrCovIconActive from '../../design/icons/CorrCovIconActive';
import CorrIcon from '../../design/icons/CorrIcon';
import CorrIconActive from '../../design/icons/CorrIconActive';
import CovIcon from '../../design/icons/CovIcon';
import CovIconActive from '../../design/icons/CovIconActive';
import VolatilityIcon from '../../design/icons/VolatilityIcon';
import VolatilityIconActive from '../../design/icons/VolatilityIconActive';
import VolSpreadIcon from '../../design/icons/VolSpreadIcon';
import VolSpreadIconActive from '../../design/icons/VolSpreadIconActive';
import CryptoIcon from '../../design/icons/CryptoIcon';


const SideBar = ({open, setOpen, setLogoutAlert, drawerWidth, ...props}) => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(["options", "stats"]);
  const [selected, setSelected] = useState();
  const [hoverLink, setHoverLink] = useState(null);
  const [tipOpen, setTipOpen] = useState(false);

  const handleSelectedPage = useMemo(() => {
    if (location?.pathname === "/dashboard/zerodte") {
      setSelected("zerodte");
    } 
    if (location?.pathname === "/dashboard/correlation") {
      setSelected("correlation");
    } 
    if (location?.pathname === "/dashboard/covariance") {
      setSelected("covariance");
    } 
    if (location?.pathname === "/dashboard/spread") {
      setSelected("volspread");
    } 
    if (location?.pathname === "/dashboard/account") {
      setSelected("account");
    }
    if (location?.pathname === "/site/login") {
      setSelected("login");
    }
    if (location?.pathname === "/site/signup") {
      setSelected("signup");
    }
  }, [location]);


  const handleExpanded = (event, tab) => {
    if (!open) {
      setOpen(true);
    }
  };

  const handleTooltipClose = () => {
    setTipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTipOpen(true);
  };


  const guestDash = (
    <React.Fragment>
      <Stack direction="column" alignItems="center" justifyContent="center" spacing={0}>
        <ListItemButton alignItems='center' sx={{ position: 'fixed', bottom: open ? 250 : 150, borderTop: '1px solid rgba(248, 248, 255, 0.5)', width: open ? drawerWidth : 65 }} />
          <Tooltip disableHoverListener={open} disableFocusListener disableTouchListener title={loginTip} placement="right" arrow>
            <ListItemButton alignItems='center' onClick={() => navigate("../site/login")} onMouseOver={() => setHoverLink("login")} onMouseLeave={() => setHoverLink(null)} sx={{ position: 'fixed', bottom: open ? 160 : 80 }}>
              <Stack direction="column" alignItems="center" justifyContent="center" spacing={-0.25}>
                <ListItemIcon sx={{ transform: hoverLink === "login" ? 'scale(1.1)' : null }}>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography hidden={!open} sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#8884D8', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', pt: 1, transform: hoverLink === "login" ? 'scale(1.1)' : null }}>
                    LOGIN
                  </Typography>
                </ListItemText>
               </Stack>
            </ListItemButton>
          </Tooltip>
          <Tooltip disableHoverListener={open} disableFocusListener disableTouchListener title={signupTip} placement="right" arrow>
            <ListItemButton alignItems='center' onClick={() => navigate("../site/signup")} onMouseOver={() => setHoverLink("signup")} onMouseLeave={() => setHoverLink(null)} sx={{ position: 'fixed', bottom: open ? 60 : 10 }}>
              <Stack direction="column" alignItems="center" justifyContent="center">
                <ListItemIcon sx={{ ml: 2, transform: hoverLink === "signup" ? 'scale(1.1)' : null }}>
                  <SignUpIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography hidden={!open} sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#8884D8', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', pt: 1, transform: hoverLink === "signup" ? 'scale(1.1)' : null }}>
                    SIGNUP
                  </Typography>
                </ListItemText>
              </Stack>
            </ListItemButton>
          </Tooltip>
      </Stack>
    </React.Fragment>
  );

  const userDash = (
    <React.Fragment>
      <Stack direction="column" alignItems="center" justifyContent="center" spacing={0}>
        <ListItemButton alignItems='center' sx={{ position: 'fixed', bottom: open ? 250 : 150, borderTop: '1px solid rgba(248, 248, 255, 0.5)', width: open ? drawerWidth : 65 }} />
          <Tooltip disableHoverListener={open} disableFocusListener disableTouchListener title={accountTip} placement="right" arrow>
            <ListItemButton alignItems='center' onClick={() => navigate("../dashboard/account")} onMouseOver={() => setHoverLink("account")} onMouseLeave={() => setHoverLink(null)} sx={{ position: 'fixed', bottom: open ? 165 : 80 }}>
              <Stack direction="column" alignItems="center" justifyContent="center" spacing={0}>
                <ListItemIcon sx={{ transform: hoverLink === "account" ? 'scale(1.1)' : null }}>
                  <AccountIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography hidden={!open} sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#8884D8', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', mt: -0.5, transform: hoverLink === "account" ? 'scale(1.1)' : null }}>
                    {user?.username}
                  </Typography>
                </ListItemText>
              </Stack>
            </ListItemButton>
          </Tooltip>
          <Tooltip disableHoverListener={open} disableFocusListener disableTouchListener title={logoutTip} placement="right" arrow>
            <ListItemButton alignItems='center' onClick={() => setLogoutAlert(true)} onMouseOver={() => setHoverLink("logout")} onMouseLeave={() => setHoverLink(null)} sx={{ position: 'fixed', bottom: open ? 65 : 10 }}>
              <Stack direction="column" alignItems="center" justifyContent="center" spacing={0}>
                <ListItemIcon sx={{ transform: hoverLink === "logout" ? 'scale(1.1)' : null }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText >
                  <Typography hidden={!open} sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#8884D8', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', transform: hoverLink === "logout" ? 'scale(1.1)' : null }}>
                    LOGOUT
                  </Typography>
                </ListItemText>
              </Stack>
            </ListItemButton>
          </Tooltip>
      </Stack>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Tooltip disableHoverListener={open} disableFocusListener disableTouchListener title={optionsTip} placement="right" arrow>
        <ListItemButton onClick={handleExpanded}>
          <ListItemIcon sx={{ ml: open ? -1 : -0.75 }}>
            <OptionsIcon />
          </ListItemIcon>
          { open ? 
            <ListItemText>
              <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', pt: 1 }}>
                OPTIONS
              </Typography>
            </ListItemText>
          : null }
          <ExpandMore sx={{ color: '#F8F8FF', mt: 0.5 }} />
        </ListItemButton>
      </Tooltip>
      <Divider sx={{ bgcolor: '#F8F8FF', opacity: '0.25' }} />
      <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ bgcolor: selected === "zerodte" ? '#1B1B1B' : null, transform: hoverLink === 'zerodte' ? 'scale(1.02)' : null }}>
          <Tooltip disableHoverListener={open} disableFocusListener disableTouchListener title={zeroTip} placement="right" arrow>
            <ListItemButton selected={selected === 'zerodte'} onClick={() => navigate("../dashboard/zerodte")} onMouseOver={() => setHoverLink("zerodte")} onMouseLeave={() => setHoverLink(null)} sx={{ pl: open ? 2 : 1.5 }}>
              <ListItemIcon sx={{ opacity: open ? 1 : 0.95 }}>
                {selected === 'zerodte' || hoverLink === 'zerodte' ? <ZeroDteIconActive /> : <ZeroDteIcon /> }
              </ListItemIcon>
              <ListItemText>
                <Typography hidden={!open} sx={{ font: '18px Aldrich', fontWeight: 'bold', color: selected === 'zerodte' || hoverLink === 'zerodte' ? '#8884D8' : '#F8F8FF', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', transform: hoverLink === 'zerodte' ?'scale(1.05)' : null, ml: -1, pt: 0.5 }}>
                  0DTE
                </Typography>
              </ListItemText>
            </ListItemButton>
          </Tooltip>
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: '#F8F8FF', opacity: '0.5' }} />
      <Tooltip disableHoverListener={open} disableFocusListener disableTouchListener title={statsTip} placement="right" arrow>
        <ListItemButton onClick={handleExpanded}>
          <ListItemIcon sx={{ ml: open ? -1 : -0.75 }}>
            <StatsIcon />
          </ListItemIcon>
          { open ? 
            <ListItemText>
              <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', pt: 1 }}>
                STATS
              </Typography>
            </ListItemText>
          : null }
          <ExpandMore sx={{ color: '#F8F8FF', mt: 0.5 }} />
        </ListItemButton>
      </Tooltip>
      <Divider sx={{ bgcolor: '#F8F8FF', opacity: '0.25' }} />
      <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding  sx={{ bgcolor: selected === "correlation" ? '#1B1B1B' : null, transform: hoverLink === 'correlation' ? 'scale(1.02)' : null }}>
          <Tooltip disableHoverListener={open} disableFocusListener disableTouchListener title={corrTip} placement="right" arrow>
            <ListItemButton selected={selected === 'correlation'} onClick={() => navigate("../dashboard/correlation")} onMouseOver={() => setHoverLink("correlation")} onMouseLeave={() => setHoverLink(null)} sx={{ pl: open ? 2 : 1.5 }}>
              <ListItemIcon sx={{ opacity: open ? 1 : 0.95 }}>
                {selected === 'correlation' || hoverLink === 'correlation' ? <CorrIconActive /> : <CorrIcon /> }
              </ListItemIcon>
              <ListItemText>
                <Typography hidden={!open} sx={{ font: '18px Aldrich', fontWeight: 'bold', color: selected === 'correlation' || hoverLink === 'correlation' ? '#8884D8' : '#F8F8FF', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', transform: hoverLink === 'correlation' ?'scale(1.05)' : null, ml: -0.5 }}>
                  Correlation
                </Typography>
              </ListItemText>
            </ListItemButton>
          </Tooltip>
          <Divider sx={{ bgcolor: '#F8F8FF', opacity: '0.25' }} />
          <Tooltip disableHoverListener={open} disableFocusListener disableTouchListener title={covTip} placement="right" arrow>
            <ListItemButton selected={selected === 'covariance'} onClick={() => navigate("../dashboard/covariance")} onMouseOver={() => setHoverLink("covariance")} onMouseLeave={() => setHoverLink(null)} sx={{ pl: open ? 2 : 1.5 }}>
              <ListItemIcon sx={{ opacity: open ? 1 : 0.95 }}>
                {selected === 'covariance' || hoverLink === 'covariance' ? <CovIconActive /> : <CovIcon /> }
              </ListItemIcon>
              <ListItemText>
                <Typography hidden={!open} sx={{ font: '18px Aldrich', fontWeight: 'bold', color: selected === 'covariance' || hoverLink === 'covariance' ? '#8884D8' : '#F8F8FF', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', transform: hoverLink === 'covariance' ? 'scale(1.05)' : null, ml: -0.5 }}>
                  Covariance
                </Typography>
              </ListItemText>
            </ListItemButton>
          </Tooltip>
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: '#F8F8FF', opacity: '0.5' }} />
      <Tooltip disableHoverListener={open} disableFocusListener disableTouchListener title={volTip} placement="right" arrow>
        <ListItemButton disabled onClick={handleExpanded}>
          <ListItemIcon sx={{ ml: open ? -1 : -0.75 }}>
            <VolatilityIcon />
          </ListItemIcon>
          { open ? 
            <ListItemText>
              <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', pt: 1 }}>
                VOLATILITY
              </Typography>
            </ListItemText>
          : null }
          <ExpandMore sx={{ color: '#F8F8FF', mt: 0.5 }} />
        </ListItemButton>
      </Tooltip>
      <Divider sx={{ bgcolor: '#F8F8FF', opacity: '0.25' }} />
      <Collapse in={true} timeout="auto" unmountOnExit sx={{ display: { xs: 'none' } }}>
        <List component="div" disablePadding  sx={{ bgcolor: selected === "volspread" ? '#1B1B1B' : null, transform: hoverLink === 'volspread' ? 'scale(1.02)' : null }}>
          <Tooltip disableHoverListener={open} disableFocusListener disableTouchListener title={spreadTip} placement="right" arrow>
            <ListItemButton selected={selected === 'volspread'} onClick={() => navigate("../dashboard/spread")} onMouseOver={() => setHoverLink("volspread")} onMouseLeave={() => setHoverLink(null)} sx={{ pl: open ? 2 : 1.5 }}>
              <ListItemIcon sx={{ ml: -0.5, opacity: open ? 1 : 1 }}>
                {selected === 'volspread' || hoverLink === 'volspread' ? <VolSpreadIconActive /> : <VolSpreadIcon /> }
              </ListItemIcon>
              <ListItemText>
                <Typography hidden={!open} sx={{ font: '18px Aldrich', fontWeight: 'bold', color: selected === 'volspread' || hoverLink === 'volspread' ? '#8884D8' : '#F8F8FF', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', transform: hoverLink === 'corrcov' ?'scale(1.05)' : null, ml: -0.5 }}>
                  L/S ETF Spread
                </Typography>
              </ListItemText>
            </ListItemButton>
          </Tooltip>
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: '#F8F8FF', opacity: '0.5' }} />
      <Tooltip disableFocusListener disableTouchListener title={comingSoonTip} placement="right" arrow>
        <span>
          <ListItemButton disabled onClick={handleExpanded}>
            <ListItemIcon sx={{ ml: -1.25, transform: hoverLink === "crypto" ? 'scale(1.05)' : null, opacity: 0.75 }}>
              <CryptoIcon />
            </ListItemIcon>
            { open ? 
              <ListItemText>
                <Typography sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#F8F8FF', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', pt: 0.5, transform: hoverLink === "crypto" ? 'scale(1.05)' : null }}>
                  CRYPTO
                </Typography>
              </ListItemText>
            : null }
            <ExpandMore sx={{ color: '#F8F8FF', mt: 0.5 }} />
          </ListItemButton>
        </span>
      </Tooltip>
      <Divider sx={{ bgcolor: '#F8F8FF', opacity: '0.5' }} />
      <Stack direction="column" alignItems="center" justifyContent="center" spacing={0}>
        <ListItemIcon sx={{ width: {xs: 200, md: 225} }}>
          {open ? <GiddyIconSideBar /> : null}
        </ListItemIcon>
      </Stack>
      { isAuth ? userDash : guestDash }
      <ListItemButton alignItems='center' sx={{ mt: 'calc(10% + 60px)', position: 'fixed', bottom: 0, width: open ? drawerWidth : 65, borderTop: open ? '1px solid rgba(248, 248, 255, 0.5)' : null }}>
        <ListItemText>
          <Typography align="center" sx={{ font: '20px Aldrich', fontWeight: 'bold', color: '#F8F8FF', lineHeight: '1.5', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', "&:hover": { color: '#A8E4A0' } }}>
            {open ? <Clock format={'hh:mm:ss A'} ticking={true} blinking={false} timezone={null} /> : null}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </React.Fragment>
  );
};

export default SideBar;

const optionsTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    Options
  </Typography>
);

const zeroTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    0DTE
  </Typography>
);

const statsTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    Stats
  </Typography>
);

const corrTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    Correlation
  </Typography>
);

const covTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    Covariance
  </Typography>
);

const volTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    Volatility
  </Typography>
);

const spreadTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    Volatility ETF Spread
  </Typography>
);

const loginTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    Login
  </Typography>
);

const signupTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    SignUp
  </Typography>
);

const accountTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    Account
  </Typography>
);

const logoutTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    Logout
  </Typography>
);


const comingSoonTip = (
  <Typography sx={{ font: '19px Aldrich', fontWeight: 'bold', color: '#A8E4A0', p: 1 }}>
    Coming Soon
  </Typography>
);

