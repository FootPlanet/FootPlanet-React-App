import React from "react";

// Chakra UI imports
import {
  Grid,
  GridItem,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
} from "@chakra-ui/react";

// fa imports
import { FaCheckCircle, FaHandshake } from "react-icons/fa";

const Values = () => {
  return (
    <Grid>
      <GridItem textAlign="center" my="2%">
        <Heading size="2xl">Our values</Heading>
      </GridItem>
      <Flex p="0 4%">
        <Card
          backgroundColor="#101010"
          borderRadius="2%"
          p="0"
          color="teal"
          textAlign="center"
          flex="1 1 0%"
          transition="1s"
          _hover={{
            background: "#181818",
            transition: "0.5s",
            color: "#F9F9F9",
          }}
        >
          <CardHeader
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FaCheckCircle />
            <Heading size="md">Convenience</Heading>
          </CardHeader>
          <CardBody p="5%">
            <Text>
              The software should make it easy for users to find and book
              available pitches, possibly through features like an interactive
              map or a straightforward booking process.
            </Text>
          </CardBody>
        </Card>
        <Card
          backgroundColor="#101010"
          borderRadius="2%"
          p="0"
          color="teal"
          textAlign="center"
          flex="1 1 0%"
          transition="1s"
          _hover={{
            background: "#181818",
            transition: "0.5s",
            color: "#F9F9F9",
          }}
        >
          <CardHeader
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FaCheckCircle />
            <Heading size="md">Flexibility</Heading>
          </CardHeader>
          <CardBody p="5%">
            <Text>
              Users should have the option to book pitches for various lengths
              of time, whether it's just for a quick pickup game or a longer
              league match.
            </Text>
          </CardBody>
        </Card>
        <Card
          backgroundColor="#101010"
          borderRadius="2%"
          p="0"
          color="teal"
          textAlign="center"
          flex="1 1 0%"
          transition="1s"
          _hover={{
            background: "#181818",
            transition: "0.5s",
            color: "#F9F9F9",
          }}
        >
          <CardHeader
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FaCheckCircle />
            <Heading size="md">Reliability</Heading>
          </CardHeader>
          <CardBody p="5%">
            <Text>
              The software should be reliable, with features like real-time
              pitch availability updates and reliable payment processing.
            </Text>
          </CardBody>
        </Card>
      </Flex>
      <Flex p="0 4%">
        <Card
          backgroundColor="#101010"
          borderRadius="2%"
          p="0"
          color="teal"
          textAlign="center"
          flex="1 1 0%"
          transition="1s"
          _hover={{
            background: "#181818",
            transition: "0.5s",
            color: "#F9F9F9",
          }}
        >
          <CardHeader
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FaCheckCircle />
            <Heading size="md">Affordability</Heading>
          </CardHeader>
          <CardBody p="5%">
            <Text>
              The software should offer competitive pricing for pitch rentals,
              especially when compared to alternative options like booking a
              pitch through a third-party provider.
            </Text>
          </CardBody>
        </Card>
        <Card
          backgroundColor="#101010"
          borderRadius="2%"
          p="0"
          color="teal"
          textAlign="center"
          flex="1 1 0%"
          transition="1s"
          _hover={{
            background: "#181818",
            transition: "0.5s",
            color: "#F9F9F9",
          }}
        >
          <CardHeader
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FaCheckCircle />
            <Heading size="md">Customer support</Heading>
          </CardHeader>
          <CardBody p="5%">
            <Text>
              Users should be able to easily contact customer support if they
              have any issues or questions while using the software.
            </Text>
          </CardBody>
        </Card>
        <Card
          backgroundColor="#101010"
          borderRadius="2%"
          p="0"
          color="teal"
          textAlign="center"
          flex="1 1 0%"
          transition="1s"
          _hover={{
            background: "#181818",
            transition: "0.5s",
            color: "#F9F9F9",
          }}
        >
          <CardHeader
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FaCheckCircle />
            <Heading size="md">Community building</Heading>
          </CardHeader>
          <CardBody p="5%">
            <Text>
              The software should provide opportunities for users to connect
              with other football enthusiasts in their area, whether through
              forums or other social features. This could help create a sense of
              community and encourage repeat business.
            </Text>
          </CardBody>
        </Card>
      </Flex>
    </Grid>
  );
};

export default Values;
