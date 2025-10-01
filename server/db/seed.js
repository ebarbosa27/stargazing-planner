import db from "./client.js";
import { faker } from "@faker-js/faker";
import { createUser } from "./queries/users.js";
import { createEvent } from "./queries/events.js";
import { createHotspot } from "./queries/hotspots.js";
import { createRsvp } from "./queries/rsvps.js";
import { createFavorite } from "./queries/favorites.js";

await db.connect();
await seed();
await db.end();
console.log("Database seeded.");

async function seed() {
  // create user

  for (let i = 0; i < 30; i++) {
    const userData = {
      username: faker.internet.username(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    };
    await createUser(userData);
  }

  // create event created by user
  for (let i = 1; i <= 30; i++) {
    const eventData = {
      name: faker.word.adjective() + " " + faker.word.noun(),
      date: faker.date.anytime(),
      location: {
        longitude: faker.location.longitude({ precision: 6 }),
        latitude: faker.location.latitude({ precision: 6 }),
      },
      description: faker.lorem.lines({ min: 5, max: 10 }),
      userId: i,
      imageUrls: Array.from({ length: 10 }, () =>
        faker.image.urlPicsumPhotos({ blur: 0, grayscale: false })
      ),
    };
    await createEvent(eventData);
  }

  // create hotspot created by user
  for (let i = 1; i <= 20; i++) {
    const hotspotData = {
      location: {
        longitude: faker.location.longitude({ precision: 6 }),
        latitude: faker.location.latitude({ precision: 6 }),
      },
      userId: i,
    };
    await createHotspot(hotspotData);
  }

  // create rsvp for event and is linked to user that is rsvp'ing
  for (let i = 6; i <= 20; i++) {
    const randomEventId = Math.ceil(Math.random() * 30);
    const randomStatus = Math.random() < 0.5 ? "attending" : "interested";

    const rsvpData = {
      userId: i,
      eventId: randomEventId,
      rsvpStatus: randomStatus,
    };
    try {
      await createRsvp(rsvpData);
    } catch (err) {
      if (err.code == "23505") {
        continue;
      }
      console.log(err);
    }

    if (Math.random() < 0.7) i--;
  }

  // create favorite for event created by user
  for (let i = 6; i <= 15; i++) {
    const randomEventId = Math.ceil(Math.random() * 30);

    const favoriteDate = {
      userId: i,
      eventId: randomEventId,
    };
    try {
      await createFavorite(favoriteDate);
    } catch (err) {
      if (err.code == "23505") {
        continue;
      }
      console.log(err);
    }

    if (Math.random() < 0.7) i--;
  }

  // create admin user
  const customUser = {
    username: "StarGazer1",
    password: "s!r!us225",
    email: "starlover1@fullstack.com",
  };
  const { id: customUserId } = await createUser(customUser);

  const customDate = new Date();
  customDate.setDate(customDate.getDate() + 5);
  const customEvent = {
    name: "View of Mars in Chicago",
    date: customDate,
    location: {
      longitude: -87.529988,
      latitude: 41.739648,
    },
    description: `
    A view from Chicago's lake side where you are far enough from the city lights that the light pollution is not bad, but still a nice view on the lakefront where you still feel the urban enviornment. It also is away from the tall building that get in the way and can be annoying to deal with. This date mars will pass by as one of the closest time to Earth where the surface is visible with the most lightest telescope. The event will hold multiple telescopes, from galileon telescopes to newtonian to automated dobsodian telescopes.  
    `,
    userId: customUserId,
    imageUrls: Array.from({ length: 10 }, () =>
      faker.image.urlPicsumPhotos({ blur: 0, grayscale: false })
    ),
  };
  await createEvent(customEvent);

  const customHotspot = {
    location: { longitude: faker.location.longitude(), latitude: faker.location.latitude() },
    userId: customUserId,
  };
  await createHotspot(customHotspot);

  const getRandomEventId = () => Math.ceil(Math.random() * 30);
  const getRandomStatus = () => (Math.random() < 0.5 ? "attending" : "interested");

  for (let i = 0; i < 10; i++) {
    try {
      await createFavorite({ userId: customUserId, eventId: getRandomEventId() });
    } catch (err) {
      if (err.code === "23505") {
        i--;
      } else {
        console.error(err);
      }
    }
  }

  for (let i = 0; i < 10; i++) {
    try {
      await createRsvp({
        userId: customUserId,
        eventId: getRandomEventId(),
        rsvpStatus: getRandomStatus(),
      });
    } catch (err) {
      if (err.code === "23505") {
        i--;
      } else {
        console.error(err);
      }
    }
  }
}
