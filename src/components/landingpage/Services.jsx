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
  Image,
  Stack,
  CardFooter,
  Button,
} from "@chakra-ui/react";

// fa imports
import { FaCheckCircle } from "react-icons/fa";

// assets imports
import service_one from "../../assets/img/service_one.jpg";
import service_two from "../../assets/img/service_two.jpg";
import service_tree from "../../assets/img/service_tree.jpg";
import service_four from "../../assets/img/service_four.jpg";

const Services = () => {
  return (
    <Grid id="services" backgroundColor="#010101">
      <GridItem textAlign="center" my="2%">
        <Heading size="2xl">Services</Heading>
      </GridItem>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        m="2%"
        transition="1s"
        _hover={{
          background: "#181818",
          transition: "0.5s",
          color: "#F9F9F9",
        }}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={service_one}
          alt="ball"
        />

        <Stack>
          <CardBody>
            <Heading size="md" color="teal">
              Effortless Football Pitch Booking with Our Online Platform
            </Heading>
            <Heading py="2" size="md" color="#D3D3D3">
              Our company provides an online platform for individuals and
              organizations to easily find and book football pitches for their
              use. Whether you own a complex with multiple pitches or are
              looking to rent a pitch for a one-time game, our platform allows
              you to easily search and reserve a suitable location.
            </Heading>
          </CardBody>
        </Stack>
      </Card>

      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        m="2%"
        transition="1s"
        _hover={{
          background: "#181818",
          transition: "0.5s",
          color: "#F9F9F9",
        }}
      >
        <Stack>
          <CardBody>
            <Heading size="md" color="teal">
              Streamline Your Football Game Organization with Our Feature-Packed
              Online Platform
            </Heading>
            <Heading py="2" size="md" color="#D3D3D3">
              In addition to facilitating the booking process, our platform also
              offers a range of features to make organizing and managing your
              football games as smooth as possible. This includes the ability to
              create and join teams, schedule matches, and communicate with
              other players.
            </Heading>
          </CardBody>
        </Stack>

        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={service_two}
          alt="football team"
        />
      </Card>

      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        m="2%"
        transition="1s"
        _hover={{
          background: "#181818",
          transition: "0.5s",
          color: "#F9F9F9",
        }}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "100px" }}
          src={service_tree}
          alt="ball"
        />

        <Stack>
          <CardBody>
            <Heading size="md" color="teal">
              Stay Connected and Up-to-Date with Our Mobile App for Android
              Devices
            </Heading>
            <Heading py="2" size="md" color="#D3D3D3">
              Our mobile app, available for Android devices, allows you to
              access all of these features on the go, making it easy to stay
              connected with your teammates and opponents, and stay up-to-date
              on the latest game schedules and availability.
            </Heading>
          </CardBody>
        </Stack>
      </Card>

      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        m="2%"
        transition="1s"
        _hover={{
          background: "#181818",
          transition: "0.5s",
          color: "#F9F9F9",
        }}
      >
        <Stack>
          <CardBody>
            <Heading size="md" color="teal">
              Join the Football Community and Book Your Next Game with Our
              Platform
            </Heading>
            <Heading py="2" size="md" color="#D3D3D3">
              Whether you are a seasoned player looking for a new pitch to call
              home, or are new to the sport and looking to join a team, our
              platform has something for everyone. So why wait? Sign up now and
              start enjoying all the benefits of our football booking and
              management service!
            </Heading>
          </CardBody>
        </Stack>

        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={service_four}
          alt="football boots"
        />
      </Card>
    </Grid>
  );
};

export default Services;
