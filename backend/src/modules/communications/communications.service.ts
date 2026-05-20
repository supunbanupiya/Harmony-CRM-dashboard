import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../../db/pool';

export async function listCommunications(ownerId: number) {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT cm.id, cm.channel, cm.subject, cm.message, cm.direction, cm.created_at AS createdAt,
            c.name AS clientName, c.company AS clientCompany
     FROM communications cm
     INNER JOIN clients c ON c.id = cm.client_id
     WHERE cm.owner_id = ?
     ORDER BY cm.created_at DESC`,
    [ownerId]
  );
  return rows;
}

export async function createCommunication(ownerId: number, input: {
  clientId: number;
  channel: string;
  subject: string;
  message?: string | null;
  direction: string;
}) {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO communications (owner_id, client_id, channel, subject, message, direction)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [ownerId, input.clientId, input.channel, input.subject, input.message || null, input.direction]
  );

  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT cm.id, cm.channel, cm.subject, cm.message, cm.direction, cm.created_at AS createdAt,
            c.name AS clientName, c.company AS clientCompany
     FROM communications cm
     INNER JOIN clients c ON c.id = cm.client_id
     WHERE cm.id = ? AND cm.owner_id = ?`,
    [result.insertId, ownerId]
  );
  return rows[0];
}
