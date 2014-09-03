<img src="http://cdn.luxstack.com/assets/razrbit-github-banner-dark-beta.png" style="width:100%"/>

Official SDKs: 
[Android](https://github.com/LUXSTACK/razrbit-sdk-android) | 
[iOS](https://github.com/LUXSTACK/razrbit-sdk-ios) | 
Javascript | 
[PHP](https://github.com/LUXSTACK/razrbit-sdk-php) | 
[Ruby](https://github.com/LUXSTACK/razrbit-sdk-ruby)

**[Razrbit](https://razrbit.com) is a powerful API that helps developers quickly build and manage Bitcoin applications without creating and maintaining complicated block chain infrastructure.**

# Razrbit SDK for Javascript (Beta)

## Installation

### Node JS

`npm install razrbit`

### Browser

Just include the `dist/razrbit.min.js` script in your
page.

## Usage

```javascript
var Razrbit = require("razrbit");

var client = new Razrbit("myId", "mySecret");

client.wallet.createNewAddress(function (err, result) {
        if (err) return console.error(err);
        console.log("New bitcoin address: " + result.address);
});
```

## API

### Wallet

```
Razrbit.wallet.createNewAddress(cb(err, result))
```
Creates a new bitcoin address in your wallet

```
Razrbit.wallet.sendAmount(fromPrivateKey, toAddress, amount, cb(err))
```
Sends bitcoin from one of your addresses to the destination addresses.
`amount` is in bits.

```
Razrbit.wallet.getBalanceFromAddress(address, cb(err, amount))
```
Returns the balance of the given address in bits.

### Explorer

```
Razrbit.explorer.block(hash, cb(err, block))
```
Retrieve details about a given block

```
Razrbit.explorer.transaction(hash, cb(err, transaction))
```
Retrieve details about a given transaction

```
Razrbit.explorer.address(address, cb(err, addressDetails))
```
Retrieve details about a given address

```
Razrbit.explorer.addressUnspentOutputs(address, cb(err, amount))
```
Returns the list of unspent outputs for a given address

### Network

```
Razrbit.network.difficulty(cb(err, difficulty))
```
Retrieve the current network difficulty

```
Razrbit.network.pushTransaction(transaction, cb(err, transaction))
```
Push a transaction on the network

### Markets

`currencyCode` is a valid ISO 4217 code such as `USD` or `EUR`.

```
Razrbit.markets.price(currencyCode, cb(err, price))
```
Returns the current bitcoin price

```
Razrbit.markets.dayPrice(currencyCode, cb(err, price))
```
Returns the day price

```
Razrbit.markets.dayPrice(currencyCode, date, cb(err, price))
```
Returns the historical price at the given date.
`date` must be a date in the `yyyy-mm-dd` format.

### Notifications

```
Razrbit.notifications.address(address, email, cb(err))
```
Setup a notification email for a given address

```
Razrbit.notifications.block(hash, email, cb(err))
```
Setup a notification email for a given block

```
Razrbit.notifications.transaction(hash, email, cb(err))
```
Setup a notification email for a given transaction

## Testing

Add your credentials to test/credentials.json, then run
either `npm test` or `mocha`.

# Support

Feel free to request a feature and make suggestions for our [product team](mailto:team@luxstack.com).

* [GitHub Issues](https://github.com/luxstack/razrbit-sdk-javascript/issues)

# License

The MIT License (MIT)

Copyright (c) 2014 LUXSTACK Inc. 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

# Official Razrbit SDKs for other platforms

* [Android](https://github.com/LUXSTACK/razrbit-sdk-android)
* [iOS](https://github.com/LUXSTACK/razrbit-sdk-ios)
* Javascript
* [PHP](https://github.com/LUXSTACK/razrbit-sdk-php)
* [Ruby](https://github.com/LUXSTACK/razrbit-sdk-ruby)