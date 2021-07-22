# ML-Challenge - Lahitte Mauricio #

Data engineer challenge, using Google APIs and NodeJS

## Set-Up & Running 🔧 ##

Instructions to have everything you need to put this deployment into operation.

### Prerequisites 📋 ###

* NodeJS installed.
* A web browser (Mozilla, Chrome, Safari, etc).

### Install 🛠️ ###

Once you have cloned or downloaded a .zip of the project in a folder of your like run:
```
npm install
```
just to have all the dependence packages necessaries to run the server.

### Run 📦 ###

After the install process you have to configure the enviroment variable (below explained), and then just have to run:
```
npm start 
```
and the server will bound with the default configuration. You will see debugs on the console.

At this point, you will notice that the console ask you for a auth code, you will have to visit the URL placed in it and navigate trought following the instructions to get the code.

Once you have entered the code a json file _'token.json'_ will be created for store the oAuth2Client token.

This step is only for the first time you run the code.

### Script check ###
You'll notice that the console let you know if there are mails found with 'DevOps' in the body/subject, and if they're saved on the DB.

To check the server with the default configuration, acces to _'http://localhost:3000'_ in your browser, and you will see 'Hello World!' if everything OK.

### REST API Endpoint ###
To retrieve the data stored you have two options:
1_ In the browser, put the URL: _'http://localhost:3000/mails/YOURMAIL'_ .
2_ In Postman, make a new GET request to _'http://localhost:3000/mails/YOURMAIL'_ .


## Misc configuration ⚙️ ##

This project has a enviroment config file maded thanks to the [config library (npm) ](https://www.npmjs.com/package/config) that you can found in _'config/dev.json'_. 

You can modify the values in it, or just make your own configs in another file inside the _'config'_ folder.
Notice you have to change the enviroment before initializate it:

### Changin the enviroment  ⌨️ ###

* $env:NODE_ENV="development" (Windows)
* set NODE_ENV=development (Linux and Mac)

## Running tests 🔩 ##

NOTE: you have to run the server first.
To run the automated test you can just run:
```
npm test
```
and the results will be displayed at the console.

## Author ✒️

* [Lahite, Mauricio Eduardo](https://www.linkedin.com/in/mauricio-lahitte/)