import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../../db/pool';

export async function listTasks(ownerId: number) {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT t.id, t.title, t.description, t.status, t.priority, t.due_date AS dueDate,
            t.created_at AS createdAt, c.name AS clientName
     FROM tasks t
     LEFT JOIN clients c ON c.id = t.client_id
     WHERE t.owner_id = ?
     ORDER BY FIELD(t.priority, 'high', 'medium', 'low'), t.due_date ASC`,
    [ownerId]
  );
  return rows;
}

export async function createTask(ownerId: number, input: {
  clientId?: number | null;
  title: string;
  description?: string | null;
  status: string;
  priority: string;
  dueDate?: string | null;
}) {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO tasks (owner_id, client_id, title, description, status, priority, due_date)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [ownerId, input.clientId || null, input.title, input.description || null, input.status, input.priority, input.dueDate || null]
  );
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, title, description, status, priority, due_date AS dueDate, created_at AS createdAt
     FROM tasks WHERE id = ? AND owner_id = ?`,
    [result.insertId, ownerId]
  );
  return rows[0];
}

export async function updateTaskStatus(ownerId: number, taskId: number, status: string) {
  await pool.query('UPDATE tasks SET status = ? WHERE id = ? AND owner_id = ?', [status, taskId, ownerId]);
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, title, description, status, priority, due_date AS dueDate, created_at AS createdAt
     FROM tasks WHERE id = ? AND owner_id = ?`,
    [taskId, ownerId]
  );
  return rows[0];
}
