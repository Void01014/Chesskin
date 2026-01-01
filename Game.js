import Board from "./Board";
import King from "./Pieces/King";
import Queen from "./Pieces/Queen";
import Rook from "./Pieces/Rook";
import Knight from "./Pieces/Knight";
import Bishop from "./Pieces/Bishop";
import Pawn from "./Pieces/Pawn";


class Game{
    constructor(){
        this.board = new Board();
        this.initializeBoard();
    }    

    initializeBoard(){
        const placeBackRank = (color, row) => {
            this.board.setPiece(row, 0, new Rook(color));
            this.board.setPiece(row, 7, new Rook(color));
            this.board.setPiece(row, 1, new Knight(color));
            this.board.setPiece(row, 6, new Knight(color));
            this.board.setPiece(row, 2, new Bishop(color));
            this.board.setPiece(row, 5, new Bishop(color));
            this.board.setPiece(row, 3, new Queen(color));
            this.board.setPiece(row, 4, new King(color));
        };

        const placePawns = (color, row) => {
            for (let i = 0; i < 8; i++){
                this.board.setPiece(row, i, new Pawn(color));
            }
        }

    }
}
