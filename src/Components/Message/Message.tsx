import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Divider, Text, Input, Flex } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { messagesState, messageUpdate, selectedChannelState, usersMapState, sessionState, roomsMapState } from '../../Store/store';
import { sendMessageApi } from './MessageApi';
import { CustomError } from '../../Model/CustomError';

export function Message() {

    const messages = useRecoilValue(messagesState);
    const channel = useRecoilValue(selectedChannelState);
    const session = useRecoilValue(sessionState);
    const users = useRecoilValue(usersMapState);
    const rooms = useRecoilValue(roomsMapState);
    const [messageUpdates, setMessageUpdates] = useRecoilState(messageUpdate);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef<HTMLInputElement>(null);
    const username  = session.username;

    const sendMessage = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        sendMessageApi(channel, newMessage, session.token, username!, () => {
            setNewMessage("");
            setMessageUpdates(messageUpdates + 1);
        }, (customError: CustomError) => {
            console.log(customError);
        });
    };


    useEffect(() => {
        const sw = navigator.serviceWorker;
        if (sw != null) {
            sw.onmessage = (event) => {
                setMessageUpdates(messageUpdates + 1);
            }
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" } as ScrollIntoViewOptions);
        }
    }, [messages]);


    return (
        <Box height='100%' p='25px' display='flex' flexDirection='column' bg='white'>
            <Flex direction="column" flex='1' overflowY='auto'>
                {messages.length > 0 &&
                    [...messages].reverse().filter((item) => users.get(channel.id)?.username == item.sender || item.sender == session.username || (rooms.get(channel.id)?.room_id == parseInt(item.channel_id) && item.type == "room")).map((message, index) => {
                        const isSender = message.sender === session.username;
                        return (
                            <Flex
                                key={index}
                                direction="column"
                                align={isSender ? 'flex-end' : 'flex-start'}
                                mb={4}
                            >
                                <Text
                                    fontSize='md'
                                    bg={isSender ? 'blue.100' : 'gray.200'}
                                    p={2}
                                    borderRadius='lg'
                                    maxWidth='70%'
                                >
                                    {message.content}
                                </Text>
                                <Text fontSize='sm' color='gray.500' mt={1}>
                                    {isSender ? session.username : message.sender}
                                </Text>
                            </Flex>
                        );
                    })}
                <div ref={scrollRef} />
            </Flex>
            <Divider my='10px' />
            <Flex as='footer' mt='auto'>
                <Input
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    placeholder='Type a message...'
                    flex={1}
                />
                <Button onClick={sendMessage} colorScheme='blue' ml={2}>
                    Send
                </Button>
            </Flex>
        </Box>


    );
    
}