var request = require('request');
var Db = require('../database');

var CoinmarketcapService = function() {
	this.baseUrl = 'https://api.coinmarketcap.com/v1/ticker/';
};


/**
*
* @param {String} coinId - request param
* @param {Function} next 
*/
CoinmarketcapService.prototype._getTickerFromMarket = function(coinId, next) {
	var requestObject = this._configureRequest(coinId);

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

/**
*
* @param {String} coinId - request param
*/
CoinmarketcapService.prototype._configureRequest = function(coinId) {
	var requestUrl = this.baseUrl + coinId;	

	return {
		url: requestUrl,
		json: true,
	};
};

/**
*
* @param {String} coinId - request param
* @param {Function} next
*/
CoinmarketcapService.prototype.getCoinInfo = function(coinId, next) {
	var self = this;

	self._getTickerFromMarket(coinId, function(err, info) {

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

/**
*	Method takes response from coinmarketcap as param and takes price_usd from it
*   and insert price in new object which structure matches the future database logic 
* @param {Object} info - object from coinmarketcap response
* @param {String} info.name
* @param {String} info.symbol
* @param {String} info.rank
* @param {String} info.price_usd
* @param {String} info.price_btc
* @param {String} info.24h_volume_usd
* @param {String} info.market_cap_usd
* @param {String} info.available_supply
* @param {String} info.total_supply
* @param {String} info.percent_change_1h
* @param {String} info.percent_change_24h
* @param {String} info.percent_change_7d
* @param {String} info.last_updated
* @returns {Object}
*/
CoinmarketcapService.prototype._convertCoinInfo = function(info) {

	var convertedInfo = {
		chartdata: [],
		buys: [],
		sells: [],
		trades: [],
		stats: {
			last: info.price_btc,
		},
	};

	return convertedInfo;
};


module.exports = new CoinmarketcapService();