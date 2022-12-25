import React from "react";

// chakra UI imports
import { Flex, ButtonGroup, Button, Heading, Text } from "@chakra-ui/react";

//react icons imports
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const PitchCardsNavigation = () => {
  return (
    <Flex justifyContent="flex-end" p="1%">
      <ButtonGroup>
        <Button colorScheme="teal" variant="outline" alignItems="center" justifyContent="space-evenly" width="8rem">
        <FaArrowCircleLeft/>
          <Text>Previous</Text>
        </Button>
        <Button colorScheme="teal" variant="outline" alignItems="center" justifyContent="space-evenly" width="8rem">
        <Text>Next</Text>
        <FaArrowCircleRight/>
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default PitchCardsNavigation;
