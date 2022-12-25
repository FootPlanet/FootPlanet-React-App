import React from "react";

// chakra UI api
import { Grid, Flex, Center, Heading, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LandingPageNavbar = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6} padding="1% 2%">
      <Flex>
        <Center>
          <Link href="/">
            <Heading variant="logo" as="h1" size="2xl">
              <span style={{ color: "#19D2C2" }}>Foot</span>
              <span style={{ color: "#0AADE8" }}>Planet</span>
            </Heading>
          </Link>
        </Center>
      </Flex>
      <Flex justifyContent="space-evenly">
        <Center>
          <Link href="#intro">
            <Heading variant="navLink" as="h6" size="l">
              Home
            </Heading>
          </Link>
        </Center>
        <Center>
          <Link href="#services">
            <Heading variant="navLink" as="h6" size="l">
              Services
            </Heading>
          </Link>
        </Center>
        <Center>
          <Link href="#services">
            <Heading variant="navLink" as="h6" size="l">
              Our values
            </Heading>
          </Link>
        </Center>
      </Flex>
      <Flex>
        <Center>
          <Link href="/user-signin">
            <Box as="button" fontSize="22px" padding="5% 10%" borderRadius="10%" width="5rem" color='#0AADE8' _hover={{ bg: '#ebedf0' }}>
              Log in
            </Box>
          </Link>
          <Link href="/user-signin">
            <Box as="button" fontSize="22px" padding="5% 10%" borderRadius="2%" bg="#0AADE8" width="10rem" color='#F5F5F5' _hover={{ bg: '#00506d' }}>
              Get started
            </Box>
          </Link>
        </Center>
      </Flex>
    </Grid>
  );
};

export default LandingPageNavbar;
