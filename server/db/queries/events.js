import db from "../client.js";

export async function createEvent({ name, date, location, userId, description, imageUrls }) {
  const sql = `
  INSERT INTO events 
    (name, date, user_id, description, location, image_urls)
  VALUES
    ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326), $7)
  RETURNING *
`;
  const {
    rows: [event],
  } = await db.query(sql, [
    name,
    date,
    userId,
    description,
    location.longitude,
    location.latitude,
    imageUrls,
  ]);
  return event;
}

export async function getAllEvents() {
  const sql = `
  SELECT 
    *, 
    ARRAY[ST_X(location::geometry), ST_Y(location::geometry)] AS coordinates 
  FROM 
    events
  ORDER BY  
    created_at DESC
  `;
  const { rows: events } = await db.query(sql);
  return events;
}

export async function getEventById({ id }) {
  const sql = `
  SELECT 
    *, 
    ARRAY[ST_X(location::geometry), ST_Y(location::geometry)] AS coordinates 
  FROM
    events
  WHERE 
    id = $1
  `;
  const {
    rows: [event],
  } = await db.query(sql, [id]);
  return event;
}

export async function getAllEventLocations() {
  const sql = `
  SELECT 
    ARRAY[ST_X(location::geometry), ST_Y(location::geometry)] AS coordinates 
  FROM 
    events
  `;
  const { rows: eventsLocation } = await db.query(sql);
  return eventsLocation;
}
