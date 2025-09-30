import express from "express";
const router = express.Router();
export default router;

import { getAllEvents, getEventById } from "../db/queries/events.js";
import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";
import { createFavorite, deleteFavorite, getFavorite } from "../db/queries/favorites.js";

router.route("/").get(async (req, res) => {
  try {
    const events = await getAllEvents();
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
  .post(requireBody(["eventId"]), async (req, res) => {
    try {
      const userId = req.user.id;
      const eventId = req.body.eventId;

      res.status(200).json({});
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(requireBody(["eventId"]), async (req, res) => {
    try {
      const userId = req.user.id;
      const eventId = req.body.eventId;

      res.status(200).json({});
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.route("/rsvp/:eventId").get(async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;
    const favoriteEvent = await getRsvp({ userId, eventId });
    if (!favoriteEvent)
      return res.status(200).json({ message: "Favorite does not exists", exists: false });

    res.status(200).json({ message: "Favorite does not exists", exists: true });
  } catch (err) {
    res.status(500).json(err);
  }
});
