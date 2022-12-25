import React from "react";

// components imports
import LandingPageNavbar from "../../components/navigation/LandingPageNavbar";


// external toolbox imports 
import { Box } from "@chakra-ui/react"


const Home = () => {
  return (
    <Box bg="#080808" h="100vh">
      <LandingPageNavbar />
    </Box>
  );
};

export default Home;
