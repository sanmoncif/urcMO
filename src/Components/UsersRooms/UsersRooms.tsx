import { Box, Avatar, Text, Badge, List, ListItem, Divider, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { filteredUsersState, roomsState, selectedChannelState, sessionState } from '../../Store/store';
import { Link } from 'react-router-dom';
import { MdMessage } from 'react-icons/md';


export function UsersRooms() {
    const channel = useRecoilValue(selectedChannelState);
    const users = useRecoilValue(filteredUsersState);
    const rooms = useRecoilValue(roomsState);
    const session = useRecoilValue(sessionState);


    return (
        <Box width='100%' maxWidth='360px' bg='white.100' p={4} borderRadius="lg">
            <Avatar name={session.username} size="sm" />
            <Text fontWeight="bold">{session.username}</Text>
            <br/> <br/>


            <List spacing={3}>
                <ListItem fontSize='lg' fontWeight='bold'>
                    Utilisateurs
                </ListItem>
                {users.length > 0 && users.map(user => (
                    <LinkBox as='article' key={'user_' + user.user_id}>
                        <ListItem
                            bg={channel.id === user.user_id && channel.type === 'user' ? 'gray.100' : 'transparent'}
                            p={2}
                            rounded='md'
                            display="flex"
                            alignItems="center"
                        >
                            <Avatar name={user.username} size="sm" />
                            <LinkOverlay as={Link} to={'/messages/user/' + user.user_id} ml={2}>
                                <Text fontWeight="bold">{user.username}</Text>
                                <Text fontSize="sm" color='gray.500'>{user.last_login}</Text>
                            </LinkOverlay>
                            {channel.id === user.user_id && <Badge ml="auto" colorScheme="green">Online</Badge>}
                        </ListItem>
                    </LinkBox>
                ))}
                <Divider my={4} />
                <br/>
                <ListItem fontSize='lg' fontWeight='bold'>
                    Salons
                </ListItem>
                {rooms.length > 0 && rooms.map(room => (
                    <LinkBox as='article' key={'room_' + room.room_id}>
                        <ListItem
                            bg={channel.id === room.room_id && channel.type === 'room' ? 'gray.100' : 'transparent'}
                            p={2}
                            rounded='md'
                            display="flex"
                        >
                            <MdMessage size="1.5em" color='blue.500' />
                            <LinkOverlay as={Link} to={'/messages/room/' + room.room_id} ml={2}>
                                <Text fontWeight="bold">{room.name}</Text>
                                <Text fontSize="sm" color='gray.500'>{room.created_on}</Text>
                            </LinkOverlay>
                        </ListItem>
                    </LinkBox>
                ))}
            </List>
        </Box>
    );
}
