import { getConnecterUser, triggerNotConnected } from "../lib/session.js";
import { db } from '@vercel/postgres';

export default async (request, response) => {
    try {
        const user = await getConnecterUser(request);

        if (user === undefined || user === null) {
            console.log("Not connected");
            triggerNotConnected(response);
            return;
        }

        if (request.method === 'GET') {
            // Extraction des paramètres de l'URL
            const { type, channelId, sender } = request.query;
            const messages = await getMessageByTypeAndChannel(type, channelId, sender);
            console.log("messages :", messages);

            response.status(200).json(messages);


        } else if (request.method === 'POST') {
            const { type, channel_id, content, sender } = request.body;
            console.log(type, "---", channel_id, '-----', content, '-----', sender);

            await saveMessageToDB(type, channel_id, content, sender);

            response.send("OK");
        } else {
            response.status(405).send("Method Not Allowed");
        }
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
};

const getMessageByTypeAndChannel = async (type, channelId, sender) => {
    try {
        let query = '';
        if (type === 'user') {

            const receiverQuery = 'SELECT user_id FROM users WHERE username = $1';
            const receiverResult = await db.query(receiverQuery, [sender]);

            if (receiverResult.rows.length > 0) {
                // Receiver found, use the id in the main query
                const receiverId = receiverResult.rows[0].user_id;

                query = `
                    SELECT messages.*, users.username 
                    FROM messages 
                    JOIN users ON messages.channel_id = users.user_id 
                    WHERE type = $1 AND (channel_id = $2 OR channel_id = $3)`;
                // Use parameterized placeholders for type, channelId, and receiverId
                const values = [type, channelId, receiverId];
                
                const messages = await db.query(query, values);
                return messages.rows;
            } else {
                // Receiver not found, handle accordingly (e.g., return an empty array)
                return [];
            }

        } else if (type === 'room') {
            // Handle room messages differently if needed
            query = 'SELECT * FROM messages WHERE type = $1 AND channel_id = $2';
            const values = [type, channelId];
            
            const messages = await db.query(query, values);
            return messages.rows;
        }
    } catch (error) {
        console.error('Error retrieving messages:', error);
        throw error;
    }
};


const saveMessageToDB = async (type, channel_id, content, sender) => {
    try {
        console.log("type:", type, "id:", channel_id, "content:", content);
        await db.query('INSERT INTO messages (type, channel_id, content, sender) VALUES ($1, $2, $3, $4)', [type, channel_id, content, sender]);
        console.log('Message saved successfully');
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
};

