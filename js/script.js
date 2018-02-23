{

	"use strict"
	const 	cardName = ["C", "D", "H", "S"],
			startGame = document.getElementById('btn-start'),
			fieldStart = document.getElementById('container__start'),
			fieldGame = document.getElementById('container__game'),
			field = document.getElementById('field__cards'),
			clickedCard = document.getElementsByClassName('cards');
//<img src=\"\" class=\"card-face\">
	var img = `<div class=\"cards\">
					<img src=\"img/back.gif\" class=\"card-back\">
					
				</div>`,
		cardDeck = [],
		newArr = [],
		acc = 1;

	for (let i = 2; i < 15; i++) {
		for (let n = 0; n < 4; n++) {
			cardDeck.push( {name: i + cardName[n], src: `img/${ i + cardName[n] }.png`} );
		}
	};

	// function shuffle(array) {
	// 	var currentIndex = array.length, temporaryValue, randomIndex;

	// 	  // While there remain elements to shuffle...
	// 	while (0 !== currentIndex) {

	// 	    // Pick a remaining element...
	// 	    randomIndex = Math.floor(Math.random() * currentIndex);
	// 	    currentIndex -= 1;

	// 	    // And swap it with the current element.
	// 	    temporaryValue = array[currentIndex];
	// 	    array[currentIndex] = array[randomIndex];
	// 	    array[randomIndex] = temporaryValue;
	// 	};
	// 	return array;
	// };

	var shuffled = cardDeck.map((a) => 
								[Math.random(),a])
								.sort((a,b) => a[0]-b[0])
								.map((a) => a[1])
							.slice(0, 18);

	console.log(shuffled);


	startGame.addEventListener("click", function() {
		fieldStart.style.cssText = "display: none";
		fieldGame.style.cssText = "display: block";
		field.innerHTML = img.repeat(18);

		eventOnClick(clickedCard);

		Array.from(clickedCard).forEach( function(element, index) {
			// let img = document.createElement('img');
			// img.src = newArr[index].src;
			// img.className = "card-face";
			// element.appendChild(img)
		});
	});

	

	function eventOnClick(card) {
		Array.from(card).forEach(function(element) {

     		element.addEventListener('click', function(event) {
     			
     			let currCard = event.currentTarget;
     			if (acc <= 2) {
     				currCard.classList.toggle('active');
     				acc++;
     			}
     			else {
     				event.preventDefault();
     				Array.from(card).forEach(function(item) {
     					item.classList.remove('active');
     				});
     				acc = 1;
				}

      		});

    	});
	};


	
	
};
