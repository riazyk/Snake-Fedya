const snakeLength = 28;
let snakeBody = [];
let targetQuantity = 10;
let targets = [];
let snakeBodyItemWidth = 20;
let vertical = 20;
let next = 0;
let point = 0;
let animation;
let interval = 70;
let gameArea = document.getElementById('gameArea');
let gameOver = document.querySelector('.gameOver');
let points = document.querySelector('.points');

function initialSnakeState() {
	for (let i = 0; i < snakeLength; i++) {
		snakeBody[i] = document.createElement('div');
		snakeBody[i].className = "snakeBodyElement";
		snakeBody[i].style.top = 20 + 'px';
		snakeBody[i].style.left = i * snakeBodyItemWidth + 'px';
  // snakeBody[i].innerHTML = [i];
  gameArea.appendChild(snakeBody[i]);
};

snakeBody.forEach(function(item, t) {
	if(item.style.top === "0px") {
	}
});

points.innerHTML = 0;
point = 0;
}

initialSnakeState();

// let lastChild = document.body.children[0].lastElementChild;
let horizontal = snakeBodyItemWidth * (snakeBody.length - 1);
let rightDirection = " ";
let wrongDirection = " ";


function getRandomInt(min, max) {
	let temp = (Math.floor(Math.random() * (max - min + 1)) + min);
	return (Math.floor(temp/20)*20);
}


function initialTragetState() {
	for (let i = 0; i < targetQuantity; i++) {
		let targetTop = getRandomInt(40, 560);
		let targetLeft = getRandomInt(40, 560);
		targets[i] = document.createElement('div');
		targets[i].className = "targets";
		targets[i].style.top = targetTop + 'px';
		targets[i].style.left = targetLeft + 'px';
		// targets[i].innerHTML = i;
		gameArea.appendChild(targets[i]);
	}
};


initialTragetState()

document.onkeydown = function(event) {

	let everyItem = snakeBody.every(function(it){
		return  it.style.top === "0px";
	});


	switch (event.key) {
		case 'ArrowDown':
		if (wrongDirection !== 'ArrowDown') {
			rightDirection = 'ArrowDown';
			wrongDirection = 'ArrowUp';
		};
		break;
		case 'ArrowUp':
		if (wrongDirection !== 'ArrowUp') {
			rightDirection = 'ArrowUp';
			wrongDirection = 'ArrowDown';
		};
		break;
		case 'ArrowLeft':
		if (wrongDirection !== 'ArrowLeft') {
			rightDirection = 'ArrowLeft';
			wrongDirection = 'ArrowRight';
		};
		break;
		case 'ArrowRight':
		if (wrongDirection !== 'ArrowRight') {
			rightDirection = 'ArrowRight';
			wrongDirection = 'ArrowLeft';
		};
		break;
	}

	switch (rightDirection) {
		case 'ArrowUp':
		clearInterval(animation);
		animation = setInterval(function() {
			vertical -= snakeBodyItemWidth;
			moveSnakeBody();
			snakeBody[snakeBody.length - 1].style.top = vertical + 'px';
			if ( vertical < 0 ) {
				clearInterval(animation);
				eliminateSnake();
				eliminateTargets();
				vertical=20;
				horizontal = snakeBodyItemWidth * (snakeBody.length - 1);
				next = 0;
				initialSnakeState();
				alert("GAME OVER");
				initialTragetState();
				rightDirection = " ";
				wrongDirection = " ";
       // gameOver.classList.add('visible');
     };
     selfTouch();
     targetsTouch();
   }, interval);
		break;
		case 'ArrowDown':
		clearInterval(animation);
		animation = setInterval(function() {
			vertical += snakeBodyItemWidth;
			moveSnakeBody();
			snakeBody[snakeBody.length - 1].style.top = vertical + 'px';
			if (vertical > 580) {
				clearInterval(animation);
				eliminateSnake();
				eliminateTargets();
				vertical = 20;
				horizontal = snakeBodyItemWidth * (snakeBody.length - 1);
				initialSnakeState();
				next = 0;
				alert("GAME OVER");
				initialTragetState();
				rightDirection = " ";
				wrongDirection = " ";
			}
			selfTouch();
			targetsTouch()
		}, interval);
		break;

		case 'ArrowRight':
		clearInterval(animation);
		animation = setInterval(function() {
			horizontal += snakeBodyItemWidth;
			moveSnakeBody();
			snakeBody[snakeBody.length - 1].style.left = horizontal + 'px';
			if (horizontal === 600) {
				clearInterval(animation);
				eliminateSnake();
				eliminateTargets();
				vertical=20;
				horizontal = snakeBodyItemWidth * (snakeBody.length - 1);
				initialSnakeState();
				next = 0;
				alert("GAME OVER");
				initialTragetState();
				rightDirection = " ";
				wrongDirection = " ";
        // gameOver.classList.add('visible');
      };
      selfTouch();
      targetsTouch()
    }, interval);
		break;
		case 'ArrowLeft':
		clearInterval(animation);
		animation = setInterval(function() {
			horizontal -= snakeBodyItemWidth;
			moveSnakeBody();
			snakeBody[snakeBody.length - 1].style.left = horizontal + 'px';
			if (horizontal < 0) {
				clearInterval(animation);
				eliminateSnake();
				eliminateTargets();
				vertical=20;
				horizontal = snakeBodyItemWidth * (snakeBody.length - 1);
				initialSnakeState();
				next = 0;
				alert("GAME OVER");
				initialTragetState();
				rightDirection = " ";
				wrongDirection = " ";
       // gameOver.classList.add('visible');
     };
     selfTouch();
     targetsTouch()
   }, interval);
		break;
	};
};

