import React, { useEffect, useReducer, useState } from "react";

import AdminToolbar from "../../../components/navigation/AdminToolbar";
import ComplexeManagementToolbar from "../../../components/navigation/ComplexeManagamentToolbar";
import ComplexeCardsNavigation from '../../../components/navigation/ComplexeCardsNavigation'

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
import { FaMapMarkerAlt } from "react-icons/fa";

//assets imports
import TestPitch from '../../../assets/img/pitch_test.jpg'
import ComplexeCreation from "./ComplexeCreation";
import noImage from "../../../assets/img/no-image.png";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, complexes: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ComplexeManagement = () => {
  const [showView, setShowView] = useState(true);
  const [showCreation, setShowCreation] = useState(false);
  const [{ loading, error, complexes }, dispatch] = useReducer(reducer, {
    complexes: [],
    loading: true,
    error: '',
  });
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('https://footplanet-backend.herokuapp.com/api/complexe');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err });
      }
    };
    fetchData();
  }, []);
  

  return (
    <Box bg="#080808" h="100%">
      <AdminToolbar />
      <ComplexeManagementToolbar setShowView={setShowView} setShowCreation={setShowCreation} />
      {showView ? (
      <Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} margin="0 1%" padding="1%">
          <Flex>
            {complexes.slice(start,end).map(c => (
            <Center p="0 0.5%" key={c.complexeId}>
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
                      <Text color="#F5F5F5">{c.location}</Text>
                    </Flex>
                    <Text color="blue.600" fontSize="2xl">
                      {c.numberPitchs}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      Explore pitches
                    </Button>
                    <Button variant="ghost" colorScheme="blue">
                      View info
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Center>
            ))}
            {/* <Center p="0 0.5%">
              <Card maxW="sm" bg="#101010">
                <CardBody>
                  <Image
                    src={TestPitch}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md" color="#F5F5F5">Northern Complexe</Heading>
                    <Flex alignItems="center">
                      <FaMapMarkerAlt color="#F5F5F5"/>
                      <Text color="#F5F5F5">Marrakech, Morocco</Text>
                    </Flex>
                    <Text color="blue.600" fontSize="2xl">
                      6 Pitches
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      Explore pitches
                    </Button>
                    <Button variant="ghost" colorScheme="blue">
                      View info
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Center>
            <Center p="0 0.5%">
              <Card maxW="sm" bg="#101010">
                <CardBody>
                  <Image
                    src={TestPitch}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md" color="#F5F5F5">Northern Complexe</Heading>
                    <Flex alignItems="center">
                      <FaMapMarkerAlt color="#F5F5F5"/>
                      <Text color="#F5F5F5">Marrakech, Morocco</Text>
                    </Flex>
                    <Text color="blue.600" fontSize="2xl">
                      6 Pitches
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      Explore pitches
                    </Button>
                    <Button variant="ghost" colorScheme="blue">
                      View info
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Center>
            <Center p="0 0.5%">
              <Card maxW="sm" bg="#101010">
                <CardBody>
                  <Image
                    src={TestPitch}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md" color="#F5F5F5">Northern Complexe</Heading>
                    <Flex alignItems="center">
                      <FaMapMarkerAlt color="#F5F5F5"/>
                      <Text color="#F5F5F5">Marrakech, Morocco</Text>
                    </Flex>
                    <Text color="blue.600" fontSize="2xl">
                      6 Pitches
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      Explore pitches
                    </Button>
                    <Button variant="ghost" colorScheme="blue">
                      View info
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Center> */}
          </Flex>
      </Grid>
      <ComplexeCardsNavigation start={[start, setStart]} end={[end, setEnd]} length={complexes.length} />
      </Box>) 
      : showCreation && (<ComplexeCreation/>)}
    </Box>
  );
};

export default ComplexeManagement;
