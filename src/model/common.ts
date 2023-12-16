import {CustomError} from "./CustomError";

export const AUTHENT_HEADER = "Authentication";
export const BEARER = "Bearer ";

export interface User {
    user_id: number;
    username: string;
    email?: string;
    password: string;
    last_login?: string;
    external_id?: string;
}

export interface Room {
    room_id: number;
    name: string;
    created_on: string;
}

export interface Message {
    id: number;         
    content: string;
    channel_id: string; 
    type: string;       
    created_at: string;
    sender: string;
}


export interface Session {
    token: string;
    username?: string;
    id?: number;
    externalId: string;
}


export interface Channel {
    id: number;
    type: string;
}


export interface EmptyCallback {
    (): void;
}

export interface SessionCallback {
    (session: Session): void;
}


export interface ErrorCallback {
    (error: CustomError): void;
}

