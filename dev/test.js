const Blockchain = require('./blockchain');
const bitcoin = new Blockchain(); // Bitcoin Blockchain

const bc1 =
    {
        "chain": [
            {
                "index": 1,
                "timestamp": 1564271842773,
                "transactions": [],
                "nonce": 100,
                "hash": "0",
                "previousBlockHash": "0"
            },
            {
                "index": 2,
                "timestamp": 1564271943782,
                "transactions": [],
                "nonce": 18140,
                "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
                "previousBlockHash": "0"
            },
            {
                "index": 3,
                "timestamp": 1564271959394,
                "transactions": [
                    {
                        "amount": 12.5,
                        "sender": "00",
                        "recipient": "46b5e940b0ca11e991c18ffac5b5c640",
                        "transactionId": "82eb93b0b0ca11e991c18ffac5b5c640"
                    }
                ],
                "nonce": 69228,
                "hash": "0000fa958ec58987d38090531982dcb19794b9a77a67d8eeecd1039f752deb5b",
                "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
            },
            {
                "index": 4,
                "timestamp": 1564271999037,
                "transactions": [
                    {
                        "amount": 12.5,
                        "sender": "00",
                        "recipient": "46b5e940b0ca11e991c18ffac5b5c640",
                        "transactionId": "8c39c770b0ca11e991c18ffac5b5c640"
                    },
                    {
                        "amount": 50,
                        "sender": "ASLDKF2LFJ2JF2LF",
                        "recipient": "2ALSFLKASJDFLAS",
                        "transactionId": "96dd7910b0ca11e991c18ffac5b5c640"
                    },
                    {
                        "amount": 50,
                        "sender": "ASLDKF2LFJ2JF2LF",
                        "recipient": "2ALSFLKASJDFLAS",
                        "transactionId": "9937bcc0b0ca11e987f78754f36766a8"
                    },
                    {
                        "amount": 50,
                        "sender": "ASLDKF2LFJ2JF2LF",
                        "recipient": "2ALSFLKASJDFLAS",
                        "transactionId": "9b913d20b0ca11e98ff64d2ac7367575"
                    },
                    {
                        "amount": 80,
                        "sender": "ASLDKF2LFJ2JF2LF",
                        "recipient": "2ALSFLKASJDFLAS",
                        "transactionId": "a0f5b390b0ca11e991c18ffac5b5c640"
                    }
                ],
                "nonce": 142616,
                "hash": "0000a3eb4283cfbbf88dcae09bab7bd13d8cb5e9f071b35c7e05053341a18e39",
                "previousBlockHash": "0000fa958ec58987d38090531982dcb19794b9a77a67d8eeecd1039f752deb5b"
            },
            {
                "index": 5,
                "timestamp": 1564272026205,
                "transactions": [
                    {
                        "amount": 12.5,
                        "sender": "00",
                        "recipient": "46b5e940b0ca11e991c18ffac5b5c640",
                        "transactionId": "a3db9570b0ca11e991c18ffac5b5c640"
                    },
                    {
                        "amount": 10,
                        "sender": "ASLDKF2LFJ2JF2LF",
                        "recipient": "2ALSFLKASJDFLAS",
                        "transactionId": "abcb4aa0b0ca11e991c18ffac5b5c640"
                    },
                    {
                        "amount": 10,
                        "sender": "ASLDKF2LFJ2JF2LF",
                        "recipient": "2ALSFLKASJDFLAS",
                        "transactionId": "ac9b1dc0b0ca11e991c18ffac5b5c640"
                    }
                ],
                "nonce": 159658,
                "hash": "0000124a742f6e828a4c099bf87ea24fd1e74fe4603f7cd29b076f69c63b12f7",
                "previousBlockHash": "0000a3eb4283cfbbf88dcae09bab7bd13d8cb5e9f071b35c7e05053341a18e39"
            },
            {
                "index": 6,
                "timestamp": 1564272030343,
                "transactions": [
                    {
                        "amount": 12.5,
                        "sender": "00",
                        "recipient": "46b5e940b0ca11e991c18ffac5b5c640",
                        "transactionId": "b40ca240b0ca11e991c18ffac5b5c640"
                    }
                ],
                "nonce": 22667,
                "hash": "0000d4095a7293bf671f3375c74581f9abb4d9c4fac6f09a1617cf2ac4709eba",
                "previousBlockHash": "0000124a742f6e828a4c099bf87ea24fd1e74fe4603f7cd29b076f69c63b12f7"
            },
            {
                "index": 7,
                "timestamp": 1564272031976,
                "transactions": [
                    {
                        "amount": 12.5,
                        "sender": "00",
                        "recipient": "46b5e940b0ca11e991c18ffac5b5c640",
                        "transactionId": "b6840ae0b0ca11e991c18ffac5b5c640"
                    }
                ],
                "nonce": 16563,
                "hash": "0000d7c044df49f65ea813def4ac60fdf781e36ea6fae7a15af91268e27b10e5",
                "previousBlockHash": "0000d4095a7293bf671f3375c74581f9abb4d9c4fac6f09a1617cf2ac4709eba"
            }
        ],
        "pendingTransactions": [
            {
                "amount": 12.5,
                "sender": "00",
                "recipient": "46b5e940b0ca11e991c18ffac5b5c640",
                "transactionId": "b77cc2c0b0ca11e991c18ffac5b5c640"
            }
        ],
        "currentNodeUrl": "http://localhost:3001",
        "networkNodes": [
            "http://localhost:3002",
            "http://localhost:3003",
            "http://localhost:3004",
            "http://localhost:3005"
        ]
    };

console.log('VALID: ', bitcoin.chainIsValid(bc1.chain));