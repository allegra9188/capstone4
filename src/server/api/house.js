const express = require("express");
const router = express.Router();

const s3Url =
  "https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json";

router.get("/s3", async (req, res, next) => {
  try {
    const response = await fetch(s3Url, {
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
