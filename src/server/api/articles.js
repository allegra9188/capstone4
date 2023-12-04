const express = require("express");
const router = express.Router();

const url =
  "https://api.marketaux.com/v1/news/all?countries=us&filter_entities=true&limit=10&published_after=2023-11-27T17:04&api_token=lVsq6J81NrdSum7Ba0fdlihd1rxpFzA1lRk5YwLT";

router.get("/", async (req, res, next) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
