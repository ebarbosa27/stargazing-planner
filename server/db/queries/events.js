import db from "../client.js";

export async function createEvent({ date, location, userId }) {
  const sql = `
INSERT INTO events 
  (date, user_id, location)
VALUES
  ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326))
RETURNING *
`;
  const {
    rows: [event],
  } = await db.query(sql, [date, userId, location.longitude, location.latitude]);
  return event;
}
