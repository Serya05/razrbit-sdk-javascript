var util = require("util");

exports.ApiError = function(message, code) {
    Error.call(this, message);
    this.message = message;
    this.code = code;
};
util.inherits(exports.ApiError, Error);
