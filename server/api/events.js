import express from "express";
const router = express.Router();
export default router;

import { getAllEvents } from "../db/queries/events.js";

router.route("/").get(async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).send({ events });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
