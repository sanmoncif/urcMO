import {Session, SessionCallback, ErrorCallback, User} from "../../Model/common";
import {CustomError} from "../../Model/CustomError";

export function signupUser(user: User, onResult: SessionCallback, onError: ErrorCallback) {
    fetch("/api/signup",
        {
            method: "POST", // ou 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then(async (response) => {
            if (response.ok) {
                const session = await response.json() as Session;
                sessionStorage.setItem('token', session.token);
                sessionStorage.setItem('externalId', session.externalId);
                sessionStorage.setItem('username', session.username || "");
                onResult(session)
            } else {
                const error = await response.json() as CustomError;
                onError(error);
            }
        }, onError);
}