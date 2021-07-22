const fs = require('fs');

const config = require('config');
const Logger = require ('./middlewares/logger');
const PORT = config.get('EXPRESS.port') || 3000;
const APP = require('./middlewares/express');
const sequelize = require('./middlewares/sequelize');

const googleFunctions = require('./functions/google');

APP.listen(PORT, () => {
  Logger.debug(`MLChallenge APP listening at http://localhost:${PORT}`);
  sequelize.authenticate()
    .then(() => {
        Logger.debug('Connection with DB has been established successfully.');

        // Load client secrets from a local file.
        fs.readFile('credentials.json', (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Gmail API.
          googleFunctions.authorize(JSON.parse(content), googleFunctions.listMessages);
        });
    })
    .catch(err => {
      Logger.error(`Cannot establish connection with DB: err => ${err}`);
    });
});

