import express from "express";
const router = express.Router();
export default router;

import { getAllEvents, getEventById } from "../db/queries/events.js";

router.route("/").get(async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).send({ events });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const event = await getEventById({ id: eventId });
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});
