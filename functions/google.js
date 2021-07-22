"use strict";
const {google} = require('googleapis');
const fs = require('fs');
const TOKEN_PATH = '../token.json';
const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
const readline = require('readline');
const Logger = require ('../middlewares/logger');
const consultModel = require('../models/consult');

module.exports = {
    authorize: function(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
      
        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) return getNewToken(oAuth2Client, callback);
          oAuth2Client.setCredentials(JSON.parse(token));
          callback(oAuth2Client);
        });

        function getNewToken(oAuth2Client, callback) {
          const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
          });
          console.log('Authorize this app by visiting this url:', authUrl);
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });
          rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
              if (err) return console.error('Error retrieving access token', err);
              oAuth2Client.setCredentials(token);
              // Store the token to disk for later program executions
              fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
              });
              callback(oAuth2Client);
            });
          });
        }
      },

    listMessages: function (auth, query){
        query = 'DevOps';
        return new Promise((resolve, reject) => {  
          const gmail = google.gmail({version: 'v1', auth});
          gmail.users.messages.list(      
            {        
              userId: 'me',  
              q:query,      
              // maxResults: 5
            }, (err, res) => {        
              if (err) {                    
                console.error();(err);          
                return;
              }         
              resolve(res.data);  
              
              Logger.debug(`${res.data.messages.length} mails found with '${query}' in body/subject`);
      
              if (res.data.messages.length === 1) {
                module.exports.getMail(res.data.messages[0].id, auth); 
              } else {
                res.data.messages.forEach(element => {
                  module.exports.getMail(element.id, auth)
                });
              }
            }    
          );  
        })
      },

    getMail: function (msgId, auth){      
        const gmail = google.gmail({version: 'v1', auth});
        
        gmail.users.getProfile({
          auth: auth,
          userId: 'me'
        }, function(err, res) {
          if (err) {
            console.log(err);
          } else {

            gmail.users.messages.get({
              userId:'me',
              id: msgId ,
          }, (err, res) => {
              if(!err){
  
                try {
                    consultModel.findOne({
                      where: {
                        idMail: msgId
                      }
                    }).then(result => {
  
                      if (result != []) {
                        consultModel.create({
                          idMail: msgId,
                          guestMail: res.data.emailAddress,
                          dateMail: res.data.payload.headers.filter((result) => result.name === 'Date')[0].value,
                          fromMail: res.data.payload.headers.filter((result) => result.name === 'From')[0].value,
                          subjectMail: res.data.payload.headers.filter((result) => result.name === 'Subject')[0].value
                        }).then(() => {
                          Logger.debug('Row inserted');
                        });
                      }else{
                        Logger.debug('Row already exists');
                      }
  
                    });
                  }catch (err) {
                    Logger.error(err)
                  }
        
              }else{
                console.error(err);
                return;
              }
          });
          
          }
        });
        
        
      }
      
}