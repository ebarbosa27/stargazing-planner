import db from "../client.js";
import bcrypt from "bcrypt";

export async function createUser({ username, password }) {
  const sql = `
  INSERT INTO users
    (username, password)
  VALUES 
    ($1, $2)
  RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 8);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

export async function getUserByUsernamePassword({ username, password }) {
  const sql = `SELECT * FROM users WHERE username ILIKE $1`;
  const {
    rows: [user],
  } = await db.query(sql, [username]);

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return null;

  return user;
}

export async function getUserById({ id }) {
  const sql = `SELECT * FROM users WHERE id = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
