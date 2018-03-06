{

	"use strict"
	const 	cardName = ["C", "D", "H", "S"],
			startGame = document.getElementById('btn-start'),
			fieldStart = document.getElementById('container__start'),
			fieldGame = document.getElementById('container__game'),
			fieldEnd = document.getElementById('container__end'),
			field = document.getElementById('field__cards'),
			clickedCard = document.getElementsByClassName('cards'),
			pointsContainer = document.getElementById('points__current'),
			goNew = document.querySelectorAll('[data-start-game]');

	var img = `<div class=\"cards\" data-tid=\"Card\">
					<img src=\"img/back.png\" class=\"card-back\">
					
				</div>`,
		cardDeck = [], //array of 
		acc = 0, //accumulator of clicks on the card field
		accCards = [], // array of cards which has a pair
		points = 0;

	//create an array of card objects with name and src of faces images
	for (let i = 2; i < 15; i++) {
		for (let n = 0; n < 4; n++) {
			cardDeck.push( {name: i + cardName[n], src: `img/${ i + cardName[n] }.png`} );
		}
	};

	//get 18 sorted cards
	function getShuffledCards(cards) {
		let newArr = [];
		let shuffleCards = function (array) {
			return array.map((a) => 
								[Math.random(),a])
							.sort((a,b) => a[0]-b[0])
							.map((a) => a[1]); 
		};
		newArr = shuffleCards(cards).slice(0, 9);
		return shuffleCards(newArr.concat(newArr));
	};

	//start new game and old cards are removed
	function removingCards () {
		acc = 0;
		accCards = [];
		points = 0;
		Array.from(clickedCard).forEach( element => {
			element.children[1].remove();
		});
	};

	//when click on buttons 'new game' or 'one more game'
	//return 18 sorted cards and 5 sec they will be flipped
	function newCardsLayout(cards = getShuffledCards(cardDeck)) {
		Array.from(clickedCard).forEach((element, index) => {

			//add tag img into cards (faces of cards)
			let img = document.createElement('img');
			img.src = cards[index].src;
			img.setAttribute('data-card-name', cards[index].name)
			img.id = 'openCard' + index;
			img.className = "card-face done";
			element.appendChild(img);
			element.dataset.tid = 'Card-flipped';

			setTimeout(function() {
				element.children[1].classList.remove('done');	
				element.dataset.tid = 'Card';			
			}, 5000);
		});
	};

	function gameIsDone(openedCards) {
		if (openedCards == 18) {
			fieldGame.style.cssText = "display: none";
			fieldEnd.style.cssText = "display: block";
			let summary = document.getElementById('summary-points');
			summary.innerHTML = points + 84;
		}
	}

	//click on the button start game or one more game 
	Array.from(goNew).forEach(element => {
		element.addEventListener("click", () => {
			
			if(element.dataset.startGame == 'FirstPage') {
				fieldStart.style.cssText = "display: none";
				fieldGame.style.cssText = "display: block";
				field.innerHTML = img.repeat(18);			
			};

			if(element.dataset.startGame == 'SecondPage') {
				removingCards ()			
			};

			if(element.dataset.startGame == 'ThirdPage') {
				fieldGame.style.cssText = "display: block";
				fieldEnd.style.cssText = "display: none";
				removingCards ();
			};

			newCardsLayout();
			pointsContainer.innerHTML = '0';
			eventOnClick(field);

		});
	});
	
	//create event listerner by card field and check that click was on a card
	function eventOnClick(fieldCards) {
		fieldCards.addEventListener('click', function(event) {
			let target = event.target,
			currentCard = target.parentNode;

			if (currentCard.children[1].classList.contains('done')) return; // click on a card which was flipped and has a pair

			if (currentCard.hasAttribute('data-tid') && currentCard.dataset.tid == 'Card') {
				++acc;

				if (acc <= 2){
					currentCard.dataset.tid = 'Card-flipped';

					accCards.push({
						cardName: currentCard.children[1].dataset.cardName,
						cardId: currentCard.children[1].id
					});

					let i = accCards.length - 1; //current index of first flipped card

					//cards have the same name and different id
					//that mean it's a pair and add points
     				if (accCards.length % 2 == 0 && 
     					accCards[i].cardName == accCards[i-1].cardName && 
     					accCards[i].cardId != accCards[i-1].cardId) {

	     					Array.from(clickedCard).forEach(element => {
	     						if(element.dataset.tid == 'Card-flipped'){
	     							element.children[1].classList.add('done');
	     						}
	     					});
	     				points += (18 - accCards.length) * 42;
     					pointsContainer.innerHTML = points;
	     				acc = 0;
     				}

     				//it's not a pair, substact points
     				if (accCards.length % 2 == 0 && 
     					(accCards[i].cardName != accCards[i-1].cardName) ) {
     					acc = 0;
     					points -= accCards.length * 42;
     					pointsContainer.innerHTML = points;
     					accCards.splice(i-1, 2);
     					setTimeout(() => 
     						Array.from(clickedCard).forEach(element => {
		     					element.dataset.tid = 'Card';
     						}), 400);
     				}
				}

				//the end of the game
				gameIsDone(accCards.length);
			}
		})
	};

};
