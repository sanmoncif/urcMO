import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Container } from '@chakra-ui/react';
import NavBar from "../Components/NavBar/NavBar";
import { SignUp } from "../Components/User/Signup";
import { Login } from "../Components/User/Login";
import { ChatBoard } from "../Components/ChatBoard";
import { useRecoilState } from "recoil";
import { sessionState } from "../Store/store";
import ErrorBoundary from "../Components/ErrorBoundary";
import Test from '../Components/User/test';
import Loading from '../Components/Loading';
import NotFound from '../Components/NotFound';

export default () => {

    const [_, setSession] = useRecoilState(sessionState);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const externalId = sessionStorage.getItem("externalId");
        const username = sessionStorage.getItem("username");
        if (token !== undefined && token !== null && token !== "") {
            setSession({ token: token, externalId: externalId !== null ? externalId : '', username: username !== null ? username : '', });
        }
    }, []);

    return (
        <Router>
            <ErrorBoundary>
                <>
                    <NavBar />
                    <Suspense fallback={<Loading />}>
                        <Container maxWidth="container.xl" mt={20}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/login" replace={true} />} />
                                <Route path="/register" element={<SignUp />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/messages" element={<ChatBoard />} />
                                <Route path="/messages/:type/:channel" element={<ChatBoard />} />
                                <Route path="*" element={<NotFound />} />
                                <Route path="/test" element={<Test />} />
                            </Routes>
                        </Container>
                    </Suspense>
                </>
            </ErrorBoundary>
        </Router>
    );


}

