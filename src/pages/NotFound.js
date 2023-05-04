import React from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '@fontsource/vt323';
import '@fontsource/aldrich';


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', bgcolor: '#F5F5F5' }}>
        <Typography align='center' sx={{ font: '500px vt323', fontWeight: 'bold', textDecoration: 'underline', color: '#8884D8', textShadow: '5px 5px 0px rgba(0, 0, 0, 0.75)', mb: 3 }}>
          404
        </Typography>
        <Typography align='center' sx={{ font: '60px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '4px 4px 0px rgba(0,0,0,0.25)', mb: 4 }}>
          Page not found. 
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("../dashboard/zerodte", { replace: true })}
          sx={{  
            font: '65px vt323',
            fontWeight: 'bold',
            color: '#8884D8',
            textShadow: '3px 3px 0px rgba(55, 22, 73, 0.9)',
            background: 'none',
            border: '5px solid #8884D8',
            boxShadow: 'rgba(0,0,0,0.3) 0px 1px 2px 0px, rgba(0,0,0,0.15) 0px 2px 6px 2px;',
            mt: 2,
            '&:hover': { 
              fontWeight: 'bold',
              color: '#8884D8', 
              background: 'none',
              border: '5px solid #8884D8',
              transform: 'scale(1.05)',
              boxShadow: 'rgba(0,0,0,0.5) 0px 1px 2px 0px, rgba(0,0,0,0.65) 0px 2px 6px 2px;',
            }
          }}
        >
          Salvation
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default NotFound;
