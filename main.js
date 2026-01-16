import Game from "./Game.js";

const game = new Game;

game.board.render();
game.handleSquareClick(7, 1);
game.handleSquareClick(5, 0);
game.board.render();
game.handleSquareClick(0, 1);
game.handleSquareClick(2, 2);
game.board.render();
game.handleSquareClick(5, 0);
game.handleSquareClick(3, 1);
game.board.render();