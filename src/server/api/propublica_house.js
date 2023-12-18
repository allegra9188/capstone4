const express = require("express");
const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");
const csv = require("csv-parser");
const { type } = require("os");

const router = express.Router();

const baseURL = "https://api.propublica.org/congress/v1/";
const token = process.env.lobbyingToken;
const endpoint = "/117/house/members.json";
const url = baseURL + endpoint;

function saveDataToCsvFile(data) {
  const fileName = "./src/server/csv_files/house_members.csv";

  const flattenData = (data) => {
    return data.map((entry) => {
      const flatEntry = {};
      flattenObject(entry, flatEntry);
      return flatEntry;
    });
  };

  const flattenObject = (obj, result, parentKey = "") => {
    for (const key in obj) {
      const newKey = parentKey ? `${parentKey}_${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenObject(obj[key], result, newKey);
      } else {
        result[newKey] = obj[key];
      }
    }
  };

  const flatData = flattenData(data);
  const x = createObjectCsvWriter({
    path: fileName,
    header: Object.keys(flatData[0]).map((key) => ({ id: key, title: key })),
  });

  x.writeRecords(flatData)
    .then(() => console.log(`CSV file ${fileName} created successfully`))
    .catch((error) =>
      console.error(`Error writing CSV file: ${error.message}`)
    );
}

router.get("/propublica", async (req, res, next) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-Key": token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results;

    if (Array.isArray(results[0].members) && results[0].members.length > 0) {
      await saveDataToCsvFile(results[0].members);
      res.json("Data saved to CSV file");
    } else {
      res.json("Error, data not found");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/csv", async (req, res, next) => {
  try {
    const data = [];
    fs.createReadStream("./src/server/csv_files/house_members.csv")
      .pipe(csv())
      .on("data", (row) => {
        // Modify this part based on your CSV structure
        const {
          short_title,
          title,
          first_name,
          last_name,
          twitter_account,
          facebook_account,
          url,
          contact_form,
          next_election,
          total_votes,
          last_updated,
          office,
          phone,
          state,
          leadership_role,
        } = row;

        data.push({
          short_title,
          title,
          first_name,
          last_name,
          twitter_account,
          facebook_account,
          url,
          contact_form,
          next_election,
          total_votes,
          last_updated,
          office,
          phone,
          state,
          leadership_role,
        });
      })
      .on("end", () => {
        res.json(data);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// https://projects.propublica.org/api-docs/congress-api/members/
