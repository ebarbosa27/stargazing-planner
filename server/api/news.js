import express from "express";
const router = express.Router();
export default router;

const API_URL = "https://api.astronomyapi.com";

router.route("/").get(async (req, res) => {
  try {
    res.status(200).json({ messege: "complete" });
  } catch (err) {
    console.log("Error occurred");
    console.log(err);
    res.status(500).json(err);
  }
});
