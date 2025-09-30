import db from "../client.js";

export async function createRsvp({ userId, eventId, rsvpStatus }) {
  const sql = `
  INSERT INTO rsvps
    (user_id, event_id, status)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [rsvp],
  } = await db.query(sql, [userId, eventId, rsvpStatus]);
  return rsvp;
}

export async function patchRsvp({ userId, eventId, rsvpStatus }) {
  const sql = `
  UPDATE 
    rsvps
  SET
    status = $3
  WHERE
    user_id = $1 AND event_id = $2
  RETURNING *
  `;
  const {
    rows: [rsvp],
  } = await db.query(sql, [userId, eventId, rsvpStatus]);
  return rsvp;
}

export async function deleteRsvp({ userId, eventId }) {
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

export async function getRsvp({ userId, eventId }) {
  const sql = `SELECT * FROM rsvps WHERE user_id = $1 AND event_id = $2`;
  const {
    rows: [rsvp],
  } = await db.query(sql, [userId, eventId]);
  return rsvp;
}
