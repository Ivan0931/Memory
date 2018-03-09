module.exports = {

	cardsArray: function () {
		let cardDeck = [],
			cardName = ["C", "D", "H", "S"];
		for (let i = 2; i < 15; i++) {
			for (let n = 0; n < 4; n++) {
				cardDeck.push( {name: i + cardName[n], src: `img/${ i + cardName[n] }.png`} );
			}
		};
		return cardDeck;
	},
	getShuffledCards: function (cards) {
		let newArr = [];
		let shuffleCards = function (array) {
			return array.map((a) => 
								[Math.random(),a])
							.sort((a,b) => a[0]-b[0])
							.map((a) => a[1]); 
		};
		newArr = shuffleCards(cards).slice(0, 9);
		return shuffleCards(newArr.concat(newArr));
	}
}