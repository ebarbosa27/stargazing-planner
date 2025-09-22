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
