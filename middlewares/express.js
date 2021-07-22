const express = require('express');
const APP = express();
const consultModel = require('../models/consult');

APP.get('/', (req, res) => {
    res.status(200).send('Hello World!')
  });

APP.get('/newcode', (req, res) => {
    res.status(200).json({"status": "Application code found, copy and paste in the script console", "applicationCode": req.query.code})
  });

APP.get('/mails/:guestMail', (req, res) => {
  consultModel.findAll({
    where: {
      guestMail: req.params.guestMail,
    }
  }).then(result => {
    res.status(200).json(result);
  });
    
  });
  
module.exports = APP;
