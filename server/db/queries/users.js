import db from "../client.js";
import bcrypt from "bcrypt";

export async function createUser({ username, password, email }) {
  const sql = `
  INSERT INTO users
    (username, password, email)
  VALUES 
    ($1, $2, $3)
  RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 8);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword, email]);
  return user;
}

export async function getUserByUsernamePassword({ username, password }) {
  const sql = `SELECT * FROM users WHERE username ILIKE $1`;
  const {
    rows: [user],
  } = await db.query(sql, [username]);

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return null;
  delete user.password;

  return user;
}

export async function getUserById({ id }) {
  const sql = `SELECT * FROM users WHERE id = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  delete user.password;
  return user;
}

export async function getUserEvents({ userId }) {
  const sql = `SELECT * FROM events WHERE user_id = $1`;
  const { rows: events } = await db.query(sql, [userId]);
  return events;
}

export async function getUserRSVPs({ userId }) {
  const sql = `SELECT * FROM rsvps WHERE user_id = $1`;
  const { rows: rsvps } = await db.query(sql, [userId]);
  return rsvps;
}

export async function getUserHotspots({ userId }) {
  const sql = `SELECT * FROM hotspots WHERE user_id = $1`;
  const { rows: hotspots } = await db.query(sql, [userId]);
  return hotspots;
}

export async function getUserFavorites({ userId }) {
  const sql = `SELECT * FROM favorites WHERE user_id = $1`;
  const { rows: favorites } = await db.query(sql, [userId]);
  return favorites;
}

export async function getAllUserData({ id }) {
  const sql = `
  SELECT
  u.id,
  u.username,
  u.email,
  
  (
    SELECT 
      json_agg(e)
    FROM (
      SELECT 
        e.*,
        concat(ST_X(location::geometry), ', ', ST_Y(location::geometry)) AS coordinates
      FROM 
        rsvps r
      JOIN 
        events e ON e.id = r.event_id
      WHERE 
        r.user_id = u.id
    ) e
  ) AS rsvp_events,

  (
    SELECT 
      json_agg(e)
    FROM (
      SELECT 
        e.*,
        concat(ST_X(location::geometry), ', ', ST_Y(location::geometry)) AS coordinates
      FROM 
        favorites f
      JOIN 
        events e ON e.id = f.event_id
      WHERE 
        f.user_id = u.id
    ) e
  ) AS favorite_events
  FROM 
    users u
  WHERE 
    u.id = $1;

  `;
  const {
    rows: [userData],
  } = await db.query(sql, [id]);
  return userData;
}
