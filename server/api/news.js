import express from "express";
const router = express.Router();
export default router;

const API_URL = "https://api.spaceflightnewsapi.net";

router.route("/").get(async (req, res) => {
  try {
    let fetchUrl = API_URL + "/v4/articles/?limit=10";
    const response = await fetch(fetchUrl);
    const responseJson = await response.json();

    res.status(200).json({ results: responseJson.results });
  } catch (err) {
    console.log("Error occurred");
    console.log(err);
    res.status(500).json(err);
  }
});
