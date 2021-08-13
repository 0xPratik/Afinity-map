import {
  Box,
  Text,
  Heading,
  Flex,
  Container,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Card from "./components/Card";
import AddFilterNav from "./components/AddFilterNav";
import { useReducer } from "react";
import { HighlightContext } from "./context/HighlightContext";
import { BucketContext } from "./context/Bucket/BucketContext";
import BucketReducer from "./context/Bucket/reducer";
import reducers from "./context/reducers";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  // const val = JSON.parse(localStorage.getItem('localhighlights'));
  // console.log(val);
  // const bucket = JSON.parse(localStorage.getItem('buckets'));
  // console.log(bucket);

  const initialHighlight = [];
  const initialBucket = [];
  const [highlights, dispatch] = useReducer(reducers, initialHighlight);
  const [buckets, dispatchBucket] = useReducer(BucketReducer, initialBucket);

  console.log("BUCKETS", buckets);

  useEffect(() => {
    if (initialBucket === []) {
      initialBucket = JSON.parse(localStorage.getItem("buckets"));
    }
    if (initialHighlight === []) {
      initialHighlight = JSON.parse(localStorage.getItem("localhighlights"));
    }
  }, []);

  const handleDragEnd = (result) => {};

  return (
    <BucketContext.Provider value={{ buckets, dispatchBucket }}>
      <HighlightContext.Provider value={{ highlights, dispatch }}>
        <Container maxW="container.xl">
          <Flex
            dir="row"
            align="center"
            h="7vh"
            justify="space-between"
            bg="teal.100"
            mt={2}
            borderRadius="base"
          >
            <Box
              d="flex"
              ml={2}
              flexDir="row"
              color="blue.500"
              fontFamily="mono"
              fontSize="2xl"
              _hover={{ color: "teal.900" }}
            >
              <Text>Messaging</Text>
              <Text>
                /Affinity Map <ChevronDownIcon />
              </Text>
            </Box>
            <Box>
              <Button mr={2} colorScheme="linkedin" variant="outline">
                Group Highlights
              </Button>
              <Button mr={2} colorScheme="linkedin">
                Button
              </Button>
            </Box>
          </Flex>
          <AddFilterNav />
              <Box
                maxW="container.xl"
                d="flex"
                alignItems="flex-start"
                justifyItems="space-evenly"
                flexWrap="wrap"
                alignItems="flex-start"
              >
                {highlights.map((highlight, index) => {
                  return <Card key={index} highlight={highlight} />;
                })}
              </Box>
        </Container>
      </HighlightContext.Provider>
    </BucketContext.Provider>
  );
}

export default App;
