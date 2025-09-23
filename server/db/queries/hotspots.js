import db from "../client.js";

export async function createHotspot({ location, userId }) {
  const sql = `
  INSERT INTO hotspots
    (user_id, location)
  VALUES
    ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326))
  RETURNING *
  `;
  const {
    rows: [hotspot],
  } = await db.query(sql, [userId, location.longitude, location.latitude]);
  return hotspot;
}
