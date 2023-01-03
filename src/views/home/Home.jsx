import React from "react";

// components imports
import LandingPageNavbar from "../../components/navigation/LandingPageNavbar";
import Values from '../../components/landingpage/Values';
import Services from '../../components/landingpage/Services'

// external toolbox imports 
import { Box } from "@chakra-ui/react"


const Home = () => {
  return (
    <Box bg="#080808" h="100vh">
      <LandingPageNavbar />
      <Services/>
      <Values/>
    </Box>
  );
};

export default Home;
