import db from "./client.js";

await db.connect();
await seed();
await db.end();
console.log("Database seeded.");

async function seed() {}
