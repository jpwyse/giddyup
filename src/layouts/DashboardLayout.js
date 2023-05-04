import React from "react";
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

const DashboardLayout = () => {
	return (
		<React.Fragment>
			<Box sx={{ zIndex: 1, m: 0, p: 0, background: 'linear-gradient(315deg, #2d3436 0%, #000000 74%);' }}>
	    	<Outlet />
			</Box>
		</React.Fragment>
	);
};

export default DashboardLayout;