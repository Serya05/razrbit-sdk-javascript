"use strict";

exports = module.exports = Explorer;

/**
 * The explorer class, instanciate it through the explorer property on your Razrbit instance
 * @class
 * @param {object} razrbit The Razrbit instance to use
 */
function Explorer(razrbit) {
    this.razrbit = razrbit;
}

/**
 * Returns information about a given block
 * @param {string} hash The block hash
 * @param {function(err, block)} cb
 * @returns {undefined}
 */
Explorer.prototype.block = function(hash, cb) {
    this.razrbit.request("/api/v1/explorer/block", { blockHash: hash }, cb);
};

/**
 * Returns information about a given transaction
 * @param {string} hash The transaction hash
 * @param {function(err, transaction)} cb
 * @returns {undefined}
 */
Explorer.prototype.transaction = function(hash, cb) {
    this.razrbit.request("/api/v1/explorer/transaction", { transactionHash: hash }, cb);
};

/**
 * Returns information about a given address
 * @param {string} address The bitcoin address
 * @param {function(err, addressDetails)} cb
 * @returns {undefined}
 */
Explorer.prototype.address = function(address, cb) {
    this.razrbit.request("/api/v1/explorer/address", { address: address }, cb);
};

/**
 * Returns the list of unspent transaction output
 * @param {string} address The bitcoin address
 * @param {function(err, output[])} cb
 * @returns {undefined}
 */
Explorer.prototype.addressUnspentOutputs = function(address, cb) {
    this.razrbit.request("/api/v1/explorer/addressUnspentOutputs",
        { address: address }, function(err, body) {
            if (err) return cb(err);
            cb(null, body.unspentOutputs);
        });
};
