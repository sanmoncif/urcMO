import { Flex, Box, Button, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';


export default function Navbar() {
    return (
        <Box as="nav" bg="blue.600" color="white" w="100%" p={4} position="fixed" top={0} zIndex={1}>
            <Flex align="center" justify="space-between" wrap="wrap" maxW="1200px" mx="auto">
                <Box>
                    <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                        <Text fontSize="xl" fontWeight="bold">
                            UBO Relay Chat
                        </Text>
                    </Link>
                </Box>
                <Box>
                    <Button as={RouterLink} to="/login" variant="solid" colorScheme="teal" mr={4}>
                        Connexion
                    </Button>
                    <Button as={RouterLink} to="/register" variant="solid" colorScheme="teal">
                        Créer un compte
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
}

