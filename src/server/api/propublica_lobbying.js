const express = require("express");

const router = express.Router();
const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");
const csv = require("csv-parser");
const { type } = require("os");

// recent nominations by Category that are confirmed
const baseURL = "https://api.propublica.org/congress/v1/";
const token = process.env.lobbyingToken;
const endpoint = "/lobbying/latest.json";
const url = baseURL + endpoint;

// we need lobbying_representations: lobbying_client: name, general_description
// we need lobbying_registrant: name, general_description
// we need inhouse, specific_issues, latest_filing: filing_date, pdf_url
// we need lobbyists: name, covered_position

function saveDataToCsvFile(data) {
  const fileName = "./src/server/csv_files/lobbying.csv";

  const createCsvWriter = require("csv-writer").createObjectCsvWriter;

  const flattenData = (data) => {
    return data.map((entry) => {
      const flatEntry = {};
      flattenObject(entry, flatEntry);
      return flatEntry;
    });
  };
  //because there is obj inside array, we need to make the data flat
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
  const x = createCsvWriter({
    path: fileName,
    header: Object.keys(flatData[0]).map((key) => ({ id: key, title: key })),
  });
  x.writeRecords(flatData)
    .then(() => console.log(`CSV file ${fileName} created successfully`))
    .catch((error) =>
      console.error(`Error writing CSV file: ${error.message}`)
    );
}

//read data from api, save data to csv file to be read later
router.get("/", async (req, res, next) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        // we do not use Authorization here,
        // instead, we use X-API-KEY accordingly
        "X-API-Key": token,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
    }
    const data = await response.json();
    const results = data.results;

    if (
      Array.isArray(results[0].lobbying_representations) &&
      results[0].lobbying_representations.length > 0
    ) {
      await saveDataToCsvFile(results[0].lobbying_representations);
      res.json("data saved to csv file");
    }

    res.json("error, data not done");
  } catch (error) {
    next(error);
  }
});

// we need lobbying_representations: lobbying_client: name, general_description
// we need lobbying_registrant: name, general_description
// we need inhouse, specific_issues, latest_filing: filing_date, pdf_url
// we need lobbyists: name, covered_position

// read data from csv, and send back to front end
router.get("/csv", async (req, res, next) => {
  console.log("csv file read");
  try {
    // initialize an empty array
    const data = [];
    fs.createReadStream("./src/server/csv_files/lobbying.csv")
      .pipe(csv())
      .on("data", (row) => {
        const {
          lobbying_client_name,
          lobbying_client_general_description,
          lobbying_registrant_name,
          lobbying_registrant_general_description,
          inhouse,
          specific_issues_0,
          latest_filing_filing_date,
          latest_filing_pdf_url,
          lobbyists_0_name,
          lobbyists_0_covered_position,
        } = row;

        data.push({
          lobbying_client_name,
          lobbying_client_general_description,
          lobbying_registrant_name,
          lobbying_registrant_general_description,
          inhouse,
          specific_issues_0,
          latest_filing_filing_date,
          latest_filing_pdf_url,
          lobbyists_0_name,
          lobbyists_0_covered_position,
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
