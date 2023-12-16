import {atom, selector} from "recoil";
import {BEARER, Message, Room, User, Session, Channel} from "../Model/common";
import {CustomError} from "../Model/CustomError";



export const sessionState = atom<Session>({
    key: 'session',
    default: {} as Session,
});

export const usersState = selector<User[]>({
    key: 'usersState',
    get: async ({get}) => {
        const token = get(sessionState).token;
        if (token === undefined) {
            return [];
        }
        const response = await fetch("/api/users", {headers : { "Authentication": BEARER + token}});
        await checkResponse(response);
        return await response.json() as User[];
    }
});

export const filteredUsersState = selector<User[]>({
    key: 'filteredUsersState',
    get: async ({get}) => {
        const users = get(usersState);
        const session = get(sessionState);
        if (!session.externalId) {
            return users;
        }
        return users.filter(user => user.username !== session.username);
    }
});


export const usersMapState = selector<Map<number,User>>({
    key: 'usersMapState',
    get: async ({get}) => {
        const users = get(usersState);
        const usersMap = new Map<number, User>();
        if (users !== undefined && users.length > 0) {
            users.forEach(user => usersMap.set(user.user_id, user));
        }
        return usersMap;
    }
});

export const roomsState = selector<Room[]>({
    key: 'roomsState',
    get: async ({get}) => {
        const token = get(sessionState).token;
        if (token === undefined) {
            return [];
        }
        const response = await fetch("/api/rooms", {headers : { "Authentication": BEARER + token}});
        await checkResponse(response);
        return await response.json() as Room[];
    }
});

export const roomsMapState = selector<Map<number,Room>>({
    key: 'roomsMapState',
    get: async ({get}) => {
        const rooms = get(roomsState);
        const roomsMap = new Map<number, Room>();
        if (rooms !== undefined && rooms.length > 0) {
            rooms.forEach(room => roomsMap.set(room.room_id, room));
        }
        return roomsMap;
    }
});

export const messagesState = selector<Message[]>({
    key: 'messagesState',
    get: async ({get}) => {
        const channel = get(selectedChannelState);
        get(messageUpdate); 
        if (channel.id < 0 || channel.type === "") {
            return [];
        }
        const sender = get(sessionState).username;
        const token = get(sessionState).token;
        if (token === undefined && sender === undefined) {
            return [];
        }

        const url = `/api/message?type=${encodeURIComponent(channel.type)}&channelId=${encodeURIComponent(channel.id)}&sender=${encodeURIComponent(sender!)}`;

        const response = await fetch(url, {
            headers : { "Authorization": `Bearer ${token}`}
        });
        await checkResponse(response);
        const messages = await response.json() as Message[];
        if (messages !== undefined && messages != null && messages.length > 0) {
            return messages.reverse();
        }
        return messages;
    }
});


export const messageUpdate = atom<number>({
    key: 'messageUpdate',
    default: 0,
});


export const selectedChannelState = atom<Channel>({
    key: 'selectedChannelState',
    default: {id: -1, type: ""},
});


async function checkResponse(response: Response) {
    if (!response.ok) {
        const body = await response.text();
        const error = new CustomError(body);
        error.httpStatus = response.status
        throw error;
    }
}