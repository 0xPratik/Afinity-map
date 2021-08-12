import { Box, Heading, Text, Flex, Button, Divider } from "@chakra-ui/react";
import {DELETE_HIGHLIGHT} from "../context/Actions.types"
import {HighlightContext} from "../context/HighlightContext"
import { useState,useContext } from "react";

export default function Card({ highlight }) {

    const {dispatch} = useContext(HighlightContext)

    const handleDelete = (id) => {
        dispatch({type:DELETE_HIGHLIGHT,payload:id});
    }
  return (
    <>
      <Flex
        fontFamily="mono"
        bg="yellow.200"
        minH="18.5rem"
        minW="18.5rem"
        p={4}
        m={2}
        direction="column"
        align="flex-start"
        justify="space-between"
      >
        <Flex direction="column" align="flex-start" justify="space-between">
          <Box
            d="flex"
            maxW="15rem"
            flexDir="column"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            {highlight.bucket && (
              <Button colorScheme="blackAlpha">{highlight.bucket}</Button>
            )}
            <Text fontSize="md" mt={2}>
              {highlight.content}
            </Text>
          </Box>
          <Box mt={2}>
            <Text fontSize="md" color="gray.600">
              - {highlight.user_name}
            </Text>
          </Box>
        </Flex>
        <Flex
          mt={2}
          minW="15rem"
          direction="row"
          align="flex-end"
          justify="flex-end"
        >
          <Button mr={2} size="sm" colorScheme="red" variant="outline" onClick={() => handleDelete(highlight.id)}>
            Delete
          </Button>
          <Button size="sm" colorScheme="messenger" variant="outline">
            Update
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

Card.defaultProps = {
  tag: "Services",
  content:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ",
  user_name: "Pratik Saria",
};
