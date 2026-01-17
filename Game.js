import Board from "./Board.js";
import King from "./Pieces/King.js";
import Queen from "./Pieces/Queen.js";
import Rook from "./Pieces/Rook.js";
import Knight from "./Pieces/Knight.js";
import Bishop from "./Pieces/Bishop.js";
import Pawn from "./Pieces/Pawn.js";
import Piece from "./Pieces/Piece.js";

// Turn Manager
const gameState = {
    IDLE: 'IDLE',
    SELECTING_PIECE: 'SELECTING_PIECE',
    SELECTING_MOVE: 'SELECTING_MOVE',
    PAUSED: 'PAUSED',
    GMAE_OVER: 'GMAE_OVER',
}

export default class Game {

    constructor() {
        this.board = new Board();
        this.state = gameState.SELECTING_PIECE;
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.validMovesForSelected = [];

        this.initializeBoard();
    }

    initializeBoard() {
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
            for (let i = 0; i < 8; i++) {
                this.board.setPiece(row, i, new Pawn(color));
            }
        }

        //for White
        placeBackRank('white', 7);
        placePawns('white', 6)

        //for Black 
        placeBackRank('black', 0);
        placePawns('black', 1)
    }

    //////////////////////////////////////////////

    handleSquareClick(row, col) {
        if (this.state == gameState.SELECTING_PIECE) {
            this.handleSelection(row, col);
        } else if (this.state = gameState.SELECTING_MOVE) {
            this.handleMove(row, col);
        }
    }

    handleSelection(row, col) {
        const piece = this.board.getPiece(row, col);
        if (piece && piece.color == this.currentPlayer) {
            this.selectedSquare = { row, col };
            this.state = gameState.SELECTING_MOVE;
            console.log(`Selected ${piece.constructor.name} at ${row},${col}. Now pick a destination.`);
        } else {
            console.log("Empty square or wrong color!");
        }
    }

    handleMove(row, col) {
        const selectedPiece = this.board.getPiece(this.selectedSquare.row, this.selectedSquare.col);
        const selectedPosition = this.board.getPiece(row, col)
        
        const moves = selectedPiece.getPotentialMoves(this.selectedSquare.row, this.selectedSquare.col, this.board);
        const isMoveLegal = moves.some(move => move[0] === row && move[1] === col);        
        console.log(`Potential moves for ${selectedPiece.constructor.name}:`, moves);

        if(!isMoveLegal){
            console.log("Move pattern is not legal!");
            return
        }

        if (selectedPosition && selectedPosition.color == this.currentPlayer) {
            console.log(`position ${row},${col} is allready taked by your ${selectedPosition.constructor.name}`);
        }

        this.board.setPiece(row, col, selectedPiece);
        this.board.setPiece(this.selectedSquare.row, this.selectedSquare.col, null);
        console.log(`Moved to ${row},${col}`);

        this.finalizeTurn();
    }

    finalizeTurn(){
        this.selectedSquare = null;
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        this.state = gameState.SELECTING_PIECE;
        this.validMovesForSelected = [];
    }

}
