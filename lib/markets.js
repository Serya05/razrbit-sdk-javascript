"use strict";

exports = module.exports = Markets;

/**
 * The markets class, instanciate it through the markets property on your Razrbit instance
 * @class
 * @param {object} razrbit The Razrbit instance to use
 */
function Markets(razrbit) {
    this.razrbit = razrbit;
}

/**
 * Returns the current market price
 * @param {string} currencyCode
 * @param {function(err, price)} cb
 * @returns {undefined}
 */
Markets.prototype.price = function(currencyCode, cb) {
    this.razrbit.request("/api/v1/markets/price",
        {currencyCode: currencyCode}, function(err, body) {
            if (err) return cb(err);
            cb(null, body.price);
    });
};

/**
 * Returns the price for today
 * @param {string} currencyCode
 * @param {function(err)} cb
 * @returns {undefined}
 */
Markets.prototype.dayPrice = function(currencyCode, cb) {
    this.razrbit.request("/api/v1/markets/dayPrice",
        { currencyCode: currencyCode }, function(err, body) {
            if (err) return cb(err);
            cb(null, body.dayPrice);
    });
};

/**
 * Returns the price for today
 * @param {string} currencyCode
 * @param {string} date Date in the yyyy-mm-dd format
 * @param {function(err)} cb
 * @returns {undefined}
 */
Markets.prototype.historicalPrice = function(currencyCode, date, cb) {
    this.razrbit.request("/api/v1/markets/historicalPrice",
        { currencyCode: currencyCode, date: date }, function(err, body) {
            if (err) return cb(err);
            // TODO: remove Number conversion once fixed on the API
            cb(null, new Number(body.price));
    });
};


Markets.prototype.dayPriceHistory = function(currencyCode, cb) {
    this.razrbit.request("/api/v1/markets/dayPriceHistory",
        { currencyCode: currencyCode }, function(err, body) {
            if (err) return cb(err);
            cb(null, body.dayPriceHistory);
    });
};



Markets.prototype.dayPriceHistoryChartable = function(currencyCode, cb) {
    this.razrbit.request("/api/v1/markets/dayPriceHistory",
        { currencyCode: currencyCode }, function(err, body) {
            if (err) return cb(err);

            var rawData=body.dayPriceHistory;

            var lowestYValue=999999;
            for (var i in rawData) {
                if (rawData[i][1]<lowestYValue){
                    lowestYValue=rawData[i][1];
                }
            }

            var cleanData=[];
            for (var i in rawData) {
                cleanData.push({x:rawData[i][0],y:rawData[i][1]-lowestYValue});
            }

            cb(null, cleanData);
    });
};




