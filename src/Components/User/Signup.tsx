
import {useState} from "react";
import {signupUser} from "./SignupApi";
import {useRecoilState} from "recoil";
import {sessionState} from "../../Store/store";
import {Session} from "../../Model/common";
import { 
    Alert, 
    Box, 
    Button, 
    Container, 
    FormControl, 
    FormLabel, 
    Input, 
    VStack 
} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
import {CustomError} from "../../Model/CustomError";

export function SignUp() {

    const [error, setError] = useState({} as CustomError);
    const [result, setResult] = useState("");

    const [_, setSession] = useRecoilState(sessionState);

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        signupUser({user_id: -1, username:  data.get('login') as string, email: data.get('email') as string, password: data.get('password') as string},
            (result: Session) => {
                setSession(result);
                form.reset();
                setError(new CustomError(""));
                setResult("Account Created Successfully");
                setTimeout(() => {navigate("/login")}, 2000);
            }, (loginError: CustomError) => {
                setResult("");
                setError(loginError);
        });
    };

    return(
        <>

        <Container maxW="container.sm">
                <VStack spacing={4} align="stretch" mt={8}>
                    <Box>
                        <form onSubmit={handleSubmit}>
                            <FormControl id="login" isRequired>
                                <FormLabel>Identifiant</FormLabel>
                                <Input name="login" type="text" placeholder="Enter your login" />
                            </FormControl>

                            <FormControl id="email" isRequired mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input name="email" type="email" placeholder="Enter your email" />
                            </FormControl>

                            <FormControl id="password" isRequired mt={4}>
                                <FormLabel>Mot de passe</FormLabel>
                                <Input name="password" type="password" placeholder="Enter your password" />
                            </FormControl>

                            <Button
                                mt={6}
                                w="full"
                                colorScheme="blue"
                                type="submit"
                            >
                                Create Account
                            </Button>
                        </form>
                    </Box>

                    {error.message && (
                        <Alert status="error" mt={4}>
                            {error.message}
                        </Alert>
                    )}
                </VStack>
            </Container>
        </>
    );
}