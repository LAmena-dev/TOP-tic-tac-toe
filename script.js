// script for tic-tac-toe project

const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const reset = () => board.fill("");

  return { getBoard, reset };
})();

function createPlayer(name, mark) {
  let score = 0;
  const getScore = () => score;
  const addScore = () => score++;

  return { name, mark, getScore, addScore };
}

const GameController = (() => {
  const cells = document.querySelectorAll(".cell");
  const turnText = document.querySelector("#turnText");

  const p1Button = document.querySelector("#p1Button");
  const player1Name = document.querySelector("#pName1");
  const player1Score = document.querySelector("#player1Score");

  const p2Button = document.querySelector("#p2Button");
  const player2Name = document.querySelector("#pName2");
  const player2Score = document.querySelector("#player2Score");
  const restartBtn = document.querySelector("#restartBtn");

  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");

  let currentPlayer = player1;
  let running = false;

  const winCondition = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // corners
    [0, 4, 8],
    [2, 4, 6],
  ];

  const startGame = () => {
    cells.forEach((cell) => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    p1Button.addEventListener("click", () => {
      player1.name = prompt("Enter Name:") || "Player 1";
      updateName();
    });
    p2Button.addEventListener("click", () => {
      player2.name = prompt("Enter Name:") || "Player 2";
      updateName();
    });
    turnText.textContent = `${currentPlayer.name}'s turn`;
    running = true;
  };

  function updateName() {
    player1Name.textContent = player1.name;
    player2Name.textContent = player2.name;
    turnText.textContent = `${currentPlayer.name}'s turn`;
  }

  function cellClicked() {
    const board = Gameboard.getBoard();
    const index = this.getAttribute("cellIndex");
    if (board[index] != "" || !running) return;
    if (p1Button.disabled != true || p2Button.disabled != true) {
      p1Button.disabled = true;
      p2Button.disabled = true;
    }

    updateCell(this, index);
    checkGameFlow();
    if (running) changePlayer();
  }

  function updateCell(cell, index) {
    const board = Gameboard.getBoard();
    board[index] = currentPlayer.mark;
    cell.textContent = currentPlayer.mark;
  }

  function changePlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    turnText.textContent = `${currentPlayer.name}'s turn`;
  }

  function restartGame() {
    Gameboard.reset();
    cells.forEach((cell) => (cell.textContent = ""));
    p1Button.disabled = false;
    p2Button.disabled = false;
    currentPlayer = player1;

    turnText.textContent = `${currentPlayer.name}'s turn`;
    running = true;
  }

  function checkWinner() {
    const board = Gameboard.getBoard();

    for (const [a, b, c] of winCondition) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  function updateScores() {
    player1Score.textContent = player1.getScore();
    player2Score.textContent = player2.getScore();
  }

  function checkGameFlow() {
    const winner = checkWinner();

    if (winner) {
      turnText.textContent = `${currentPlayer.name} wins!`;
      currentPlayer.addScore();
      updateScores();
      running = false;
    } else if (!Gameboard.getBoard().includes("")) {
      turnText.textContent = "Tie!";
      running = false;
    }
  }

  return { startGame };
})();

GameController.startGame();
