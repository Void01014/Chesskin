import Game from "./Game.js";

const game = new Game;

const board = document.getElementById("board");
const promotionModal = document.getElementById('promotionModal');

game.board.fillBoard();
game.board.Render();


board.addEventListener('click', (event) => {
    promotionModal.classList.add('hidden');
});

// game.board.renderConsole();
// game.handleSquareClick(6, 2);
// game.handleSquareClick(4, 2);
// game.board.renderConsole();
// game.handleSquareClick(1, 3);
// game.handleSquareClick(3, 3);
// game.board.renderConsole();
// game.handleSquareClick(4, 2);
// game.handleSquareClick(3, 3);
// game.board.renderConsole();
// game.handleSquareClick(6, 1);
// game.handleSquareClick(4, 1);
// game.board.renderConsole();
// game.handleSquareClick(6, 1);
// game.handleSquareClick(4, 1);
// game.board.renderConsole();
