import { Message } from "./Message/Message";
import { UsersRooms } from "./UsersRooms/UsersRooms";
import { Box, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedChannelState, sessionState } from "../Store/store";

export function ChatBoard() {
    const { type, channel } = useParams();
    const [, selectChannel] = useRecoilState(selectedChannelState);
    const session = useRecoilValue(sessionState);


    useEffect(() => {
        if (channel !== undefined && type !== undefined && parseInt(channel) >= 0 && type !== "") {
            selectChannel({ type: type, id: parseInt(channel) });
        }
    }, [type, channel, selectChannel]);

    return (
        <>
            <Box height='100vh' display='flex' flexDirection='column' bg='gray.100' p='20px'>
                {/* Scrollable Content Area with bottom padding/margin */}
                <Box flex='1' overflowY='auto' pb='100px'> 
                    <HStack spacing={4}>
                        <Box w="30%" bg="white" borderRadius="lg" p={4}>
                            <UsersRooms />
                        </Box>
                    </HStack>
                </Box>

                <Box w="48%" position="fixed" bottom="0" bg="white" borderRadius="lg" p={4} ml={370} >
                    <Message />
                </Box>
            </Box>
        </>
    );
}
