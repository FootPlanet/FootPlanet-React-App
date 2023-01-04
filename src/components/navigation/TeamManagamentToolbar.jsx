import React, { useState } from "react";

// chakra UI api
import {
  Grid,
  Flex,
  Center,
  Heading,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

// icons import
import {
  FaSearch,
  FaPlusCircle,
  FaLayerGroup,
  FaFolder,
  FaRegFutbol,
} from "react-icons/fa";


const TeamManagamentToolbar = ({setShowView, setShowCreation, setShowMyTeams, teams, dispatch}) => {
  const [searchTeam, setSearchTeam] = useState('');

  const searchHandler = () => {
    dispatch({
      type: 'FILTER_SUCCESS',
      payload: teams.filter((t) =>
        t.name.toLowerCase().includes(searchTeam.toLowerCase())
      ),
    });
  }

  return (
    <Box bg="#101010" padding="1% 2%">
      <Flex alignItems="center" justifyContent="space-evenly" width="50%">
        <FaRegFutbol color="teal" fontSize="2rem" />
        <Heading as="h1" size="lg" color="teal">
          DISCOVER THE AVAILABLE TEAMS
        </Heading>
      </Flex>

      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={6}
        width="100%"
        margin="2% 0 1%"
        padding="0"
      >
        <Flex>
          <Center>
            <Box>
              <Flex justifyContent="space-around">
                <Input
                  focusBorderColor="lime"
                  placeholder="Look for a team"
                  width="100%"
                  value={searchTeam}
                  onChange={(e) => setSearchTeam(e.target.value)}
                />
                <Button
                  leftIcon={<FaSearch />}
                  colorScheme="green"
                  variant="solid"
                  onClick={searchHandler}
                >
                  Search
                </Button>
              </Flex>
            </Box>
          </Center>
        </Flex>
        <Flex alignItems="center" justifyContent="space-evenly">
          <Link onClick={() => {
            setShowMyTeams(false);
            setShowCreation(true);
            setShowView(false);
          }}>
            <Box
              as="button"
              fontSize="15px"
              padding="5%"
              borderRadius="2%"
              width="10rem"
              transition="0.5s"
              color="#F5F5F5"
              bg="#0FCD39"
              _hover={{ bg: "#009420" }}
            >
              <Flex alignItems="center" justifyContent="space-evenly">
                <FaPlusCircle />
                New team
              </Flex>
            </Box>
          </Link>

          <Link onClick={() => {
            setShowMyTeams(false);
            setShowView(true);
            setShowCreation(false);
          }}>
            <Box
              as="button"
              fontSize="15px"
              padding="5%"
              borderRadius="2%"
              width="10rem"
              transition="0.5s"
              color="#F5F5F5"
              bg={`linear-gradient(to right, #00C6FB, #005BEA)`}
              _hover={{ bg: "#005BEA", transition: "0.5s" }}
            >
              <Flex alignItems="center" justifyContent="space-evenly">
                <FaLayerGroup />
                View all teams
              </Flex>
            </Box>
          </Link>

          <Link onClick={() => {
            setShowMyTeams(true);
            setShowView(false);
            setShowCreation(false);
          }} >
            <Box
              as="button"
              fontSize="15px"
              padding="5%"
              borderRadius="2%"
              width="10rem"
              transition="0.5s"
              color="#F5F5F5"
              bg="#00BBFF"
              _hover={{ bg: "#00A1DB" }}
            >
              <Flex alignItems="center" justifyContent="space-evenly">
                <FaFolder />
                My teams
              </Flex>
            </Box>
          </Link>
        </Flex>
      </Grid>
    </Box>
  );
};

export default TeamManagamentToolbar;
