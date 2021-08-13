import {
    Box,
    Button,
    Text,
    Flex,
    Heading,
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
  import {BucketContext} from "../context/Bucket/BucketContext"
  import {ADD_BUCKET} from "../context/Bucket/Actions.types"

  
  import { Formik, Field, Form } from "formik";
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    useDisclosure,
  } from "@chakra-ui/react";

export default function AddBucket() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { buckets,dispatchBucket } = useContext(BucketContext);

  useEffect(() => {
    localStorage.setItem("buckets", JSON.stringify(buckets));
  }, [buckets]);

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
        <Box ml={2}>
        <Button mr={2} colorScheme="teal" onClick={onOpen}>
          Create a Bucket
        </Button> 
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Your Bucket Name</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{ bucket: "" }}
                onSubmit={(values, actions) => {
                  const id = nanoid();
                  const bucket = { ...values, id: id,highlights:[] };
                  console.log(bucket);
                  dispatchBucket({ type: ADD_BUCKET, payload: bucket });
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="bucket" validate={validateContent}>
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="content">Bucket Name</FormLabel>
                          <Input
                            {...field}
                            id="bucket"
                            placeholder="Dreams"
                          />
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
