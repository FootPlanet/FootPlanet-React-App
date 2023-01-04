import React from 'react'

// chakra UI api
import { Grid, Flex, Center, Heading, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// icons import 
import { FaDoorOpen } from "react-icons/fa";

const AdminToolbar = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6} padding="1% 2%" bg="#010101">
    <Flex>
      <Center>
        <Link to="/">
          <Heading variant="logo" as="h1" size="2xl">
            <span style={{ color: "#19D2C2" }}>Foot</span>
            <span style={{ color: "#0AADE8" }}>Planet</span>
          </Heading>
        </Link>
      </Center>
    </Flex>
    <Flex justifyContent="space-evenly">
      <Center>
        <Link to="/games">
          <Heading variant="navLink" as="h6" size="l">
            Games
          </Heading>
        </Link>
      </Center>
      <Center>
        <Link to="/team-management">
          <Heading variant="navLink" as="h6" size="l">
            Teams
          </Heading>
        </Link>
      </Center>
      <Center>
        <Link to="/complexe-management">
          <Heading variant="navLink" as="h6" size="l">
            Complexes
          </Heading>
        </Link>
      </Center>
      <Center>
        <Link to="/pitch-management">
          <Heading variant="navLink" as="h6" size="l">
            Pitches
          </Heading>
        </Link>
      </Center>
    </Flex>
    <Flex justifyContent="space-evenly">
      <Center>
        <Link to="/account">
          <Box
            as="button"
            fontSize="22px"
            padding="5% 10%"
            borderRadius="10%"
            width="8rem"
            color="#0AADE8"
            _hover={{ bg: "#090909" }}
          >
            Account
          </Box>
        </Link>
      </Center>
      <Center>
        <Link href="/">
          <FaDoorOpen color="#0AADE8" fontSize="2rem"/>  
        </Link>
      </Center>
    </Flex>
  </Grid>
  )
}

export default AdminToolbar