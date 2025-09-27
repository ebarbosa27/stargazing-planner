import db from "../client.js";

export async function createEvent({ name, date, location, userId, description }) {
  const sql = `
  INSERT INTO events 
    (name, date, user_id, description, location)
  VALUES
    ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326))
  RETURNING *
`;
  const {
    rows: [event],
  } = await db.query(sql, [name, date, userId, description, location.longitude, location.latitude]);
  return event;
}

export async function getAllEvents() {
  const sql = `
  SELECT 
    *, 
    concat(ST_X(location::geometry), ', ', ST_Y(location::geometry)) AS coordinates 
  FROM 
    events
  ORDER BY
    created_at DESC
  `;
  const { rows: events } = await db.query(sql);
  return events;
}
