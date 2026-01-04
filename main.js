import Game from "./Game.js";

const game = new Game;

game.board.render();
game.handleSquareClick(7, 1);
game.handleSquareClick(5, 1);
game.board.render();