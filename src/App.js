import {Box,Text,Heading,Flex, Container, Icon,Button} from "@chakra-ui/react"
import { useState,useEffect } from "react";
import {ChevronDownIcon} from "@chakra-ui/icons"
import Card from "./components/Card"

import AddFilterNav from "./components/AddFilterNav";
import {useReducer} from "react"
import {HighlightContext} from "./context/HighlightContext"
import reducers from "./context/reducers"

function App() {
  
  const val = JSON.parse(localStorage.getItem('localhighlights'));
  const [highlights,dispatch] = useReducer(reducers,val);
  
  console.log(highlights);
  
  return (
    <HighlightContext.Provider value={{highlights,dispatch}}>
    <Container maxW="container.xl">
      <Flex dir="row" align='center' h="7vh" justify='space-between' bg="teal.100" mt={2} borderRadius="base">
        <Box d='flex' ml={2} flexDir="row" color="blue.500" fontFamily="mono" fontSize="2xl" _hover={{color:"teal.900"}}>
          <Text>Messaging</Text><Text>/Affinity Map <ChevronDownIcon /></Text>
        </Box>
        <Box>
          <Button mr={2} colorScheme="linkedin" variant="outline">Group Highlights</Button>
          <Button mr={2} colorScheme="linkedin" >Button</Button>
        </Box>
      </Flex>
      <AddFilterNav />
      <Box maxW="container.xl" d='flex' alignItems="flex-start" justifyItems="space-evenly" flexWrap="wrap" alignItems="flex-start" >
        {highlights.map((highlight,index) => {

          return (
            <Card key={index} highlight={highlight}  />
          )
        })}
      </Box>
    </Container>
    </HighlightContext.Provider>
  );
}

export default App;
