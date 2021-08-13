import {
  Box,
  Button,
  Text,
  Flex,
  Heading,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { nanoid } from "nanoid";

import { Formik, Field, Form } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useDisclosure,
} from "@chakra-ui/react";
import { ADD_HIGHLIGHT } from "../context/Actions.types";
import { HighlightContext } from "../context/HighlightContext";
import {BucketContext} from "../context/Bucket/BucketContext"
import AddHighlight from "./AddHighlight";
import AddBucket from "./AddBucket";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function AddFilterNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dispatch, highlights } = useContext(HighlightContext);
  const {buckets,dispatchBuckets} = useContext(BucketContext)

  console.log("BUCKET FROM FILTER",buckets);

  return (
    <Flex
      mt={2}
      borderRadius="base"
      align="center"
      justify="space-between"
      bg="red.100"
      h="7vh"
      fontFamily="mono"
    >
      <Box d="flex" alignItems="center">
        <Text mx={2} fontWeight="bold">
          Filter By
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="blue"
            rightIcon={<ChevronDownIcon />}
          >
            Filter
          </MenuButton>
          <MenuList>
            {buckets.map((bucket) => {
              return (
                <MenuItem key={bucket.id}>{bucket.bucket}</MenuItem>
              )
            })}
          </MenuList>
        </Menu>
      </Box>
      <Box d='flex' dir="row">
      <AddHighlight />
      <AddBucket />
      </Box>
    </Flex>
  );
}
