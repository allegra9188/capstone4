const express = require("express");

const router = express.Router();
const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");
const csv = require("csv-parser");
const { type } = require("os");


// recent nominations by Category that are confirmed
const baseURL = "https://api.propublica.org/congress/v1/";
const token = process.env.lobbyingToken;
const endpoint = "/117/both/bills/passed.json";
const billsUrl = baseURL + endpoint;

// we need title, bill_uri, short_title, sponsor_name, sponsor_party
// sponsor_state, govtrack_url, introducted_date, committees, latest_major_action_date, latest_major_action

// recent bills https://projects.propublica.org/api-docs/congress-api/bills/

function saveBillsDataToCsvFile(data) {
    const fileName = "./src/server/csv_files/passed_bills.csv";
  
    const flattenData = (data) => {
      return data.map(entry => {
        const flatEntry = {};
        flattenObject(entry, flatEntry);
        return flatEntry;
      });
    };
  
    const flattenObject = (obj, result, parentKey = '') => {
      for (const key in obj) {
        const newKey = parentKey ? `${parentKey}_${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          flattenObject(obj[key], result, newKey);
        } else {
          result[newKey] = obj[key];
        }
      }
    };
  
    const flatData = flattenData(data);
    const x = createObjectCsvWriter({
      path: fileName,
      header: Object.keys(flatData[0]).map(key => ({ id: key, title: key }))
    });
  
    x.writeRecords(flatData)
      .then(() => console.log(`CSV file ${fileName} created successfully`))
      .catch((error) =>
        console.error(`Error writing CSV file: ${error.message}`)
      );
  }
  
  router.get("/", async (req, res, next) => {
    try {
      const response = await fetch(billsUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          'X-API-Key': token,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTPS error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const results = data.results;

      if (Array.isArray(results)) {
        await saveBillsDataToCsvFile(results);
        res.json("Bills data saved to CSV file");
      } else {
        res.json("Error, bills data not found");
      }
    } catch (error) {
      next(error);
    }
  }
);
  
  router.get("/csv", async (req, res, next) => {
    try {
      const data = [];
      fs.createReadStream("./src/server/csv_files/passed_bills.csv")
        .pipe(csv())
        .on("data", (row) => {
          // Modify this part based on your CSV structure
          const { title, bill_uri, short_title, sponsor_name, sponsor_party, sponsor_state, govtrack_url, introduced_date, committees, latest_major_action_date, latest_major_action } = row;
  
          data.push({
            title,
            bill_uri,
            short_title,
            sponsor_name,
            sponsor_party,
            sponsor_state,
            govtrack_url,
            introduced_date,
            committees,
            latest_major_action_date,
            latest_major_action,
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