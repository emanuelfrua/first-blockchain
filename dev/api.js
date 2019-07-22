const express = require('express'); // Load the library
const app = express(); // Create an app to handle endpoints
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain'); // import blockchain data structure
const uuid = require('uuid/v1'); // Creates a unique String

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
    const amount = req.body.amount;
    const sender = req.body.sender;
    const recipient = req.body.recipient;
    const blockIndex = bitcoin.createNewTransaction(amount, sender, recipient);
    res.json({ note: `Transaction will be added in block ${blockIndex}.`})
});

app.get('/mine', function (req, res) { // It will mine a new block or create a new block for us
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transaction: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    bitcoin.createNewTransaction(12.5, '00', nodeAddress); // We put 00 in the sender to identify that it's a mined reward, and the recipient is the node that is gonna be rewarded

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
    res.json({
        note: "New Block mined successfully",
        block: newBlock
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000...')
}); // Listen to port...