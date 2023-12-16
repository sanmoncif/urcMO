import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Input,
  Button,
  InputGroup,
  Badge,
  Flex,
  Divider
} from '@chakra-ui/react';

const messages = [
  { id: 1, text: "Hey there! Did you finish the science project?", isSender: false },
  { id: 2, text: "Not yet, still working on the final touches.", isSender: true },
];

const Test = () => {
  return (
    <Box bg="gray.100" w="100%" p={4}>
      <HStack spacing={4}>
        <Box w="30%" bg="white" borderRadius="lg" p={4}>
          <InputGroup mb={4}>
            <Input placeholder="search" />
          </InputGroup>
          <VStack align="stretch" divider={<Divider />}>
            {/* Friend 1 */}
            <HStack p={2} spacing={4}>
              <Avatar name="Aura Margaret" src="path-to-avatar.jpg" />
              <VStack align="start" justify="center">
                <Text fontWeight="bold">Aura Margaret</Text>
                <Text fontSize="sm">How are you today?</Text>
              </VStack>
              <Badge ml="auto" colorScheme="green">Online</Badge>
            </HStack>
            {/* Friend 2 */}
            <HStack p={2} spacing={4}>
              <Avatar name="Jae Hyuk" src="path-to-avatar.jpg" />
              <VStack align="start" justify="center">
                <Text fontWeight="bold">Jae Hyuk</Text>
                <Text fontSize="sm">Let&apos;s meet up later!</Text>
              </VStack>
            </HStack>
            {/* ... other friends */}
          </VStack>
        </Box>
        <Box flex="1" bg="white" borderRadius="lg" p={4}>
          {/* Chat messages */}
          <VStack align="stretch" spacing={4} overflowY="auto" maxHeight="500px">
            {messages.map((message) => (
              <Flex w="full" justify={message.isSender ? 'end' : 'start'} key={message.id}>
                <Box
                  bg={message.isSender ? 'blue.100' : 'gray.100'}
                  borderRadius="lg"
                  p={3}
                  maxWidth="70%"
                >
                  <Text fontSize="sm">{message.text}</Text>
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>
      </HStack>
      <HStack mt={4}>
        <Input flex="1" placeholder="Envoyer un message" />
        <Button colorScheme="blue">Send</Button>
      </HStack>
    </Box>
  );
};

export default Test;
