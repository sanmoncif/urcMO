import React from "react";
import { Flex, Text, VStack, Heading } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      backgroundColor="gray.100"
    >
      <VStack spacing={4}>
        <Heading fontSize="4xl" color="red.500">
          404 Not Found
        </Heading>
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </Text>
      </VStack>
    </Flex>
  );
};

export default NotFound;
