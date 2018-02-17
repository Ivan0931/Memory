(function(){

	"use strict"

	var startGame = document.getElementById('btn-start'),
		fieldStart = document.getElementById('container__start'),
		fieldGame = document.getElementById('container__game');

	startGame.addEventListener("click", function() {
		fieldStart.style.cssText = "display: none";
		fieldGame.style.cssText = "display: block";
		let img = "<img src=\"img/back.gif\" class=\"card\">";
		let field = document.getElementById('field__cards');
		field.innerHTML = img.repeat(18);
	});

	let clickCard = document.getElementById('field__cards');
	clickCard.addEventListener("click", function(event) {
		let currCard = event.target;
		let acc = 0;
		if (!currCard.classList.contains('active')) {
			// if (acc <= 2) {
				currCard.classList.add('active');
				event.stopPropagation();
				// acc++;
			// }
			// else event.stopPropagation();
		}
		else currCard.classList.remove('active');
	});

	
})();
