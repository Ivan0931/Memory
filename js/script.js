(function(){
	
	"use strict"

	var startGame = document.getElementById('btn-start'),
		fieldStart = document.getElementById('container__start'),
		fieldGame = document.getElementById('container__game');

	startGame.addEventListener("click", function() {
		fieldStart.style.cssText = "display: none";
		fieldGame.style.cssText = "display: block";

		for (let i = 0; i < 18; i++) {
			let li = document.createElement('li'),
				div = document.createElement('div');
			li.className = 'field__card';
			div.className = 'card';
			document.getElementById('past').appendChild(li).appendChild(div);
		}
	});

})();