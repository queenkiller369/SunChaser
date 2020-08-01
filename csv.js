const csv = require('csv-parser')
const fs = require('fs')
const results = [];
 
fs.createReadStream('Sun_rise_set_2020.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // console.log(results);
    console.log(results[0]['﻿YYYY-MM-DD'])
  });
