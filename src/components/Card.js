import { Box, Text, Flex, Button, } from "@chakra-ui/react";
import {DELETE_HIGHLIGHT,UPDATE_HIGHLIGHT} from "../context/Actions.types"
import {AddIcon} from "@chakra-ui/icons"
import { useState,useContext,useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Textarea,
  Input
} from "@chakra-ui/react"
import { Formik, Field, Form } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  useDisclosure,
} from "@chakra-ui/react";
import {BucketContext} from "../context/Bucket/BucketContext"
import {HighlightContext} from "../context/HighlightContext"
// import {UPDATE_BUCKET} from "../context/Bucket/Actions.types"

export default function Card({ highlight }) {

    const {dispatch} = useContext(HighlightContext)
    const [bucketName,setBucketName] = useState();
    const {buckets} = useContext(BucketContext)
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log(buckets);

    const FindBucketName = (bid) => {
      const bucketName = buckets.filter(b => b.id === bid )
      setBucketName(bucketName[0]);
    }

    useEffect(() => {
      FindBucketName(highlight.bucketId)
    },[bucketName,buckets,highlight])

    const updateHighlight = (id,content,user_name,bucket_id) => {
      dispatch({type:UPDATE_HIGHLIGHT,payload:{id:id,newContent:content,newUser:user_name,bucketId:bucket_id}})
    }

  
    const handleDelete = (id) => {
        dispatch({type:DELETE_HIGHLIGHT,payload:id});
    }

    console.log(bucketName);
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
            {bucketName && (
              <Button colorScheme="blackAlpha">{bucketName.bucket}</Button>
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
          <Button size="sm" colorScheme="messenger" variant="outline" onClick={onOpen}>
            Update
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update the Highlight</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{ content: "", user_name: "",bucket_id:"" }}
                onSubmit={(values, actions) => {
                  const newHighlight = { ...values,id:highlight.id };
                  // console.log(hilight);
                  updateHighlight(newHighlight.id,newHighlight.content,newHighlight.user_name,newHighlight.bucket_id);
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="bucket_id">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="bucket">Buckets</FormLabel>
                          <Select variant="filled" placeholder="Bucket" {...field}>
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
                    <Field name="content">
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
                    <Field name="user_name" >
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
                      Update
                    </Button>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
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
