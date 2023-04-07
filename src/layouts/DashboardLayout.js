import React, { useCallback } from "react";
import { Outlet } from 'react-router-dom';
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { Container as ParticlesContainer } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import Box from '@mui/material/Box';
import particlesConfig from '../design/particles/particlesConfig';


const DashboardLayout = () => {
	const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: ParticlesContainer | undefined) => {
    //await console.log(container);
  }, []);


	return (
		<React.Fragment>
			<Particles init={particlesInit} loaded={particlesLoaded} options={particlesConfig} id="tsparticles"/>
			<Box sx={{ zIndex: 1, m: 0, p: 0 }}>
	    	<Outlet />
			</Box>
		</React.Fragment>
	);
};

export default DashboardLayout;