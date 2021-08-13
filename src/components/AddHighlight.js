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
  import { ADD_HIGHLIGHT } from "../context/Actions.types";
  import {ADD_HIGHLIGHT_BUCKET} from "../context/Bucket/Actions.types"
  import { HighlightContext } from "../context/HighlightContext";
  import {BucketContext} from "../context/Bucket/BucketContext"

  
  import { Formik, Field, Form } from "formik";
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    useDisclosure,
  } from "@chakra-ui/react";

export default function AddHighlight() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  const { dispatch, highlights } = useContext(HighlightContext);
  const {dispatchBucket,buckets} = useContext(BucketContext);


  useEffect(() => {
    localStorage.setItem("localhighlights", JSON.stringify(highlights));
  }, [highlights]);

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
                initialValues={{ bucketId: "", content: "", user_name: "" }}
                onSubmit={(values, actions) => {
                  const id = nanoid();
                  const hilight = { ...values, id: id };
                  console.log(hilight);
                  buckets.map(b => {
                      if(b.id === hilight.bucketId)
                      {
                          b.highlights.push(id);
                      }
                  })
                //   dispatchBucket({type:ADD_HIGHLIGHT_BUCKET,payload:{id:id,bucket_id:hilight.bucketId}});
                  dispatch({ type: ADD_HIGHLIGHT, payload: hilight });
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="bucketId">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="bucket">Buckets</FormLabel>
                          <Select variant="filled" placeholder="Tags" {...field}>
                            {buckets.map((b) => {  
                                return (
                                    <option key={b.id} value={b.id}>{b.bucket}</option>
                                )
                            })}
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
    )
}
