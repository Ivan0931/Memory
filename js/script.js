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
					<img src=\"img/back.gif\" class=\"card-back\">
					
				</div>`,
		cardDeck = [],
		acc = 0,
		accCards = [],
		points = 0;

	//create an array of objects of cards with name and src of faces images
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

	function removingCards () {
		
	};


	function newCardsLayout(cards = getShuffledCards(cardDeck)) {
		Array.from(clickedCard).forEach((element, index) => {

			//add tag img into cards (faces of cards)
			let img = document.createElement('img');
			img.src = cards[index].src;
			img.setAttribute('data-Card-Name', cards[index].name)
			img.id = 'openCard' + index;
			img.className = "card-face done";
			element.appendChild(img);
			element.setAttribute('data-tid', 'Card-flipped');

			setTimeout(function() {
				element.children[1].classList.remove('done');	
				element.setAttribute('data-tid', 'Card');			
			}, 5000);
		});
	};

	//push on the button start game
	Array.from(goNew).forEach(element => {
		element.addEventListener("click", () => {

			if(element.getAttribute('data-start-game') == 'FirstPage') {
				fieldStart.style.cssText = "display: none";
				fieldGame.style.cssText = "display: block";
				field.innerHTML = img.repeat(18);			
				newCardsLayout();
				pointsContainer.innerHTML = '0';
			};

			if(element.getAttribute('data-start-game') == 'SecondPage') {
				removingCards();
				field.innerHTML = img.repeat(18);			
				newCardsLayout();
				points = 0;
				pointsContainer.innerHTML = points;
			};

			if(element.getAttribute('data-start-game') == 'ThirdPage') {
				fieldGame.style.cssText = "display: block";
				fieldEnd.style.cssText = "display: none";
				removingCards();
			};

			eventOnClick(field);

		});
	});
	

	

	function eventOnClick(fieldCards) {
		fieldCards.addEventListener('click', function(event) {
			let target = event.target,
			currentCard = target.parentNode;

			if (currentCard.children[1].classList.contains('done')) return;
			++acc;

			if (currentCard.hasAttribute('data-tid')) {
				
				if(currentCard.getAttribute('data-tid') == 'Card' && acc <=2){
					currentCard.setAttribute('data-tid', 'Card-flipped');

					accCards.push({
						cardName: currentCard.children[1].getAttribute('data-Card-Name'),
						cardId: currentCard.children[1].id
					});


					let i = accCards.length - 1;



     				if (accCards.length % 2 == 0 && 
     					accCards[i].cardName == accCards[i-1].cardName && 
     					accCards[i].cardId != accCards[i-1].cardId) {
	     					Array.from(clickedCard).forEach(element => {
	     						if(element.getAttribute('data-tid') == 'Card-flipped'){
	     							element.children[1].classList.add('done');
	     						}
	     					});
	     				points += (18 - accCards.length) * 42;
     					pointsContainer.innerHTML = points;
	     				acc = 0;
     				}

     				else if (accCards.length % 2 == 0 && 
     					(accCards[i].cardName != accCards[i-1].cardName) ) {

     					points -= accCards.length * 42;
     					pointsContainer.innerHTML = points;
     					setTimeout(() => 
     						Array.from(clickedCard).forEach(element => {
		     					element.setAttribute('data-tid', 'Card');
		     					accCards.splice(i-1, 2);
		     					acc = 0;
     						}), 1000);
     				}
     				//    ????????????
     				else if (accCards.length % 2 == 0 && 
     					(accCards[i].cardName == accCards[i-1].cardName && 
     					accCards[i].cardId == accCards[i-1].cardId)) {
     					points = points;
     					accCards.splice(i-1, 2);
     					acc = 0;
     				}


     				//		????????
				}
					
				else if (currentCard.getAttribute('data-tid') == 'Card-flipped' && acc > 2) {
					currentCard.setAttribute('data-tid', 'Card');
					acc = 0;
				}
			};
			
			// goToEnd();
		})
	};

	function goToEnd() {
		let doneCards = document.getElementsByClassName('done');
		if(doneCards.length == 18) {
			fieldGame.style.cssText = "display: none";
			fieldEnd.style.cssText = "display: block";
		};
	};

	
};
