import db from "../client.js";

export async function createEvent({ date, location, userId, description }) {
  const sql = `
  INSERT INTO events 
    (date, user_id, description, location)
  VALUES
    ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326))
  RETURNING *
`;
  const {
    rows: [event],
  } = await db.query(sql, [date, userId, description, location.longitude, location.latitude]);
  return event;
}
