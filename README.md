# My First Blockchain

Hi, this is a basic blockchain in Javascrip that I did to learn how it works a blockchain. I added comments in every line to explain all the processes.
It uses the Work of Proof method.

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

To register a new Node:
new node call -> '/register-and-broadcast-node' -> call -> '/register-node' in every node already registered and register the new node
new node call -> '/register-nodes-bulk' to register all the nodes already registered in the NEW NODE

npm install request-promise --save // Allow to make request to another nodes

I have to sinchronize nodes, transactions, blocks that are mined.

ENDPOINTS:
/blockchain
/transaction
/mine
/transaction/broadcast // Create a new transaction and then broadcast the new transaction
to the network via /transaction

/mine // create a new block and then broadcast the new block to our network via /receive-new-block //
