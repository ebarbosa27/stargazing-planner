import db from "../client.js";

export async function createHotspot({ location, userId }) {
  const sql = `
  INSERT INTO hotspots
    (location, user_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [hotspot],
  } = await db.query(sql, [location, userId]);
  return hotspot;
}
