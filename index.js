const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listMessages);
});

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

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

function listMessages(auth, query){
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
        //resolve(res.data);  
        
        if (res.data.messages.length === 0) {
          console.log('No hay mensajes');
        }
        if (res.data.messages.length === 1) {
          getMail(res.data.messages[0].id, auth); 
        } else {
          res.data.messages.forEach(element => {
            getMail(element.id, auth)
          });
        }
      }    
    );  
  })
}


function getMail(msgId, auth){
  console.log(msgId)
  const gmail = google.gmail({version: 'v1', auth});
  
  gmail.users.messages.get({
      userId:'me',
      id: msgId ,
  }, (err, res) => {
      if(!err){
        console.log(res.data.payload.headers.filter((result) => result.name === 'Subject')[0].value);
        console.log(res.data.payload.headers.filter((result) => result.name === 'Date')[0].value);
        console.log(res.data.payload.headers.filter((result) => result.name === 'From')[0].value);

      }else{
        console.error(err);
        return;
      }
  });
}
