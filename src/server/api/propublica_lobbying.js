const express = require("express");

const router = express.Router();
const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");
const csv = require("csv-parser");


// recent nominations by Category that are confirmed
const baseURL = "https://api.propublica.org/congress/v1/";
const token = "EelGWX11q8JX99U9wQ7mapcVt4842HgeFBoGnMAp";
const endpoint = "/lobbying/latest.json";
const url = baseURL + endpoint;

// we need lobbying_representations: lobbying_client: name, general_description
// we need lobbying_registrant: FWH and Associates LLC, general_description
// we need inhouse, specific_issues, latest_filing: filing_date, pdf_url
// we need lobbyists: name, covered_position

function saveDataToCsvFile(data) {
   const fileName = "./src/server/csv_files/quiver.csv";

  const newArray = data.map(({ Representative, ReportDate, 
    House,Party, TransactionDate, Ticker, Transaction, Range,District }) => ({
    
    Representative,
    ReportDate,
    House,
    Party,
    TransactionDate,
    Ticker,
    Transaction,
    Range,
    District
  }));
  console.log(newArray);
  const x = createObjectCsvWriter({
    path: fileName,
    header: [
      { id: "Representative", title: "Representative" },
      { id: "ReportDate", title: "ReportDate" },
      { id: "House", title: "House" },
      { id: "Party", title: "Party" },
      { id: "TransactionDate", title: "TransactionDate" },
      { id: "Ticker", title: "Ticker" },
      { id: "Transaction", title: "Transaction" },
      { id: "Range", title: "Range" },
      { id: "District", title: "District" },
    ],
  });
  x.writeRecords(newArray)
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
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
    }
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      await saveDataToCsvFile(data);
      res.json("data saved to csv file");
    }

    res.json("error, data not saved to csv");
  } catch (error) {
    next(error);
  }
});

// read data from csv, and send back to front end
router.get("/csv", async (req, res, next) => {
  console.log("csv file read");
  try {
    // initialize an empty array
    const data = [];
    fs.createReadStream("./src/server/csv_files/quiver.csv")
      .pipe(csv())
      .on("data", (row) => {
        const { Representative, ReportDate, 
          House,Party, TransactionDate, Ticker, Transaction, Range,District } = row;
        console.log(row);
        data.push({ Representative, ReportDate, 
          House,Party, TransactionDate, Ticker, Transaction, Range,District });
      })
      .on("end", () => {
        res.json(data);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
