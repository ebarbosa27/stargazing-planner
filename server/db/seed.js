import db from "./client.js";
import { faker } from "@faker-js/faker";
import { createUser } from "./queries/users.js";
import { createEvent } from "./queries/events.js";
import { createHotspot } from "./queries/hotspots.js";
import { createRSVP } from "./queries/rsvps.js";

await db.connect();
await seed();
await db.end();
console.log("Database seeded.");

async function seed() {
  // create user

  for (let i = 0; i < 15; i++) {
    const userData = {
      username: faker.internet.username(),
      password: faker.internet.password(),
    };
    const result = await createUser(userData);
  }

  // create event created by user
  for (let i = 1; i <= 5; i++) {
    const eventData = {
      date: faker.date.anytime(),
      location: `${faker.location.latitude()}, ${faker.location.longitude()}`,
      userId: i,
    };
    const result = await createEvent(eventData);
  }

  // create hotspot created by user
  for (let i = 4; i <= 8; i++) {
    const hotspotData = {
      location: `${faker.location.latitude()}, ${faker.location.longitude()}`,
      userId: i,
    };
    const result = await createHotspot(hotspotData);
  }

  // create rsvp for event and is linked to user that is rsvp'ing
  for (let i = 6; i <= 15; i++) {
    const randomEventId = Math.ceil(Math.random() * 5);
    const randomStatus = Math.random() < 0.5 ? "attending" : "interested";

    const rsvpData = {
      userId: i,
      eventId: randomEventId,
      status: randomStatus,
    };
    try {
      const result = await createRSVP(rsvpData);
      console.log(result);
    } catch (err) {
      if (err.code == "23505") {
        continue;
      }
      console.log(err);
    }

    if (Math.random() < 0.7) i--;
  }

  // create favorite for event created by user
}
