import React from "react";
import { Link } from "react-router-dom";

// toolbox imports
import { Box, Flex } from "@chakra-ui/react";
import { Heading } from '@chakra-ui/react'

// import static files
import RegistrationBG from '../../assets/img/user_registration_bg.png';

const UserSignUp = () => {
  return (
    <Box display="flex">
      <Box bgImage={RegistrationBG} w='40%' h='100vh' bgPosition='center' bgSize='100%'/>
      <Box bg="#080808" w='60%' p='8% 10%'>
        <Heading variant='logo' as='h1' size='3xl' ><span style={{ color: '#19D2C2' }}>Foot</span><span style={{ color: '#0AADE8' }}>Planet</span></Heading>
        <Heading variant='welcomeMessage' as='h3' >Get started</Heading>
        <Heading variant='helperMessage' as='h6' size='m' >already have an account ?<Link to='/user-signin' style={{color: '#0AADE8', margin: '0 0 0 1%'}}>sign in</Link></Heading>
      </Box>
    </Box>
  );
};

export default UserSignUp;
