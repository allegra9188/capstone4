const express = require("express");
const router = express.Router();

const url =
  "https://senate-stock-watcher-data.s3-us-west-2.amazonaws.com/aggregate/all_transactions.json";

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
