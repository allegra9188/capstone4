const express = require("express");

const router = express.Router();
const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");
const csv = require("csv-parser");
const { type } = require("os");

// recent nominations by Category that are confirmed
const baseURL = "https://api.congress.gov/v3";
const token = process.env.summariesToken;
const endpoint = "/summaries";
const billsUrl = baseURL + endpoint;


// recent summaries https://gpo.congress.gov/#/summaries/bill_summaries_all

function saveSummariesDataToCsvFile(data) {
  const fileName = "./src/server/csv_files/summaries.csv";

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

router.get("/", async (req, res, next) => {
  try {
    const response = await fetch(baseURL + endpoint, {
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
    const summaries = data.summaries; // Assuming the summaries are in a 'summaries' property

    if (Array.isArray(summaries)) {
      await saveSummariesDataToCsvFile(summaries); // Fix the function name
      res.json("Summaries data saved to CSV file");
    } else {
      res.json("Error, summaries data not found");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/csv", async (req, res, next) => {
  try {
    const data = [];
    fs.createReadStream("./src/server/csv_files/summaries.csv")
      .pipe(csv())
      .on("data", (row) => {
        // Modify this part based on your CSV structure
        const {
          actionDate,
          actionDesc,
          bill_congress,
          bill_number,
          bill_title,
          bill_url,
          currentChamber,
          lastSummaryUpdateDate,
          text,
          updateDate,
        } = row;

        data.push({
          actionDate,
          actionDesc,
          bill: {
            congress: bill_congress,
            number: bill_number,
            title: bill_title,
            url: bill_url,
          },
          currentChamber,
          lastSummaryUpdateDate,
          text,
          updateDate,
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