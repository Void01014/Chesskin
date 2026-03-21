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

        this.kingPositions.white = this.getKingPosition('white');
        this.kingPositions.black = this.getKingPosition('black');
    }

    //////////////////////////////////////////////

    handleSquareClick(row, col) {
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
            this.getPotentialCheckMoves(this.currentPlayer);
            this.validMovesForSelected = selectedPiece.getPotentialMoves(this.selectedSquare.row, this.selectedSquare.col, this.board, this.PotentialCheckMoves);

            this.board.RenderMoves(this.validMovesForSelected)
        } else {
            // console.log("Empty square or wrong color!");
        }
    }

    handleMove(row, col) {
        const opponentColor = this.currentPlayer === 'white' ? 'black' : 'white';
        const selectedPosition = this.board.getPiece(row, col)
        const selectedPiece = this.board.getPiece(this.selectedSquare.row, this.selectedSquare.col);

        const isMoveLegal = this.validMovesForSelected.some(move => move[0] === row && move[1] === col);
        // console.log(`Potential moves for ${selectedPiece.constructor.name}:`, this.validMovesForSelected);

        if (!isMoveLegal) {
            // console.log("Move pattern is not legal!, please try again");
            this.finalizeTurn(true);
            return
        }

        if (selectedPosition && selectedPosition.color == this.currentPlayer) {
            // console.log(`position ${row},${col} is already taked by your ${selectedPosition.constructor.name}`);
            this.finalizeTurn(true);
            return;
        }


        if (this.sandboxValidation(this.selectedSquare.row, this.selectedSquare.col, row, col, selectedPiece)) {
            if (selectedPiece.xtraMove !== undefined) {
                selectedPiece.xtraMove = 0;
            }
            // console.log(`Moved to ${row},${col}`);
            if (this.isCheck(this.currentPlayer)) {
                const kingPos = this.kingPositions[opponentColor];

                // console.log("Check detected on:", opponentColor, kingPos);
                const enemyKingElem = document.querySelector(`.square[data-row="${kingPos[0]}"][data-col="${kingPos[1]}"]`);

                if (enemyKingElem) {
                    enemyKingElem.style.backgroundColor = 'red';
                }
            }
            this.finalizeTurn(false);
        } else {
            this.finalizeTurn(true);
        }
    }

    ///////////////////////////////////

    getKingPosition(color) {
        let kingPosition = [];

        this.board.grid.forEach((row, r) => {
            row.forEach((position, c) => {
                if (position && position.constructor.name === 'King' && position.color == color) {
                    kingPosition[0] = r;
                    kingPosition[1] = c;
                }
            });
        });
        return kingPosition;
    }

    getPotentialCheckMoves(color) {
        this.board.grid.forEach((row, crow) => {
            row.forEach((position, ccol) => {
                if (position && position.color == color) {
                    const piece = this.board.getPiece(crow, ccol);
                    this.PotentialCheckMoves.push(...piece.getPotentialMoves(crow, ccol, this.board))
                }
            });
        });
        return this.PotentialCheckMoves;
    }

    //////////////////////////////////

    isCheck(color) {
        const otherColor = color === 'white' ? 'black' : 'white';

        this.getPotentialCheckMoves(color);
        return this.PotentialCheckMoves.some(move =>
            move[0] === this.kingPositions[otherColor][0] &&
            move[1] === this.kingPositions[otherColor][1]
        );
    }

    sandboxValidation(originalRow, originalCol, desiredRow, desiredCol, piece) {
        const opponentColor = this.currentPlayer === 'white' ? 'black' : 'white';

        const originalOccupant = this.board.getPiece(desiredRow, desiredCol);

        const isKing = piece.constructor.name === 'King';
        if (isKing) {
            this.kingPositions[this.currentPlayer][0] = desiredRow;
            this.kingPositions[this.currentPlayer][1] = desiredCol;
        } else {
            this.board.setPiece(desiredRow, desiredCol, piece);
            this.board.setPiece(originalRow, originalCol, null);
        }

        const stillInCheck = this.isCheck(opponentColor);

        if (stillInCheck) {
            if (isKing) {
                this.kingPositions[this.currentPlayer][0] = originalRow;
                this.kingPositions[this.currentPlayer][1] = originalCol;
            } else {
                this.board.setPiece(originalRow, originalCol, piece);
                this.board.setPiece(desiredRow, desiredCol, originalOccupant);
            }

            return false;
        }
        return true;
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
        this.kingPositions.white = this.getKingPosition('white');
        this.kingPositions.black = this.getKingPosition('black');
        this.PotentialCheckMoves = [];
    }

}
