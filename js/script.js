(function(){

	"use strict"

	var startGame = document.getElementById('btn-start'),
		fieldStart = document.getElementById('container__start'),
		fieldGame = document.getElementById('container__game'),
		clickedCard = {};
		

	startGame.addEventListener("click", function() {
		fieldStart.style.cssText = "display: none";
		fieldGame.style.cssText = "display: block";
		let img = "<div class=\"cards\"><img src=\"img/back.gif\" class=\"card\"></div>";
		let field = document.getElementById('field__cards');
		field.innerHTML = img.repeat(18);
		
		clickedCard = document.getElementsByClassName('cards');
		eventOnClick(clickedCard);

	});

	function eventOnClick(card) {
		Array.from(card).forEach(function(element) {
     		element.addEventListener('click', function(event) {
				let currCard = event.currentTarget;
				currCard.classList.toggle("active");
      		});

    	});
	};
	



	// clickCard.addEventListener("click", function(event) {
	// 	let currCard = event.target;
	// 	event.stopPropagation();
	// 	acc++;
	// 	console.log(currCard, acc);
	// 	if (!currCard.classList.contains('active')) {
	// 		// if (acc <= 2) {
	// 			currCard.classList.add('active');
	// 			event.stopPropagation();
	// 			// acc++;
	// 		// }
	// 		// else event.stopPropagation();
	// 	}
	// 	else currCard.classList.remove('active');
	// });

	
})();
