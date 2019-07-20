const sha256 = require('sha256')

class Blockchain {

    constructor() {
        this.chain = []; // All the blocks created of mined will stay here.
        this.pendingTransactions = []; // Hold all the new transactions before placed in a block. This transactions are not write in stone yet, they're not in our blockchain yer.
        // It can be write in our blockchain when a new Block is mined and created.

        this.createNewBlock(100, '0', '0'); // Genesis Block, it could arbitrary data, but it's the first block
    }

    createNewBlock(nonce, previousBlockHash, hash) {
        const newBlock = { // Our block into our chain
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransactions, // All the pending transactions created go inside the new block
            nonce: nonce, // A proof of work, it's a number. A proof that we created this block
            hash: hash, // The data for our new block, All our transactions go here compress as a single String of code
            previousBlockHash: previousBlockHash // Similar as hash, but is the data for the previous block created
        };

        this.pendingTransactions = []; // Once the block was created, we cleared out the transactions, to use the parameter with the next block
        this.chain.push(newBlock); // We put the new block inside our chain

        return newBlock;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    createNewTransaction(amount, sender, recipient) {
        const newTransaction = {
            amount: amount,
            sender: sender, // The sender Address
            recipient: recipient
        };

        this.pendingTransactions.push(newTransaction);

        return this.getLastBlock()['index'] + 1; // Return the number of the block that this transaction will be added.
    }

    // Hashing parameters
    // Import sha256 library and dependencies to use it.
    hashBlock(previousBlockHash, currentBlockData, nonce) {
        // ... return '90AASDFASDF97FASF9FDADSF9ADFA'
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        const hash = sha256(dataAsString);
        return hash;
    }

    // Finds the correct nonce to hash data
    proofOfWork(previousBlockHash, currentBlockData) {
        // bitcoin.hashBlock(previousBlockHash, currenBlockData, nonce);
        // in our case repeatedly hash block until it finds correct hash => '0000FASLKDFJASDLJ0AFSDF2K2L'
        // uses current block data for the hash, but also the previousBlockHash
        // continuously changes value until it finds the correct hash
        // returns to us the nonce value that creates the correct hash
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash,currentBlockData, nonce);
        while(hash.substring(0, 4) !== '0000') {
            nonce++;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        }

        return nonce;
    }
}




module.exports = Blockchain;