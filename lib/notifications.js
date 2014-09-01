"use strict";

exports = module.exports = WebHook;

/**
 * The webhook class, instanciate it through the webhook property on your Razrbit instance
 * @class
 * @param {object} razrbit The Razrbit instance to use
 */
function WebHook(razrbit) {
    this.razrbit = razrbit;
}

/**
 * Setup a notification email for a given address
 * @param {string} address The bitcoin address to watch
 * @param {string} email The email to sent notifications to
 * @param {function(err)} cb
 * @returns {undefined}
 */
WebHook.prototype.address = function(address, email, cb) {
    this.razrbit.request("/api/v1/notifications/address",
        { address: address, email: email }, function(err, body) {
        if (err) return cb(err);
        cb(null);
    });
};

/**
 * Setup a notification email for a given block
 * @param {string} hash The bitcoin block to watch
 * @param {string} email The email to sent notifications to
 * @param {function(err)} cb
 * @returns {undefined}
 */
WebHook.prototype.block = function(hash, email, cb) {
    this.razrbit.request("/api/v1/notifications/block",
        { blockHash: hash, email: email }, function(err, body) {
        if (err) return cb(err);
        cb(null);
    });
};

/**
 * Setup a notification email for a given transaction
 * @param {string} hash The bitcoin transaction to watch
 * @param {string} email The email to sent notifications to
 * @param {function(err)} cb
 * @returns {undefined}
 */
WebHook.prototype.transaction = function(hash, email, cb) {
    this.razrbit.request("/api/v1/notifications/transaction",
        { transactionHash: hash, email: email }, function(err, body) {
        if (err) return cb(err);
        cb(null);
    });
};
