import express from "express";
const router = express.Router();
export default router;

import requireBody from "../middleware/requireBody.js";
import { createUser, getUserByUsernamePassword } from "../db/queries/users.js";
import { createToken } from "../utils/jwt.js";

router.route("/register").post(requireBody(["username", "password"]), async (req, res) => {
  try {
    const user = await createUser(req.body);
    const token = createToken({ id: user.id });
    res.status(201).json({ token: token });
  } catch (err) {
    if (err.code === "23505") {
      res.status(409).json({
        message: `The username "${req.body.username}" is already taken.`,
      });
    } else {
      res.status(500).json(err);
    }
  }
});

router.route("/login").post(requireBody(["username", "password"]), async (req, res) => {
  try {
    const user = await getUserByUsernamePassword(req.body);
    if (!user) res.status(401).json({ message: "Invalid credentials" });

    const token = createToken({ id: user.id });
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json(err);
  }
});
