// prettier-ignore
const colorArr = ['A', 'B', 'C', 'D', 'E', 'F','0','1','2','3','4','5','6','7','8','9'];
const squareContainer = document.querySelector('.square-container');
const game = {
  level: 1,
  lives: 4,
  correctColor: ''
};

//creates n squares where n is: [4] if player is on level 1, otherwise n is: [4 + the current level].
function createSquares(squaresToCreate) {
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
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.background = color;
    square.addEventListener('click', winOrLose);
    squareContainer.appendChild(square);
  }
}

function clearSquares() {
  const allSquares = document.querySelectorAll('.square');
  for (let i = 0; i < allSquares.length; i++) {
    const square = allSquares[i];
    square.remove();
  }
}
//returns a random hexcolor.
function generateRandomColor() {
  const arrSize = colorArr.length;
  let color = '#';
  for (let i = 0; i < 6; i++) {
    const randomInt = Math.floor(Math.random() * arrSize);
    color += colorArr[randomInt];
  }
  return color;
}

//Finds and sets the correct color for each level.
function setCorrectColor() {
  const squares = document.querySelectorAll('.square');
  const randomVal = Math.floor(Math.random() * squares.length);
  game.correctColor = getFullHexColor(squares[randomVal].style.background);
  const colorHeader = document.querySelector('.curr-Color');
  colorHeader.textContent = game.correctColor;
}

//Converts a single number to its hex-equivalent.

function rgbToHex(rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
}

//passes in values to rgbToHex to obtain a full hexcolor string.
function getFullHexColor(s) {
  const rgbSubStr = s.substring(4, s.length - 1);
  const rgbColors = rgbSubStr.split(',');
  const red = rgbToHex(rgbColors[0]);
  const green = rgbToHex(rgbColors[1]);
  const blue = rgbToHex(rgbColors[2]);
  const result = '#' + red + green + blue;
  return result.toUpperCase();
}

//decides whether square clicked was correct or not & checks to see if player lost the game.
function winOrLose(e) {
  const square = e.target;
  const squareColor = getFullHexColor(square.style.background);
  const livesText = document.querySelector('#lives');
  //clicked correct square
  if (squareColor === game.correctColor) {
    game.level++;
    clearSquares();
    createSquares(4 + game.level);
    setCorrectColor();
  } else {
    game.lives--;
    //if player loses
    if (game.lives === 0) {
      const btn = document.createElement('button');
      btn.classList.add('play-again-btn');
      btn.textContent = 'Play Again!';
      btn.addEventListener('click', startGame);
      const main = document.querySelector('main');
      main.appendChild(btn);
    }
    square.remove();
    livesText.textContent = `Lives Remaining: ${game.lives} `;
  }
}

//initializes the game
function startGame() {
  const btn = document.querySelector('.play-again-btn');
  if (btn) {
    btn.remove();
  }
  game.lives = 4;
  game.level = 1;
  clearSquares();
  const livesText = document.querySelector('#lives');
  createSquares(4);
  setCorrectColor();
  livesText.textContent = `Lives Remaining: ${game.lives} `;
}

startGame();
