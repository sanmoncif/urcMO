import { Flex, Spinner, Text } from "@chakra-ui/react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      backgroundColor="gray.100"
    >
      <Spinner as={FaSpinner} size="xl" color="blue.500" mb={4} />
      <Text fontSize="lg" fontWeight="bold">
        Loading. Please wait.
      </Text>
    </Flex>
  );
};

export default Loading;
