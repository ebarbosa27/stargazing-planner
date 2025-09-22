import db from "./client.js";
import { faker } from "@faker-js/faker";
import { createUser } from "./queries/users.js";

await db.connect();
await seed();
await db.end();
console.log("Database seeded.");

async function seed() {
  // create user
  // create event created by user
  // create hotspot created by user
  // create rsvp for event and is linked to user that is rsvp'ing
  // create favorite for event created by user

  for (let i = 0; i < 5; i++) {
    const userData = {
      username: faker.internet.username(),
      password: faker.internet.password(),
    };
    const result = await createUser(userData);
  }
}
