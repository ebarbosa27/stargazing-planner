import db from "../client.js";

export async function createEvent({ date, location, userId }) {
  const sql = `
INSERT INTO events 
  (date, location, user_id)
VALUES
  ($1, $2, $3)
RETURNING *
`;
  const {
    rows: [event],
  } = await db.query(sql, [date, location, userId]);
  return event;
}
