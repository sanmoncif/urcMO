import { db } from '@vercel/postgres';
import { arrayBufferToBase64, stringToArrayBuffer } from "../lib/base64";

export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    try {
        const { username, email, password } = await request.json();
        console.log("signup",request.json);

        const externalId = crypto.randomUUID().toString();

        // Vérifier si l'utilisateur existe déjà en fonction du nom d'utilisateur ou de l'e-mail
        const existingUserCheck = await db.query({
            text: 'SELECT * FROM users WHERE username = $1 OR email = $2',
            values: [username, email],
        });

        if (existingUserCheck.rowCount > 0) {
            const error = { code: "CONFLICT", message: "Le nom d'utilisateur ou l'e-mail existe déjà" };
            return new Response(JSON.stringify(error), {
                status: 409,
                headers: { 'content-type': 'application/json' },
            });
        }

        // Hacher le mot de passe
        const hash = await crypto.subtle.digest('SHA-256', stringToArrayBuffer(username + password));
        const hashedPassword = arrayBufferToBase64(hash);

        // Insérer le nouvel utilisateur dans la base de données
        await db.query({
            text: 'INSERT INTO users (username, email, password, created_on, external_id) VALUES ($1, $2, $3, NOW(), $4)',
            values: [username, email, hashedPassword,externalId],
        });

        // Retourner une réponse de succès
        return new Response(JSON.stringify({ message: "Utilisateur créé avec succès" }), {
            status: 201, // Créé
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", message: "Erreur interne du serveur" }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}
