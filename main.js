import Game from "./Game.js";

const game = new Game;

game.board.render();
game.handleSquareClick(1, 1);
game.board.render();
game.handleSquareClick(7, 0);
game.handleSquareClick(1, 0);
game.board.render();