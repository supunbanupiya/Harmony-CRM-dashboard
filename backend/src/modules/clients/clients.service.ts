import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../../db/pool';

export async function listClients(ownerId: number) {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, name, company, email, phone, status, value, source, notes,
            created_at AS createdAt, updated_at AS updatedAt
     FROM clients WHERE owner_id = ? ORDER BY created_at DESC`,
    [ownerId]
  );
  return rows;
}

export async function createClient(ownerId: number, input: {
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  status: string;
  value: number;
  source?: string | null;
  notes?: string | null;
}) {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO clients (owner_id, name, company, email, phone, status, value, source, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [ownerId, input.name, input.company || null, input.email || null, input.phone || null, input.status, input.value, input.source || 'Manual', input.notes || null]
  );

  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, name, company, email, phone, status, value, source, notes,
            created_at AS createdAt, updated_at AS updatedAt
     FROM clients WHERE id = ? AND owner_id = ?`,
    [result.insertId, ownerId]
  );
  return rows[0];
}
