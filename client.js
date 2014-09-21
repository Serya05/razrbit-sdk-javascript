"use strict";

var request = require("superagent");

var Wallet = require("./lib/wallet.js");
var Explorer = require("./lib/explorer.js");
var Network = require("./lib/network.js");
var Markets = require("./lib/markets.js");
var Notifications = require("./lib/notifications");

module.exports = Razrbit;

var ENDPOINT = "https://api.luxstack.com";

var WEBSOCKET_BLOCKS_PORT = 8082;
var WEBSOCKET_TXS_PORT = 8081;

// Just a very basic wrapper that makes websockets work kinda like the ws node module
function WsWrapper(uri) {
    if (!window.WebSocket) throw new Error("This browser doesn't support WebSockets");
    this.ws = new window.WebSocket(uri);
}

WsWrapper.prototype.on = function(event, fn) {
    this.ws['on' + event] = fn;
};

function Razrbit(id, secret) {
    var self = this;

    this.id = id;
    this.secret = secret;

    this.websockets = {
        blocks: function(cb) { self.websocket(WEBSOCKET_BLOCKS_PORT, cb); },
        transactions: function(cb) { self.websocket(WEBSOCKET_TXS_PORT, cb); }
    }
}

Razrbit.prototype = {
    constructor: Razrbit,
    // lazy constructors
    get wallet() {
        if (!this._wallet) this._wallet = new Wallet(this);
        return this._wallet;
    },
    get explorer() {
        if (!this._explorer) this._explorer = new Explorer(this);
        return this._explorer;
    },
    get network() {
        if (!this._network) this._network = new Network(this);
        return this._network;
    },
    get markets() {
        if (!this._markets) this._markets = new Markets(this);
        return this._markets;
    },
    get notifications() {
        if (!this._notifications) this._notifications = new Notifications(this);
        return this._notifications;
    },
    request: function(path, data, cb) {
        if (typeof data === "function") {
            cb = data;
            data = {};
        }

        data = data || {};
        data.appId = this.id;
        data.appSecret = this.secret;

        return request.post(ENDPOINT + path)
            .send(data)
            .end(function (res) {
                if (res.status != 200) {
                    var message = res.body.message || "Unknown server error";
                    return cb(new error.ApiError(message, res.status));
                }

                cb(null, res.body);
            });
    },
    websocket: function(port, cb) {
        var socket = new WsWrapper("ws://api.luxstack.com");
        socket.on('open', function() {
            cb(socket);
        });
    }
}
