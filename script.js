// prettier-ignore
const colorArr = ['A', 'B', 'C', 'D', 'E', 'F','0','1','2','3','4','5','6','7','8','9'];
const squareContainer = document.querySelector('.square-container');
const gameObj = {
  level: 1,
  lives: 4,
  correctColor: ''
};

//creates n squares where n is: [4] if player is on level 1, otherwise n is: [4 + the current level].
function playGame() {
  const squaresToCreate = gameObj.level > 1 ? 4 + gameObj.level : 4;
  console.log(squaresToCreate);
  const colorSet = new Set();
  for (let i = 0; i < squaresToCreate; i++) {
    let color = generateRandomColor();
    if (!colorSet.has(color)) {
      colorSet.add(color);
    } else {
      while (true) {
        color = generateRandomColor();
        if (!colorSet.has(color)) {
          colorSet.add(color);
          break;
        }
      }
    }
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.background = color;
    squareContainer.appendChild(square);
  }
}

//returns a random hexcolor.
function generateRandomColor() {
  const arrSize = colorArr.length;
  let color = '#';
  for (let i = 0; i < 6; i++) {
    let randomInt = Math.floor(Math.random() * arrSize);
    color += colorArr[randomInt];
  }
  return color;
}

//Finds and sets the correct color for each level.
function setCorrectColor() {
  const numOfSquares = gameObj.level > 1 ? 4 + gameObj.level : 4;
  const squares = squareContainer.getElementsByTagName('*');
  // prettier-ignore
  gameObj.correctColor = fullHexColor(squares[Math.floor(Math.random() * squares.length)].style.background);
  let colorHeader = document.querySelector('.curr-Color');
  colorHeader.textContent = gameObj.correctColor;
}

//Converts a single number to its hex-equivalent.
var rgbToHex = function(rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
};

//passes in values to rgbToHex to obtain a full hexcolor string.
var fullHexColor = function(s) {
  s = s.substring(4, s.length - 1);
  const rgbColors = s.split(',');
  var red = rgbToHex(rgbColors[0]);
  var green = rgbToHex(rgbColors[1]);
  var blue = rgbToHex(rgbColors[2]);
  let result = '#' + red + green + blue;
  return result.toUpperCase();
};

playGame();
setCorrectColor();
console.log(gameObj.correctColor);
winOrLose();

function winOrLose() {
  const squares = document.querySelectorAll('.square');
  const livesText = document.querySelector('#lives');
  console.log(squares.length);
  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    square.addEventListener('click', function() {
      if (fullHexColor(square.style.background) === gameObj.correctColor) {
        gameObj.lives++;
        gameObj.level++;
        console.log(gameObj.level);
        // playGame();
        // setCorrectColor();
        // winOrLose();
        livesText.textContent = 'Lives Remaining:' + gameObj.lives;
      } else {
        gameObj.lives--;
        if (gameObj.lives <= 0) {
          let btn = document.createElement('button');
          btn.classList.add('play-again-btn');
          livesText.textContent = 'Tough! Better luck HEX time!';
          btn.textContent = 'Play Again';
          main.appendChild(btn);
        }
        livesText.textContent = 'Lives Remaining:' + ' ' + gameObj.lives;
      }
    });
  }
}
// const main = document.querySelector('main');
// main.appendChild(btn);
