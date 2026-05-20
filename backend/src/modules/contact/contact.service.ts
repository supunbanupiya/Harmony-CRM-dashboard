import { ResultSetHeader } from 'mysql2';
import { pool } from '../../db/pool';

export async function saveContactMessage(input: {
  name: string;
  email: string;
  company?: string | null;
  message: string;
}) {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO contact_messages (name, email, company, message)
     VALUES (?, ?, ?, ?)`,
    [input.name, input.email, input.company || null, input.message]
  );

  return { id: result.insertId, status: 'new' };
}
