const express = require('express');
const APP = express();

APP.get('/', (req, res) => {
    res.send('Hello World!')
  });

APP.get('/newcode', (req, res) => {
    res.status(200).json({"status": "Application code found, copy and paste in the script console", "applicationCode": req.query.code})
  });
  
module.exports = APP;
