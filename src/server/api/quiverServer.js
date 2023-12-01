const express = require("express");

const router = express.Router();

const baseURL = "https://api.quiverquant.com";
const token = "1a553590ac3a1682d03bbf13426960c6772a371e";
const endpoint = "/beta/live/congresstrading";
const url = baseURL + endpoint;

router.get("/", async (req, res, next) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
    }
    const data = await response.json();

    console.log("QuiverQuant API response: ", data);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
