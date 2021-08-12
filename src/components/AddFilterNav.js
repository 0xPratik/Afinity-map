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

import { ChevronDownIcon } from "@chakra-ui/icons";

export default function AddFilterNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dispatch, highlights } = useContext(HighlightContext);

  useEffect(() => {
    localStorage.setItem("localhighlights", JSON.stringify(highlights));
  }, [highlights]);

  console.log("Filter apge", highlights);

  function validateContent(value) {
    let error;
    if (!value) {
      error = "highlight is required";
    }
    return error;
  }

  function validateUserName(value) {
    let error;
    if (!value) {
      error = "Your name is required";
    }
    return error;
  }
  return (
    <Flex
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
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box>
        <Button mr={2} colorScheme="teal" onClick={onOpen}>
          Create a highlight
        </Button> 
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Please Add your Highlight</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{ bucket: "", content: "", user_name: "" }}
                onSubmit={(values, actions) => {
                  const id = nanoid();
                  const hilight = { ...values, id: id };
        
                  dispatch({ type: ADD_HIGHLIGHT, payload: hilight });
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="bucket">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="bucket">Bucketss</FormLabel>
                          <Select variant="filled" placeholder="Tags" {...field}>
                            <option value="school">School</option>
                            <option value="college">College</option>
                            <option value="work">Work</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.content}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="content" validate={validateContent}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.content && form.touched.content
                          }
                        >
                          <FormLabel htmlFor="content">Highlight</FormLabel>
                          <Textarea
                            {...field}
                            id="name"
                            placeholder="What's the highligh for today"
                          />
                          <FormErrorMessage>
                            {form.errors.content}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="user_name" validate={validateUserName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.content && form.touched.user_name
                          }
                        >
                          <FormLabel htmlFor="user_name">User Name</FormLabel>
                          <Input {...field} id="name" placeholder="Joe Doe" />
                          <FormErrorMessage>
                            {form.errors.content}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      leftIcon={<AddIcon />}
                      mt={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Add
                    </Button>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}
