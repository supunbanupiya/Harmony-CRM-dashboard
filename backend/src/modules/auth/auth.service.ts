import bcrypt from 'bcryptjs';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../../db/pool';
import { signToken } from '../../utils/jwt';

type UserRow = RowDataPacket & {
  id: number;
  name: string;
  company_name: string | null;
  email: string;
  password_hash: string;
  role: string;
  avatar_url: string | null;
};

function sanitizeUser(user: UserRow) {
  return {
    id: user.id,
    name: user.name,
    companyName: user.company_name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatar_url
  };
}

export async function signupUser(input: {
  name: string;
  companyName?: string | null;
  email: string;
  password: string;
}) {
  const [existing] = await pool.query<UserRow[]>('SELECT * FROM users WHERE email = ?', [input.email]);

  if (existing.length) {
    const error = new Error('Email is already registered.');
    (error as Error & { status?: number }).status = 409;
    throw error;
  }

  const hash = await bcrypt.hash(input.password, 10);

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO users (name, company_name, email, password_hash, role, avatar_url)
     VALUES (?, ?, ?, ?, 'admin', '/images/avatar-admin.svg')`,
    [input.name, input.companyName || null, input.email, hash]
  );

  const [rows] = await pool.query<UserRow[]>('SELECT * FROM users WHERE id = ?', [result.insertId]);
  const user = sanitizeUser(rows[0]);
  const token = signToken({ id: user.id, email: user.email, role: user.role });

  return { user, token };
}

export async function loginUser(input: { email: string; password: string }) {
  const [rows] = await pool.query<UserRow[]>('SELECT * FROM users WHERE email = ?', [input.email]);
  const userRow = rows[0];

  if (!userRow) {
    const error = new Error('Invalid email or password.');
    (error as Error & { status?: number }).status = 401;
    throw error;
  }

  const isValid = await bcrypt.compare(input.password, userRow.password_hash);
  if (!isValid) {
    const error = new Error('Invalid email or password.');
    (error as Error & { status?: number }).status = 401;
    throw error;
  }

  const user = sanitizeUser(userRow);
  const token = signToken({ id: user.id, email: user.email, role: user.role });

  return { user, token };
}

export async function getCurrentUser(userId: number) {
  const [rows] = await pool.query<UserRow[]>('SELECT * FROM users WHERE id = ?', [userId]);
  if (!rows[0]) return null;
  return sanitizeUser(rows[0]);
}
