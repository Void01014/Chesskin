import Board from "./Board.js";
import King from "./Pieces/King.js";
import Queen from "./Pieces/Queen.js";
import Rook from "./Pieces/Rook.js";
import Knight from "./Pieces/Knight.js";
import Bishop from "./Pieces/Bishop.js";
import Pawn from "./Pieces/Pawn.js";

const gameState = {
    IDLE: 'IDLE',
    SELECTING_PIECE: 'SELECTING_PIECE',
    SELECTING_MOVE: 'SELECTING_MOVE',
    PAUSED: 'PAUSED',
    GMAE_OVER: 'GMAE_OVER',
}

export default class Game {

    constructor() {
        this.board = new Board(this);
        this.state = gameState.SELECTING_PIECE;
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.validMovesForSelected = [];
        this.PotentialCheckMoves = [];
        this.kingPositions = {
            white: { r: null, c: null },
            black: { r: null, c: null }
        };
        this.is_check = false;

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
        placePawns('white', 6);

        //for Black 
        placeBackRank('black', 0);
        placePawns('black', 1);
    }

    //////////////////////////////////////////////

    handleSquareClick(row, col) {
        // this.getPotentialCheckMoves();
        this.kingPositions.white = this.getKingPosition('white');
        this.kingPositions.black = this.getKingPosition('black');

        if (this.state == gameState.SELECTING_PIECE) {
            this.handleSelection(row, col);
        } else if (this.state == gameState.SELECTING_MOVE) {
            this.handleMove(row, col);
        }
    }

    handleSelection(row, col) {
        const piece = this.board.getPiece(row, col);
        if (piece && piece.color == this.currentPlayer) {
            this.selectedSquare = { row, col };
            this.state = gameState.SELECTING_MOVE;
            const selectedPiece = this.board.getPiece(this.selectedSquare.row, this.selectedSquare.col);

            this.validMovesForSelected = selectedPiece.getPotentialMoves(this.selectedSquare.row, this.selectedSquare.col, this.board);

            this.board.RenderMoves(this.validMovesForSelected)
            console.log(`Selected ${piece.constructor.name} at ${row},${col}. Now pick a destination.`);
        } else {
            console.log("Empty square or wrong color!");
        }
    }

    handleMove(row, col) {
        const selectedPosition = this.board.getPiece(row, col)
        const selectedPiece = this.board.getPiece(this.selectedSquare.row, this.selectedSquare.col);

        const isMoveLegal = this.validMovesForSelected.some(move => move[0] === row && move[1] === col);
        console.log(`Potential moves for ${selectedPiece.constructor.name}:`, this.validMovesForSelected);

        if (!isMoveLegal) {
            console.log("Move pattern is not legal!, please try again");
            this.finalizeTurn(true);
            return
        }

        if (selectedPosition && selectedPosition.color == this.currentPlayer) {
            console.log(`position ${row},${col} is already taked by your ${selectedPosition.constructor.name}`);
            this.finalizeTurn(true);
            return;
        }

        this.board.setPiece(row, col, selectedPiece);
        this.board.setPiece(this.selectedSquare.row, this.selectedSquare.col, null);
        if (selectedPiece.xtraMove !== undefined) {
            selectedPiece.xtraMove = 0;
        }
        console.log(`Moved to ${row},${col}`);

        const opponentColor = this.currentPlayer === 'white' ? 'black' : 'white';
        const enemyKing = this.kingPositions[opponentColor];

        if (this.isCheck(enemyKing)) {
            alert("it's a check!");
            const enemyKingelem = document.querySelector(`[data-row='${enemyKing[0]}'][data-col='${enemyKing[1]}']`)
            enemyKingelem.style.background = 'red';
        }

        this.finalizeTurn(false);
    }

    ///////////////////////////////////

    getKingPosition(color) {
        let kingPosition = [];

        this.board.grid.forEach((row, r) => {
            row.forEach((position, c) => {
                if (position && position.constructor.name === 'King' && position.color == color) {
                    kingPosition = [r, c];
                }
            });
        });
        return kingPosition;
    }

    getPotentialCheckMoves() {
        this.board.grid.forEach((row, crow) => {
            row.forEach((position, ccol) => {
                if (position) {
                    const piece = this.board.getPiece(crow, ccol);
                    this.PotentialCheckMoves.push(...piece.getPotentialMoves(crow, ccol, this.board))
                }
            });
        });
    }

    //////////////////////////////////

    isCheck(enemyKing) {
        this.getPotentialCheckMoves();

        return this.is_check = this.PotentialCheckMoves.some(move => move[0] === enemyKing[0]
            && move[1] === enemyKing[1]);
    }

    ////////////////////////////////////

    finalizeTurn(retry) {
        this.selectedSquare = null;
        if (!retry) {
            this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        }
        this.state = gameState.SELECTING_PIECE;
        this.validMovesForSelected = [];
        this.board.RenderMoves([]);
        // this.PotentialCheckMoves = [];
    }

}
