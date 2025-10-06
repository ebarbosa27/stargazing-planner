import express from "express";
const router = express.Router();
export default router;

import {
  createEvent,
  getAllEventLocations,
  getAllEvents,
  getEventById,
  getNearbyEvents,
  patchEventImages,
} from "../db/queries/events.js";
import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";
import { createFavorite, deleteFavorite, getFavorite } from "../db/queries/favorites.js";
import {
  createRsvp,
  deleteRsvp,
  getAllRsvpUsers,
  getRsvp,
  patchRsvp,
} from "../db/queries/rsvps.js";

router
  .route("/")
  .get(async (req, res) => {
    try {
      const events = await getAllEvents();
      res.status(200).send({ events });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
  .post(requireUser, requireBody(["name", "date", "location", "description"]), async (req, res) => {
    try {
      const userId = req.user.id;
      const eventData = await createEvent({ ...req.body, userId });
      res.status(201).json(eventData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

router.route("/search").post(requireBody(["long1", "lat1", "long2", "lat2"]), async (req, res) => {
  try {
    const { long1, lat1, long2, lat2 } = req.body;
    const events = await getNearbyEvents({ long1, lat1, long2, lat2 });
    res.status(200).send({ events });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.route("/details/:eventId").get(async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await getEventById({ id: eventId });
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/rsvp/users/:eventId").get(async (req, res) => {
  try {
    const { eventId } = req.params;
    const rsvpEvent = await getAllRsvpUsers({ eventId });

    res.status(200).json(rsvpEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/location").get(async (req, res) => {
  try {
    const eventsLocation = await getAllEventLocations();
    res.status(200).json({ eventsLocation });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.use(requireUser);

router
  .route("/favorite")
  .post(requireBody(["eventId"]), async (req, res) => {
    try {
      const userId = req.user.id;
      const eventId = req.body.eventId;
      const favoriteEvent = await createFavorite({ userId, eventId });

      res.status(200).json(favoriteEvent);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(requireBody(["eventId"]), async (req, res) => {
    try {
      const userId = req.user.id;
      const eventId = req.body.eventId;
      const favoriteEvent = await deleteFavorite({ userId, eventId });
      if (!favoriteEvent) return res.status(404).json({ message: "Favorite not found" });

      res.status(200).json(favoriteEvent);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.route("/favorite/:eventId").get(async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;
    const favoriteEvent = await getFavorite({ userId, eventId });
    if (!favoriteEvent)
      return res.status(200).json({ message: "Favorite does not exists", exists: false });

    res.status(200).json({ message: "Favorite does not exists", exists: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router
  .route("/rsvp")
  .post(requireBody(["eventId", "status"]), async (req, res) => {
    try {
      const userId = req.user.id;
      const eventId = req.body.eventId;
      const rsvpStatus = req.body.status;
      const rsvpEvent = await createRsvp({ userId, eventId, rsvpStatus });

      res.status(200).json(rsvpEvent);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
  .delete(requireBody(["eventId"]), async (req, res) => {
    try {
      const userId = req.user.id;
      const eventId = req.body.eventId;
      const rsvpEvent = await deleteRsvp({ userId, eventId });
      if (!rsvpEvent) return res.status(404).json({ message: "RSVP not found" });

      res.status(200).json(rsvpEvent);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .patch(requireBody(["eventId", "status"]), async (req, res) => {
    try {
      const userId = req.user.id;
      const eventId = req.body.eventId;
      const rsvpStatus = req.body.status;
      const rsvpEvent = await patchRsvp({ userId, eventId, rsvpStatus });
      if (!rsvpEvent) return res.status(404).json({ message: "RSVP not found" });

      res.status(200).json(rsvpEvent);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.route("/rsvp/:eventId").get(async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;
    const rsvpEvent = await getRsvp({ userId, eventId });
    if (!rsvpEvent) return res.status(200).json({ message: "RSVP does not exists", exists: false });

    res.status(200).json({ message: "RSVP does exists", exists: true, status: rsvpEvent.status });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/images").patch(requireBody(["imageUrls", "eventId"]), async (req, res) => {
  try {
    const userId = req.user.id;
    const event = await patchEventImages({ ...req.body, userId });
    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
