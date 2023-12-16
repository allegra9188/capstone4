const express = require("express");

const router = express.Router();
const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");
const csv = require("csv-parser");
const { type } = require("os");

// recent SENATE members data
const baseURL = "https://api.propublica.org/congress/v1/";
const token = process.env.lobbyingToken;
const endpoint = "/117/senate/members.json";
const url = baseURL + endpoint;

// we need short_title, title, first_name, last_name, twitter_account
// facebook_account, url, contact_form, next_election, total_votes
// last_updated, office, phone, state, 

// https://projects.propublica.org/api-docs/congress-api/members/