import { 
    Alert, 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Container, 
    VStack, 
    useToast 
} from '@chakra-ui/react';
//import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react";
import {loginUser} from "./loginApi";
import {useRecoilState} from "recoil";
import {sessionState} from "../../Store/store";
import {Session} from "../../Model/common";
//import Container from "@mui/material/Container";
import {useNavigate} from "react-router-dom";
import {CustomError} from "../../Model/CustomError";

export function Login() {

    const [error, setError] = useState({} as CustomError);

    const [_, setSession] = useRecoilState(sessionState);

    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token === undefined || token === null || token === "") {
            setSession({token: "", externalId: ""});
        }
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        loginUser({user_id: -1, username:  data.get('login') as string, password: data.get('password') as string},
            (result: Session) => {
                setSession(result);
                form.reset();
                setError(new CustomError(""));
                navigate("/messages");
            }, (loginError: CustomError) => {
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
                                Connexion
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