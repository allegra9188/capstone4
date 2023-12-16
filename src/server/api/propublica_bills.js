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
const url = baseURL + endpoint;

// we need title, bill_uri, short_title, sponsor_name, sponsor_party
// sponsor_state, govtrack_url, introducted_date, committees, latest_major_action_date, latest_major_action

// recent bills https://projects.propublica.org/api-docs/congress-api/bills/