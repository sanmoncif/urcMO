import { Message } from "./message/Message";
import { UsersRooms } from "./UsersRooms/UsersRooms";
import { Box, HStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedChannelState, sessionState } from "../Store/store";
import { Client as PusherClient, TokenProvider } from "@pusher/push-notifications-web";

export function ChatBoard() {
    const { type, channel } = useParams();
    const [, selectChannel] = useRecoilState(selectedChannelState);
    const session = useRecoilValue(sessionState);

    const beamsClient = new PusherClient({
        instanceId: '2942fdbc-79ef-4d98-9236-0ab6a1660e21',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!session.token) {
            navigate("/login");
            return;
        }

        window.Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                const beamsTokenProvider = new TokenProvider({
                    url: "/api/beams",
                    headers: {
                        Authentication: "Bearer " + session.token, 
                    },
                });

                beamsClient
                    .getUserId()
                    .then((userId) => {
                        if (userId !== session.externalId) {
                            return beamsClient.stop();
                        }
                    })
                    .catch(console.error);

                beamsClient.start()
                    .then(() => beamsClient.addDeviceInterest('global'))
                    .then(() => beamsClient.setUserId(session.externalId, beamsTokenProvider))
                    .then(() => {
                        beamsClient.getDeviceId().then(deviceId => console.log("Push id : " + deviceId));
                    })
                    .catch(console.error);
            } else {
                alert("Activez les notifications pour la démo");
            }
        });
    }, [session, navigate]);

    useEffect(() => {
        if (channel !== undefined && type !== undefined && parseInt(channel) >= 0 && type !== "") {
            selectChannel({ type: type, id: parseInt(channel) });
        }
    }, [type, channel, selectChannel]);

    return (
        <>
            <Box bg="gray.100" w="100%" p={4}>
                <HStack spacing={4}>
                    <Box w="30%" bg="white" borderRadius="lg" p={4}>
                        <UsersRooms />
                    </Box>
                    <Box w="70%" bg="white" borderRadius="lg" p={4}>
                        <Message />
                    </Box>
                </HStack>
            </Box>
        </>
    );
}
