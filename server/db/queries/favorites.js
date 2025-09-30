import db from "../client.js";

export async function createFavorite({ userId, eventId }) {
  const sql = `
  INSERT INTO favorites
    (user_id, event_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [favorite],
  } = await db.query(sql, [userId, eventId]);
  return favorite;
}

export async function getFavorite({ userId, eventId }) {
  const sql = `SELECT * FROM favorites WHERE user_id = $1 AND event_id = $2`;
  const {
    rows: [favorite],
  } = await db.query(sql, [userId, eventId]);
  return favorite;
}

export async function deleteFavorite({ userId, eventId }) {
  const sql = `
  DELETE FROM favorites
  WHERE 
    user_id = $1 AND event_id = $2
  RETURNING *
  `;
  const {
    rows: [favorite],
  } = await db.query(sql, [userId, eventId]);
  return favorite;
}
