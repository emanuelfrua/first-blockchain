# My First Blockchain

Dependencies:

NODEJS

SHA256
https://www.npmjs.com/package/sha256
(--save) it's used to save it as a dependency

EXPRESSJS
https://www.npmjs.com/package/express
npm i express --save

npm i nodemon --save // Whenever we make a change in our files, we restart the server for us
Put inside package.json scripts:
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon --watch dev -e js dev/api.js" // It says that when the start command is loaded watch for all the js files inside dev folder
  },

  start is a command e.g. npm start

npm i body-parser --save


Always npm start, to start the server.

To import node:
npm i uuid --save