// var color = ['red','blue','green','yellow','pink','red','blue','green','yellow','pink','red','blue','green','yellow','pink','red','blue','green','yellow','pink','red','blue','green','yellow','pink',];
function moveSnakeBody() {
	if (next > snakeBody.length - 2) {
		next = 0;
	}
	snakeBody[next].style.left = snakeBody[snakeBody.length - 1].style.left;
	snakeBody[next].style.top = snakeBody[snakeBody.length - 1].style.top;
	next++;
// for (let i = 0; i < snakeBody.length - 2; i++) {
//   snakeBody[i].style.backgroundColor = color[i];

// }
// trigger = false;
}

function selfTouch() {
	for (let i = 0; i < snakeBody.length - 2; i++) {
		if (snakeBody[i].style.left === snakeBody[snakeBody.length - 1].style.left && snakeBody[i].style.top === snakeBody[snakeBody.length - 1].style.top) {
			clearInterval(animation);
			eliminateSnake();
			eliminateTargets();
			vertical=20;
			horizontal = snakeBodyItemWidth * (snakeBody.length - 1);
			initialSnakeState();
			next = 0;
			alert("GAME OVER");
			initialTragetState();
		}
	}
}

function targetsTouch() {
	for (let i = 0; i < targets.length; i++) {
		if (targets[i].style.left === snakeBody[snakeBody.length - 1].style.left && targets[i].style.top === snakeBody[snakeBody.length - 1].style.top) {
			gameArea.removeChild(targets[i]);
			point++;
			points.innerHTML = point;
			if (point === 10) {
				clearInterval(animation);
				eliminateSnake();
				eliminateTargets();
				vertical=20;
				horizontal = snakeBodyItemWidth * (snakeBody.length - 1);
				initialSnakeState();
				next = 0;
				alert('YOU WIN');
				initialTragetState();
			}
      // targets.pop(i);
      // console.log(points);
      // clearInterval(animation);
      // gameOver.classList.add('visible');
      // eliminateSnake();

    }
  }
}


function eliminateSnake() {
	if(gameArea.children[1].classList.contains('snakeBodyElement')) {
		for (let i = 0; i < snakeBody.length; i++) {
			gameArea.removeChild(snakeBody[i]);
		}

	}
  // trigger = true;
}



function eliminateTargets() {	
	let gameAreaChildrens = gameArea.children;
	let targets = document.querySelectorAll(".targets");
	for (let i = 0; i < targets.length; i++) {

		gameArea.removeChild(targets[i]);

	}
}

