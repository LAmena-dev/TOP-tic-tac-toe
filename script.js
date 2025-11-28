// script for tic-tac-toe project

function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = {};

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push([]);
    }
  }

  board[0][0].push("x");
  board[0][1].push("x");
  board[0][2].push("x");
  board[1][0].push("x");
  board[1][1].push("x");
  board[1][2].push("x");
  board[2][0].push("x");
  board[2][1].push("x");
  board[2][2].push("x");

  return { board };
}

function createPlayer(name) {
  const player = name;

  return { name, player };
}

function gameFlow() {
  return {};
}

console.log(Gameboard());
console.log(createPlayer("mario"));
