import db from "../client.js";

export async function createRSVP({ userId, eventId, status }) {
  const sql = `
  INSERT INTO rsvps
    (user_id, event_id, status)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [rsvp],
  } = await db.query(sql, [userId, eventId, status]);
  return rsvp;
}

export async function deleteRSVP({ userId, eventId }) {
  const sql = `
  DELETE FROM rsvps
  WHERE 
    user_id = $1 AND event_id = $2
  RETURNING *
  `;
  const {
    rows: [rsvp],
  } = await db.query(sql, [userId, eventId]);
  return rsvp;
}
