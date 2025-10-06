import express from "express";
const router = express.Router();
export default router;

import requireBody from "../middleware/requireBody.js";
import {
  createUser,
  getAllUserData,
  getUserByUsernamePassword,
  getUserEvents,
  getUserFavorites,
  getUserHotspots,
  getUserRsvps,
} from "../db/queries/users.js";
import { createToken } from "../utils/jwt.js";
import requireUser from "../middleware/requireUser.js";
import { createFavorite, deleteFavorite } from "../db/queries/favorites.js";
import { createRsvp, deleteRsvp } from "../db/queries/rsvps.js";

router.route("/").get(requireUser, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/register").post(requireBody(["username", "password", "email"]), async (req, res) => {
  try {
    const user = await createUser(req.body);
    const token = createToken({ id: user.id });
    res.status(201).json({ token: token });
  } catch (err) {
    if (err.code === "23505") {
      const constraint = err.constraint.split("_")[1];
      if (constraint === "email") {
        res.status(409).json({
          message: `The email "${req.body.email}" is already in use.`,
        });
      } else if (constraint === "username") {
        res.status(409).json({
          message: `The username "${req.body.username}" is already taken.`,
        });
      }
    } else {
      res.status(500).json(err);
    }
  }
});

router.route("/login").post(requireBody(["username", "password"]), async (req, res) => {
  try {
    const user = await getUserByUsernamePassword(req.body);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken({ id: user.id });
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.use(requireUser);

router.route("/accountPage").get(async (req, res) => {
  try {
    const user = req.user;
    const fullUserData = await getAllUserData({ id: user.id });
    res.status(200).json(fullUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/events").get(async (req, res) => {
  try {
    const events = await getUserEvents({ userId: req.user.id });
    if (!events) return res.status(404).json({ message: "No data found" });
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/hotspots").get(async (req, res) => {
  try {
    const hotspot = await getUserHotspots({ userId: req.user.id });
    if (!hotspot) return res.status(404).json({ message: "No data found" });
    res.status(200).json({ hotspot });
  } catch (err) {
    res.status(500).json(err);
  }
});

router
  .route("/rsvps")
  .get(async (req, res) => {
    try {
      const events = await getUserRsvps({ userId: req.user.id });
      if (!events) return res.status(404).json({ message: "No data found" });
      res.status(200).json({ events });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  })
  .post(requireBody(["eventId", "status"]), async (req, res) => {
    try {
      const user = req.user;
      const rsvpEvent = await createRsvp({ ...req.body, userId: user.id });
      if (!rsvpEvent) return res.status(404).json({ message: "event failed to favorite" });

      res.status(200).json({ message: "Event rsvp successfully" });
    } catch (err) {
      if (err.code === "23503") {
        return res.status(404).json({ message: `Event does not exists` });
      } else if (err.code === "23505") {
        return res.status(404).json({ message: `Event already rsvp` });
      }
      res.status(500).json(err);
    }
  })
  .delete(requireBody(["eventId"]), async (req, res) => {
    try {
      const user = req.user;
      const removedRsvp = await deleteRsvp({ userId: user.id, eventId: req.body.eventId });
      if (!removedRsvp) return res.status(404).json({ message: "Event is not Rsvp'd" });

      res.status(200).json({ message: "RSVP removed successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route("/favorites")
  .get(async (req, res) => {
    try {
      const favorites = await getUserFavorites({ userId: req.user.id });
      if (!favorites) return res.status(404).json({ message: "No data found" });
      res.status(200).json({ favorites });
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(requireBody(["eventId"]), async (req, res) => {
    try {
      const user = req.user;
      const favoriteEvent = await createFavorite({ userId: user.id, eventId: req.body.eventId });
      if (!favoriteEvent) return res.status(404).json({ message: "event failed to favorite" });

      res.status(200).json({ message: "Event favorited successfully" });
    } catch (err) {
      if (err.code === "23503") {
        return res.status(404).json({ message: `Event does not exists` });
      } else if (err.code === "23505") {
        return res.status(404).json({ message: `Event already favorited` });
      }
      res.status(500).json(err);
    }
  })
  .delete(requireBody(["eventId"]), async (req, res) => {
    try {
      const user = req.user;
      const removedFavorite = await deleteFavorite({ userId: user.id, eventId: req.body.eventId });
      if (!removedFavorite) return res.status(404).json({ message: "Event is not favorited" });

      res.status(200).json({ message: "Favorite removed successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  });
