import React, { useEffect, useReducer, useState } from "react";

import AdminToolbar from "../../../components/navigation/AdminToolbar";
import PitchManagementToolbar from "../../../components/navigation/PitchManagamentToolbar";
import PitchCardsNavigation from '../../../components/navigation/PitchCardsNavigation'

// external toolbox imports
import {
  Box,
  Grid,
  Flex,
  Center,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Divider,
  Stack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";


// react icons import
import { FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";

//assets imports
import PitchCreation from "./PitchCreation";
import noImage from "../../../assets/img/no-image.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, pitches: action.payload, filteredPitches: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_SUCCESS':
      return { ...state, successCreate: true };
    case 'CREATE_RESET':
      return { ...state, successCreate: false };
    case 'FILTER_SUCCESS':
      return { ...state, filteredPitches: action.payload };
    default:
      return state;
  }
};

const PitchManagement = () => {
  const navigate = useNavigate();
  const [showView, setShowView] = useState(true);
  const [showCreation, setShowCreation] = useState(false);
  const [showMyPitches, setShowMyPitches] = useState(false);
  const [{ loading, error, pitches, filteredPitches, successCreate }, dispatch] = useReducer(reducer, {
    pitches: [],
    filteredPitches: [],
    loading: true,
    error: '',
  });
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  useEffect(() => {
    if(!userInfo) {
      navigate("/user-signin");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('https://footplanet-backend.herokuapp.com/api/pitch');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err });
      }
    };
    if(successCreate) {
      dispatch({ type: 'CREATE_RESET' });
    }else {
      fetchData();
    }
  }, [successCreate]);
  

  return (
    <Box bg="#080808" h="100%">
      <AdminToolbar />
      <PitchManagementToolbar setShowView={setShowView} setShowCreation={setShowCreation} setShowMyPitches={setShowMyPitches} pitches={pitches} dispatch={dispatch} />
      {showView ? (
      <Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} margin="0 1%" padding="1%">
          <Flex>
            {filteredPitches.slice(start,end).map(c => (
            <Center p="0 0.5%" key={c.pitchId}>
              <Card maxW="sm" bg="#101010">
                <CardBody>
                  <Image
                    src={c.photo ? c.photo : noImage}
                    alt={c.name}
                    borderRadius="lg"
                    style={{width: '100%', height: '200px'}}
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md" color="#F5F5F5">{c.name}</Heading>
                    <Flex alignItems="center">
                      <FaMapMarkerAlt color="#F5F5F5"/>
                      <Text color="#F5F5F5">{c.complexe.name}</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <FaDollarSign color="#F5F5F5"/>
                      <Text color="#F5F5F5">{c.price}</Text>
                    </Flex>
                    <Text color="blue.600" fontSize="2xl">
                      {c.numberPitchs}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Link to={`/pitch-details/${c.pitchId}`}>
                      <Button variant="solid" colorScheme="blue">
                        View details
                      </Button>
                    </Link>
                    <Link to={`/pitch-reservation/${c.pitchId}`} disabled={c.owner.userId === userInfo.userId} >
                      <Button variant="ghost" colorScheme="blue">
                        Make a reservation
                      </Button>
                    </Link>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Center>
            ))}
          
          </Flex>
      </Grid>
      <PitchCardsNavigation start={[start, setStart]} end={[end, setEnd]} length={filteredPitches.length} />
      </Box>) 
      : showCreation ? (<PitchCreation dispatch={dispatch} />) : showMyPitches && (
          <Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} margin="0 1%" padding="1%">
          <Flex>
            {filteredPitches.filter(c => c.owner.userId === userInfo.userId).slice(start,end).map(c => (
            <Center p="0 0.5%" key={c.pitchId}>
              <Card maxW="sm" bg="#101010">
                <CardBody>
                  <Image
                    src={c.photo ? c.photo : noImage}
                    alt={c.name}
                    borderRadius="lg"
                    style={{width: '100%', height: '200px'}}
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md" color="#F5F5F5">{c.name}</Heading>
                    <Flex alignItems="center">
                      <FaMapMarkerAlt color="#F5F5F5"/>
                      <Text color="#F5F5F5">{c.complexe.name}</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <FaDollarSign color="#F5F5F5"/>
                      <Text color="#F5F5F5">{c.price}</Text>
                    </Flex>
                    <Text color="blue.600" fontSize="2xl">
                      {c.numberPitchs}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Link to={`/pitch-details/${c.pitchId}`}>
                      <Button variant="solid" colorScheme="blue">
                        View details
                      </Button>
                    </Link>
                    <Link to={`/pitch-reservation/${c.pitchId}`}>
                      <Button variant="ghost" colorScheme="blue">
                        Make a reservation
                      </Button>
                    </Link>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Center>
            ))}
          
          </Flex>
      </Grid>
      <PitchCardsNavigation start={[start, setStart]} end={[end, setEnd]} length={filteredPitches.length} />
      </Box>
      )}
    </Box>
  );
};

export default PitchManagement;
