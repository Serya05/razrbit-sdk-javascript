"use strict";

exports = module.exports = Wallet;

/**
 * The wallet class, instanciate it through the wallet property on your Razrbit instance
 * @class
 * @param {object} razrbit The Razrbit instance to use
 */
function Wallet(razrbit) {
    this.razrbit = razrbit;
}

/**
 * Create a new bitcoin address
 * @param {function(err, address)} cb
 * @returns undefined
 */
Wallet.prototype.createNewAddress = function(cb) {
    cb = cb || function() {}
    this.razrbit.request("/api/v1/wallet/createNewAddress", function(err, body) {
        if (err) return cb(err);
        cb(null, {address:body.address,privateKey:body.privateKey});
    });
};

/**
 * Send bitcoin to a remote address
 * @param {string} from   The address in the wallet to send from
 * @param {string} to     The address to send to
 * @param {number} amount The amount in satoshi to send
 * @param {function(err, address)} cb
 * @returns undefined
 */
Wallet.prototype.sendAmount = function(from, to, amount, cb) {
    cb = cb || function() {}
    this.razrbit.request("/api/v1/wallet/sendAmount", {
        fromAddressPrivateKey: from,
        toAddress: to,
        amount: amount
    }, function(err, body) {
        cb(err);
    });
};

/**
 * Get the balance from a bitcoin address
 * @param {string} address The address we want the balance from
 * @param {function(err, satoshiAmount)} cb
 * @returns undefined
 */
Wallet.prototype.getBalanceFromAddress = function(address, cb) {
    cb = cb || function() {}
    this.razrbit.request("/api/v1/wallet/getBalanceFromAddress", {
        address: address
    }, function(err, body) {
        if (err) return cb(err);
        cb(null, body.balance);
    });
};

