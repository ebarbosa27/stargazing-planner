import express from "express";
const router = express.Router();
export default router;

import { createUser } from "../db/queries/users.js";
import { createToken } from "../utils/jwt.js";

router.route("/register").post(async (req, res) => {
  try {
    const user = await createUser(req.body);
    const token = createToken({ id: user.id });
    res.status(201).send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});
