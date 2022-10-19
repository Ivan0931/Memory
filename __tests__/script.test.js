let cardsArr = cardsArray(),
	shuffleCards = getShuffledCards(cardsArr),
	clickedCards = document.createElement('div');

clickedCards.classList.add('cards');

describe('Memory', function () {
	it('Return array size of 52', function () {
		assert.lengthOf(cardsArr, 52);
	});

	it('Return 9 duplicated cards', function () {
		assert.lengthOf(shuffleCards, 18);
	});

	it('Add face <img> into div.class="cards"', function () {
		newCardsLayout(shuffleCards, clickedCards);
		clickedCards.should.have.attr('data-tid');
		expect(clickedCards).not.to.be.empty;
	});

	it('Removing face card <img>', function () {
		let card1 = document.createElement('img'),
			card2 = document.createElement('img'),
			div = document.createElement('div');
		div.classList.add('cards');
		div.appendChild(card1);
		div.appendChild(card2);
		removingCards(div);

		div.should.have.length(1);
	});
});