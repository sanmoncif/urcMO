import {ErrorCallback, EmptyCallback, Channel} from "../../Model/common";
import {CustomError} from "../../Model/CustomError";

export function sendMessageApi(channel: Channel, message: string, token: string, sender: string, onResult: EmptyCallback, onError: ErrorCallback) {
    fetch("/api/message",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authentication": token
            },
            body: JSON.stringify({type: channel.type, channel_id: channel.id, content: message, sender: sender}),
        })
        .then(async (response) => {
            if (response.ok) {
                onResult();
            } else {
                const error = await response.json() as CustomError;
                onError(error);
            }
        }, onError);
}