import React from "react";

// components imports
import LandingPageNavbar from "../../components/navigation/LandingPageNavbar";
import Values from '../../components/landingpage/Values';

// external toolbox imports 
import { Box } from "@chakra-ui/react"


const Home = () => {
  return (
    <Box bg="#080808" h="100vh">
      <LandingPageNavbar />
      <Values/>
    </Box>
  );
};

export default Home;
