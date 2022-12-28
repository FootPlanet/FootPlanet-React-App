import React, { useState } from "react";

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

const ComplexeManagement = () => {
  const [showView, setShowView] = useState(true);
  const [showCreation, setShowCreation] = useState(false);

  return (
    <Box bg="#080808" h="100%">
      <AdminToolbar />
      <ComplexeManagementToolbar setShowView={setShowView} setShowCreation={setShowCreation} />
      {showView ? (
      <Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} margin="0 1%" padding="1%">
          <Flex>
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
            </Center>
          </Flex>
      </Grid>
      <ComplexeCardsNavigation/>
      </Box>) 
      : showCreation && (<ComplexeCreation/>)}
    </Box>
  );
};

export default ComplexeManagement;
