"use strict";

exports = module.exports = Network;

/**
 * The network class, instanciate it through the network property on your Razrbit instance
 * @class
 * @param {object} razrbit The Razrbit instance to use
 */
function Network(razrbit) {
    this.razrbit = razrbit;
}

/**
 * Returns the network difficulty
 * @param {function(err, difficulty)} cb
 * @returns {undefined}
 */
Network.prototype.difficulty = function(cb) {
    this.razrbit.request("/api/v1/network/getDifficulty", function(err, body) {
        if (err) return cb(err);
        cb(null, body.difficulty);
    });
};

/**
 * Push a transaction on the network
 * @param {object} transaction The transaction object
 * @param {function(err)} cb
 * @returns {undefined}
 */
Network.prototype.pushTransaction = function(transaction, cb) {
    this.razrbit.request("/api/v1/network/pushTransaction",
        { transaction: transaction }, function(err) {
            // silence body
            cb(err);
        });
};
