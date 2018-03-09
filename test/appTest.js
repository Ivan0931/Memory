const assert = require('chai').assert;
const cardsArray = require('../js/app.js').cardsArray;
const getShuffledCards = require('../js/app.js').getShuffledCards;

describe('Memory', function () {
	it('Return array size of 52', function () {
		let result = cardsArray();
		assert.lengthOf(result, 52);
	});

	it('Return 9 duplicated cards', function () {
		let result = getShuffledCards(cardsArray());
		let obg = {};

		result.forEach(function(element) {
		  	obj.element[name] = (obj.element[name] || 0) + 1;

		});

		assert.lengthOf(result, 18);
		assert.lengthOf(obj.length, 9);
	});
});