import React from "react";

// chakra UI imports
import { Flex, ButtonGroup, Button, Heading, Text } from "@chakra-ui/react";

//react icons imports
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const PitchCardsNavigation = ({start, end, length}) => {

  const previousHandler = () => {
    if(start[0] !== 0) {
      start[1](start[0] - 4);
      end[1](end[0] - 4)

    }
  }

  const nextHandler = () => {
    if(end[0] <= length) {
      start[1](start[0] + 4)
      end[1](end[0] + 4)
    }
  }

  return (
    <Flex justifyContent="flex-end" p="1%">
      <ButtonGroup>
        <Button colorScheme="teal" variant="outline" alignItems="center" justifyContent="space-evenly" width="8rem" onClick={previousHandler} >
        <FaArrowCircleLeft/>
          <Text>Previous</Text>
        </Button>
        <Button colorScheme="teal" variant="outline" alignItems="center" justifyContent="space-evenly" width="8rem" onClick={nextHandler} >
        <Text>Next</Text>
        <FaArrowCircleRight/>
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default PitchCardsNavigation;
