const winCondition = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], ['0', '3', '6'], ['1', '4', '7'], ['2', '5', '8'], ['2', '4', '6'], ['0', '4', '8']];
let playerOneScore = [];
let playerTwoScore = [];
let playerXTurn = true;
let playerOTurn = false;
let gameOver = false;
const message = document.querySelector(".message");
const board = document.querySelector(".main");
const pOne = document.getElementById("pOneScore");
const pTwo = document.getElementById("pTwoScore");
const sqId = ("1", "2", "3", "4", "5", "6", "7", "8");
let pOneScore = 0;
let pTwoScore = 0;
message.innerText = "Player 1 is X, Player 2 is O.  Begin by selecting your square."

//*----------------------------------------Player Win or Tie Checks--------------------------------------*//
const playerOneWin = () => {
  let match;
  for (let condition of winCondition) {
    match = 0;
    for (let score of playerOneScore) {
      if (condition.includes(score)) {
        match++;
        if (match === 3) {
          message.innerText = "Player 1 (X) wins!";
          pOneScore += 1;
          console.log(pOneScore)
          pOne.innerText = "Player 1: " + pOneScore
          gameOver = true;
          break;
        }
      }
    }
  }
}
const playerTwoWin = () => {
  let match;
  for (let condition of winCondition) {
    match = 0;
    for (let score of playerTwoScore) {
      if (condition.includes(score)) {
        match++;
        if (match === 3) {
          message.innerText = "Player 2 (O) wins!";
          pTwoScore += 1;
          pTwo.innerText = "Player 2: " + pTwoScore
          gameOver = true;
          break;
        }
      }
    }
  }
}
const checkTie = () => {
  if (playerOneScore.length + playerTwoScore.length === 9) {
    message.innerText = "It's a tie!";
  }
}
//*-----------------------------------------Main Game Logic--------------------------------------*//
// This grabs the ID of the div that is clicked on.  Need to use this ID to update player click arrays
board.addEventListener("click", function (e) {
  const selectedId = e.target.id;
  if (selectedId !== '') {
    // Player 1 (X) logic - Checks to see if game is over, if it's their turn, and that the div has not been clicked/selected yet
    if (!gameOver && playerXTurn && playerOneScore.indexOf(selectedId) === -1 && playerTwoScore.indexOf(selectedId) === -1) {
      playerOneScore.push(selectedId);
      playerOneScore.sort();
      document.getElementById(selectedId).innerText = "X";
      message.innerText = "Player 2, it's your turn!";
      // Checks for tie
      checkTie();
      // Executes win condition function
      playerOneWin();
      // Changes players turns
      playerXTurn = false;
      playerOTurn = true;
      // Player 2 (O) logic - Checks to see if game is over, if it's their turn, and that the div has not been clicked/selected yet  
    } else if (!gameOver && playerOTurn && playerOneScore.indexOf(selectedId) ===  -1 && playerTwoScore.indexOf(selectedId) === -1) {
      playerTwoScore.push(selectedId);
      playerTwoScore.sort();
      document.getElementById(selectedId).innerText = "O";
      message.innerText = "Player 1, it's your turn!";
      // Checks for tie
      checkTie();
      // Executes win condition function
      playerTwoWin();
      // Changes players turns
      playerOTurn = false;
      playerXTurn = true;
    }
  }
});

//*---------------------------------------------Reset Function------------------------------------*//
document.querySelector("button").addEventListener("click", () => {
  console.log("Reset button clicked");
  const squares = document.querySelectorAll(".square");
  for (let square of squares) {
    square.innerText = '';
  }
  playerOneScore = [];
  playerTwoScore = [];
  playerXTurn = true;
  playerOTurn = false;
  gameOver = false;
  message.innerText = "Player 1 is X, Player 2 is O.  Begin by selecting your square.";
});