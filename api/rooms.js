import { db } from '@vercel/postgres';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const rooms = await db.query('SELECT room_id, name, created_on, created_by FROM rooms');

    return new Response(JSON.stringify(rooms.rows), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ code: 'INTERNAL_SERVER_ERROR', message: 'Erreur interne du serveur' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
