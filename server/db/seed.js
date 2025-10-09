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
        longitude: faker.location.longitude({ precision: 6, max: -66, min: -124 }),
        latitude: faker.location.latitude({ precision: 6, max: 49, min: 26 }),
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

  const otherUser = {
    username: "StarGazer20",
    password: "s!r!us225",
    email: "starlover20@fullstack.com",
  };
  const { id: otherUserId } = await createUser(otherUser);

  const randomDate = () => {
    const customDate = new Date();
    customDate.setDate(customDate.getDate() + Math.ceil(Math.random() * 30));
    return customDate;
  };

  const customEvent = {
    name: "View of Mars in Chicago",
    date: randomDate(),
    location: {
      longitude: -87.529988,
      latitude: 41.739648,
    },
    description: `
    A view from Chicago's lake side where you are far enough from the city lights that the light pollution is not bad, but still a nice view on the lakefront where you still feel the urban enviornment. It also is away from the tall building that get in the way and can be annoying to deal with. This date mars will pass by as one of the closest time to Earth where the surface is visible with the most lightest telescope. The event will hold multiple telescopes, from dobsonian to newtonian to automated tracker telescopes.  
    `,
    userId: customUserId,
    imageUrls: [
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759944610/nhwytdkl1im5i0okrrpv.jpg",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759962999/526122fc-39c3-48b3-926a-73a6c94cde86.png",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759962952/97083843-c1fe-49f6-8f61-d07300b13daa.png",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759963196/2ec1a41d-428d-4c77-b3cb-ca0d1cc62daa.png",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759963219/2fcdf42f-96cb-4022-a6c3-1774c9dcaa96.png",
    ],
  };
  await createEvent(customEvent);

  const customEvent2 = {
    name: "Oregon Meteo Viewing",
    date: randomDate(),
    location: {
      longitude: -118.729,
      latitude: 42.658,
    },
    description: `
    South Steens Campground is located in the heart of Steens Mountain. Visitors will find picnic tables and grills at 36 family campsites amid juniper and sage. The equestrian site, designed specifically for horse users, is directly adjacent to the family campground. Recreational stock (horses, mules, llamas, goats, etc.) are not allowed in the family portion of South Steens Campground, but are welcome and comfortable at 15 equestrian sites complete with tie posts and small corrals.  
    `,
    userId: otherUserId,
    imageUrls: [
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759963790/lbkkv2gdrbqlzv6lu4e3.jpg",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759963792/tryxfwhiiyoqrmteoumk.jpg",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759963794/lbnc3wcdsspg0hmirms0.jpg",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759963943/23cd67bb-c071-424d-a621-2306e4f950f2.png",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759963951/aeac8c25-a4a7-4ede-9f4c-1127decb0cbf.png",
    ],
  };
  await createEvent(customEvent2);

  const customEvent3 = {
    name: "Boston University Star Night",
    date: randomDate(),
    location: {
      longitude: -71.10553628776282,
      latitude: 42.35028140422247,
    },
    description: `
    Boston University is hosting another stargazing event opening up their telescope to the public to view and experience the stars like a real astronomer. With a reported clear sky and night time hour the skies should be clear to view the celestial bodies near our universe and hopefully even view Jupiter as it passes by our night sky barely noticeable unless you are ready for him. Seating will take place on top of CAS building and must rsvp before attending. 
    `,
    userId: otherUserId,
    imageUrls: [
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759964232/8a27c0b6-a33c-48e4-bb43-3f3dd4705d46.png",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759964243/9d03e106-0377-4a9c-936c-95ee8c502a34.png",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759964263/aa2c2ee8-074b-4484-976f-a027405f5a75.png",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759964238/6fd8da0b-dcc1-49fb-9fe0-1629500486ab.png",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759964268/d9e28c15-348e-46e6-9852-d51e5a9d2150.png",
      "https://res.cloudinary.com/dvetua8fh/image/upload/v1759964275/c9311012-9a29-435f-9cb6-ec09d552f389.png",
    ],
  };
  await createEvent(customEvent3);

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
