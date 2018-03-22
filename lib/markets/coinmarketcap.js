var request = require('request');
var settings = require('../settings');
var Db = require('../database');

var coinName = settings.coin;

var CoinmarketcapService = function() {
	this.baseUrl = 'https://api.coinmarketcap.com/v1/ticker/';
};

CoinmarketcapService.prototype._getTickerFromMarket = function(next) {
	var requestObject = this._configureRequest();

	request.get(requestObject, function(err, response, body) {

		if (err) {
			return next(err);
		}

		if (body && Array.isArray(body) && body.length) {
			return next(null, body[0]);
		}

		return next();

	});
} 

CoinmarketcapService.prototype._configureRequest = function() {
	var requestUrl = this.baseUrl + coinName.toLowerCase() + '-coin';

	return {
		url: requestUrl,
		json: true,
	};
};

CoinmarketcapService.prototype.getConvertedCoinInfo = function(next) {
	var self = this;

	self._getTickerFromMarket(function(err, info) {

		if (err) {
			return next(err, {});
		}

		if (!info) {
			return next(null, {});
		}

		var convertedCoinInfo = self._convertCoinInfo(info);
		
		return next(null, convertedCoinInfo);

	});
};

CoinmarketcapService.prototype._convertCoinInfo = function(info) {
	console.log(info.price_usd);
	var convertedInfo = {
		chartdata: [],
		buys: [],
		sells: [],
		trades: [],
		stats: {
			last: info.price_usd,
		},
	};

	return convertedInfo;
};


module.exports = new CoinmarketcapService();