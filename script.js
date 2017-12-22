let snakeLength = 28;
let snakeBody = [];
let targetQuantity = 7;
let targets = [];
let snakeBodyItemWidth = 20;
let vertical = 0;
let next = 0;
let points = 0;
let animation;
let interval = 100;
let gameArea = document.getElementById('gameArea');
let gameOver = document.querySelector('.gameOver');


for (let i = 0; i < snakeLength; i++) {
  snakeBody[i] = document.createElement('div');
  snakeBody[i].className = "snakeBodyElement";
  snakeBody[i].style.top = 0 + 'px';
  // snakeBody[i].innerHTML = [i];
  gameArea.appendChild(snakeBody[i]);
  snakeBody[i].style.left = i * snakeBodyItemWidth + 'px';
}


let lastChild = document.body.children[0].lastElementChild;
let horizontal = snakeBodyItemWidth * (snakeBody.length - 1);

let rightDirection = " ";
let wrongDirection = " ";



function getRandomInt(min, max) {
  let temp = (Math.floor(Math.random() * (max - min + 1)) + min);
  return (Math.floor(temp/20)*20);
}

// function round(n, f) {
//     f = Math.pow(10, -f);
//     return (Math.round(n / f) * f);
// }


for (let i = 0; i < targetQuantity; i++) {
  let targetTop = getRandomInt(40, 560);
  let targetLeft = getRandomInt(40, 560);
  targets[i] = document.createElement('div');
  targets[i].className = "targets";
  targets[i].style.top = targetTop + 'px';
  targets[i].style.left = targetLeft + 'px';
  gameArea.appendChild(targets[i]);
}











document.onkeydown = function(event) {

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
    case 'ArrowDown':
    clearInterval(animation);
    animation = setInterval(function() {
      vertical += snakeBodyItemWidth;
      if (vertical > 580) {
        clearInterval(animation);
        eliminateSnake()
        gameOver.classList.add('visible');
      }
      moveSnakeBody();
      snakeBody[snakeBody.length - 1].style.top = vertical + 'px';
      selfTouch();
      targetsTouch()
    }, interval);
    break;
    case 'ArrowRight':
    clearInterval(animation);
    animation = setInterval(function() {
      horizontal += snakeBodyItemWidth;
      if (horizontal === 600) {
        clearInterval(animation);
        eliminateSnake()
        gameOver.classList.add('visible');
      };
      moveSnakeBody();
      snakeBody[snakeBody.length - 1].style.left = horizontal + 'px';
      selfTouch();
      targetsTouch()
    }, interval);
    break;
    case 'ArrowUp':
    clearInterval(animation);
    animation = setInterval(function() {
     vertical -= snakeBodyItemWidth;
     if (vertical < 0) {
       gameOver.classList.add('visible');
       clearInterval(animation);
       eliminateSnake();
     };
     moveSnakeBody();
     snakeBody[snakeBody.length - 1].style.top = vertical + 'px';
     selfTouch();
     targetsTouch()
   }, interval);
    break;
    case 'ArrowLeft':
    clearInterval(animation);
    animation = setInterval(function() {
      horizontal -= snakeBodyItemWidth;
      if (horizontal < 0) {
       clearInterval(animation);
       eliminateSnake()
       gameOver.classList.add('visible');
     };
     moveSnakeBody();
     snakeBody[snakeBody.length - 1].style.left = horizontal + 'px';
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
}

function selfTouch() {
  for (let i = 0; i < snakeBody.length - 2; i++) {
    if (snakeBody[i].style.left === snakeBody[snakeBody.length - 1].style.left && snakeBody[i].style.top === snakeBody[snakeBody.length - 1].style.top) {
      clearInterval(animation);
      gameOver.classList.add('visible');
      eliminateSnake();
    }
  }
}

function targetsTouch() {
  for (let i = 0; i < targets.length; i++) {
    if (targets[i].style.left === snakeBody[snakeBody.length - 1].style.left && targets[i].style.top === snakeBody[snakeBody.length - 1].style.top) {
      points++;
      targets[i].style.backgroundColor = "black";
      gameArea.removeChild(targets[i]);
      console.log(points);
      // clearInterval(animation);
      // gameOver.classList.add('visible');
      // eliminateSnake();
    
    }
  }
}




function eliminateSnake() {
  console.log(gameArea.childNodes);
  if(gameArea.children) {
    for (let i = 0; i < snakeBody.length; i++) {
      gameArea.removeChild(snakeBody[i]);
    }
  }
}

