"use strict";

var fs = require("fs");
var should = require('should');
var exec = require('child_process').exec;

var Razrbit = require("..");

// variables used through the tests
var genesisBlock = "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f";
var testTransaction = "e465776649561f62082d27c206c98aca11803673b752de5f44c3fcacba1d656f";
var testAddress = "12sENwECeRSmTeDwyLNqwh47JistZqFmW8";

describe("Razrbit client", function() {
    var client;

    before(function() {
        var credentials = JSON.parse(fs.readFileSync(__dirname + "/credentials.json"));
        if (!credentials.id || !credentials.secret) {
            throw new Error("Please set your credentials in the credentials.json file before running the tests");
        }

        client = new Razrbit(credentials.id, credentials.secret);
    });

    describe("Wallet", function() {
        var createdAddress;

        it("Create a new bitcoin address", function(done) {
            client.wallet.createNewAddress(function(err, result) {
                (err === null).should.be.true;
                // quick and dirty regexp
                result.address.should.match(/^1[1-9A-Za-z][^OIl]{20,40}$/);

                done();
            });
        });

        it("Send bitcoins", function(done) {
            client.wallet.sendAmount("5exampleFromAddressPrivateKey", "1exampleToAddress", 123456,
                function(err) {
                    (err === null).should.be.true;
                    done();
                });
        });

        it("Retrieve the balance from an address", function(done) {
            client.wallet.getBalanceFromAddress(testAddress, function(err, balance) {
                (err === null).should.be.true;
                balance.should.be.exactly(1626000741.03);
                done();
            });
        });

    });

    describe("Explorer", function() {
        it("Retrieve details about a block", function(done) {
            client.explorer.block(genesisBlock, function(err, block) {
                (err === null).should.be.true;
                block.hash.should.equal(genesisBlock);
                block.height.should.be.exactly(0);
                done();
            });
        });

        it("Retrieve details about a transaction", function(done) {
            client.explorer.transaction(testTransaction, function(err, transaction) {
                (err === null).should.be.true;
                transaction.txid.should.equal(testTransaction);
                transaction.valueOut.should.be.exactly(2500000);
                done();
            });
        });

        it("Retrieve details about an address", function(done) {
            client.explorer.address(testAddress, function(err, address) {
                (err === null).should.be.true;
                address.addrStr.should.equal(testAddress);
                address.totalReceivedSat.should.be.above(162600074102);
                done();
            });
        });

        it("Retrieve the list of outputs for a given address", function(done) {
            client.explorer.addressUnspentOutputs(testAddress, function(err, outputs) {
                (err === null).should.be.true;
                // outputs are not really an easy thing to test
                outputs.should.be.an.Array;
                done();
            });
        });
    });


    describe("Network", function() {
        it("Retrieve network difficulty", function(done) {
            client.network.difficulty(function(err, difficulty) {
                (err === null).should.be.true;
                difficulty.should.be.a.Number;
                done();
            });
        });


        it("Pushes a transaction on the network", function(done) {
            client.network.pushTransaction("exampleTransaction", function(err, difficulty) {
                (err === null).should.be.true;
                done();
            });
        });
    });

    describe("Markets", function() {
        it("Retrieve current price in USD", function(done) {
            client.markets.price("USD", function(err, price) {
                (err === null).should.be.true;
                price.should.be.a.Number;
                done();
            });
        });

        it("Retrieve the day price in USD", function(done) {
            client.markets.dayPrice("USD", function(err, price) {
                (err === null).should.be.true;
                price.should.be.a.Number;
                done();
            });
        });

        it("Retrieve the day price for a given date in USD", function(done) {
            client.markets.historicalPrice("USD", "2013-11-08", function(err, price) {
                (err === null).should.be.true;
                price.should.be.exactly(346.52).and.a.Number;
                done();
            });
        });
    });

    describe("Notifications", function() {
        var email;

        // try to retrieve the user email from the git config, otherwise use a fake address
        before(function(done) {
            exec("git config --get user.email", function(err, stdout) {
                (err === null).should.be.true;
                email = stdout.trim() || "notifications@invalid-internet-address.invtld";
                done();
            });
        });


        it("Setup a hook on a bitcoin address", function(done) {
            client.notifications.address(testAddress, email, function(err) {
                (err === null).should.be.true;
                done();
            });
        });

        it("Setup a hook on a bitcoin block", function(done) {
            client.notifications.block(genesisBlock, email, function(err) {
                (err === null).should.be.true;
                done();
            });
        });

        it("Setup a hook on a bitcoin transaction", function(done) {
            client.notifications.transaction(testTransaction, email, function(err) {
                (err === null).should.be.true;
                done();
            });
        });
    });
});
