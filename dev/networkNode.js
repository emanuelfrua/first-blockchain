/**
 * This file can be think as a node, and we need a decentralized node
 * Run this file multiple times to act as nodes, one for a different port
 * @type {*|createApplication}
 */

const express = require('express'); // Load the library
const app = express(); // Create an app to handle endpoints
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain'); // import blockchain data structure
const uuid = require('uuid/v1'); // Creates a unique String
const port = process.argv[2]; // Start commands element in package.json
const rp = require('request-promise');

const nodeAddress = uuid().split('-').join(''); // We generate a random String and unique, and removed the dashes

const bitcoin = new Blockchain();

// If the request comes in with JSON or FORM data we simply parse that DATA.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
///////////

app.get('/blockchain', function (req, res) { // To get the entire blockchain
    res.send(bitcoin);
});

app.post('/transaction', function (req, res) { // To create a new transaction in our blockchain
    const newTransaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction);
    res.json({note: `Transaction will be added in block ${blockIndex}.`});
});


// Create a new transaction and broadcast the new transaction to all the other nodes
app.post('/transaction/broadcast', function (req, res) {
    const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    bitcoin.addTransactionToPendingTransactions(newTransaction);

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        };

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises)
        .then(data => {
            res.json({note: 'Transaction created and broadcast successfully.'});
        })

});

app.get('/mine', function (req, res) { // It will mine a new block or create a new block for us
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/receive-new-block',
            method: 'POST',
            body: {newBlock: newBlock},
            json: true
        };

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises) // run all the requests
        .then(data => { // then when they have ended, do this calculation
            const requestOptions = {
                uri: bitcoin.currentNodeUrl + '/transaction/broadcast',
                method: 'POST',
                body: { // We put 00 in the sender to identify that it's a mined reward, and the recipient is the node that is gonna be rewarded

                    amount: 12.5,
                    sender: "00",
                    recipient: nodeAddress
                },
                json: true
            };

            return rp(requestOptions);
        })
        .then(data => { // and when the calculation has ended return the newblock response
            res.json({
                note: "New Block mined & broadcast successfully",
                block: newBlock
            });
        });
});

// Receive the new block from our broadcast
app.post('/receive-new-block', function (req, res) {
    const newBlock = req.body.newBlock;
    const lastBlock = bitcoin.getLastBlock();
    const correctHash = (lastBlock.hash === newBlock.previousBlockHash);
    const correctIndex = ((lastBlock['index'] + 1) === newBlock['index']);

    if (correctHash && correctIndex) {
        bitcoin.chain.push(newBlock);
        bitcoin.pendingTransactions = [];
        res.json({
            note: 'New Block received and accepted.',
            newBlock: newBlock
        });
    } else {
        res.json({
            note: 'New block rejected',
            newBlock: newBlock
        })
    }

});

// First Stage
// Register the new node with itself
// First stage, register the node in every node(the network), call register-node in every node
// register a node and broadcast it to the entire network
app.post('/register-and-broadcast-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) { // Register the new node in the blockchain if isn't already present there
        bitcoin.networkNodes.push(newNodeUrl);
    }

    const regNodesPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => { // Broadcast the new NODE
        // '/register-node'
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: {newNodeUrl: newNodeUrl},
            json: true
        };

        regNodesPromises.push(rp(requestOptions)); // save requests
    });

    Promise.all(regNodesPromises) // Run every single request HERE here async, and registered the nodes
        .then(data => { // When the requests are successfully, registered all the nodes already present in our network to the new node
            const bulkRegisterOptions = {
                uri: newNodeUrl + '/register-nodes-bulk', // a single request
                method: 'POST',
                body: {allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]}, // All the nodes already present in our network
                json: true
            };

            return rp(bulkRegisterOptions); // run the request

        })
        .then(data => {
            res.json({note: 'New Node registered with network successfully'});
        });
});

// register a node WITH the NETWORK
app.post('/register-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAllreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAllreadyPresent && notCurrentNode) {
        bitcoin.networkNodes.push(newNodeUrl);
    }
    res.json({note: 'New node registered successfully.'});
});

// register all the other nodes registered to the new node
// register multiple nodes as one
app.post('/register-nodes-bulk', function (req, res) {
    const allNetWorkNodes = req.body.allNetworkNodes; // 'register-and-broadcast-node' body, array with all the nodes
    allNetWorkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode) {
            bitcoin.networkNodes.push(networkNodeUrl);
        }
    });

    res.json({note: 'Bulk registration successful.'});
});

app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
}); // Listen to port...