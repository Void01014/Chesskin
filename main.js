import Game from "./Game.js";

const game = new Game;

game.board.render();
game.handleSquareClick(6, 2);
game.handleSquareClick(4, 2);
game.board.render();
game.handleSquareClick(1, 7);
game.handleSquareClick(2, 7);
game.board.render();
game.handleSquareClick(6, 1);
game.handleSquareClick(4, 1);
game.board.render();
