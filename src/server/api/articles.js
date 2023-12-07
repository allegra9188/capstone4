const express = require("express");
const router = express.Router();
const {createObjectCsvWriter}= require('csv-writer')
const fs = require('fs');
const csv = require('csv-parser');

const url =
  "https://api.marketaux.com/v1/news/all?countries=us&filter_entities=true&limit=10&published_after=2023-11-27T17:04&api_token=lVsq6J81NrdSum7Ba0fdlihd1rxpFzA1lRk5YwLT";
// since ArticleList only need title, snipet and url, then we do not need to store everything
function saveDataToCsvFile(data){
  const fileName= './src/server/csv_files/article.csv'

  const newArray= data.map(({uuid,title,snippet,url})=>({uuid,title,snippet,url}))
  console.log(newArray)
  const x= createObjectCsvWriter({
    path: fileName,
    header: [
      {id:'uuid', title: 'uuid'},
      {id: 'title', title:'title'},
      {id: 'snippet', title:'snippet'},
      {id: 'url', title:'url'},
    ]
  });
  x.writeRecords(newArray)
    .then(() => console.log(`CSV file ${fileName} created successfully`))
    .catch(error => console.error(`Error writing CSV file: ${error.message}`));
}
// read data from api, save data to csv file to be read later, avoid duplicate api call
router.get("/", async (req, res, next) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTPS error! Status: ${response.status}`);
    }
     const data = await response.json();
     if(Array.isArray(data.data) && data.data.length>0){
       await saveDataToCsvFile(data.data)
       res.json('data saved to csv file');
     }
     
    res.json('error, data not done');
  } catch (error) {
    next(error);
  }
});
// read data from csv, and send back to front end
router.get("/csv", async (req, res, next) => {
  console.log('csv file read')
  try {
    // initialize an empty array
    const data =[]
      fs.createReadStream('./src/server/csv_files/article.csv')
      .pipe(csv())
      .on('data', (row) => {
        const { uuid, title, snippet, url} = row;
        console.log(row)
        data.push({ uuid, title, snippet, url });
      })
      .on('end', () => {
        res.json(data);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
