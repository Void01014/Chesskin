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
        this.enPassantTarget = null;
        this.castling = {
            white: ['Q', 'K'],
            black: ['q', 'k']
        }

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
        const otherColor = this.currentPlayer === 'white' ? 'black' : 'white';

        if (piece && piece.color == this.currentPlayer) {
            this.selectedSquare = { row, col };
            this.state = gameState.SELECTING_MOVE;
            const selectedPiece = this.board.getPiece(this.selectedSquare.row, this.selectedSquare.col);

            if (selectedPiece.constructor.name === "King") {
                this.getPotentialCheckMoves(otherColor);
            }

            const moveContext = {
                board: this.board,
                row: this.selectedSquare.row ?? null,
                col: this.selectedSquare.col ?? null,
                withVertical: true,
                PotentialCheckMoves: this.PotentialCheckMoves,   /////special for the king
                enPassantTarget: this.enPassantTarget,           /////special for the pawn
                castling: this.castling                          /////special for King/Rook
            }

            this.validMovesForSelected = selectedPiece.getPotentialMoves(moveContext);

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
            //Logic for En Passant
            if (selectedPiece.constructor.name === 'Pawn') {
                if (this.enPassantTarget) {
                    const enPassantRow = this.enPassantTarget[0];
                    const enPassantCol = this.enPassantTarget[1];

                    if ((enPassantRow === row + 1 || enPassantRow === row - 1) && enPassantCol === col) {
                        this.board.setPiece(enPassantRow, enPassantCol, null)
                    }
                }

                const diff = Math.abs(this.selectedSquare.row - row);
                if (diff > 1) {
                    this.enPassantTarget = [row, col];
                } else {
                    this.enPassantTarget = null;
                }
            }
            if (selectedPiece.xtraMove !== undefined) {
                selectedPiece.xtraMove = 0;
            }

            //Logic for castling
            if (selectedPiece.constructor.name === 'King') {
                this.castling[selectedPiece.color] = []
            } else if (selectedPiece.constructor.name === 'Rook') {
                const kingCol = this.kingPositions[selectedPiece.color][1]; // Get the COL index
                const rookCol = this.selectedSquare.col;

                if (rookCol < kingCol) {
                    const targetColor = selectedPiece.color === 'white' ? 'Q' : 'q';
                    this.castling[selectedPiece.color] = this.castling[selectedPiece.color].filter(color => color != targetColor);
                } else {
                    const targetColor = selectedPiece.color === 'white' ? 'K' : 'k';
                    this.castling[selectedPiece.color] = this.castling[selectedPiece.color].filter(color => color != targetColor);
                }
            }

            ///////////////////////////

            // console.log(`Moved to ${row},${col}`);
            if (this.isCheck(this.currentPlayer)) {
                const kingPos = this.kingPositions[opponentColor];

                // console.log("Check detected on:", opponentColor, kingPos);
                const enemyKingElem = document.querySelector(`.square[data-row="${kingPos.r}"][data-col="${kingPos.c}"]`);

                if (enemyKingElem) {
                    enemyKingElem.style.backgroundColor = 'red';
                }
                // this.getPotentialCheckMoves(this.currentPlayer);
                // const otherKing = this.board.getPiece(kingPos.r, kingPos.c);
                // const kingMoves = otherKing.getPotentialMoves(kingPos.r, kingPos.c, this.board, this.PotentialCheckMoves, true)
                // console.log('king moves:');

                // console.log(kingMoves)
                // if (kingMoves.empty){
                //     alert('checkmate')
                // }
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
                    kingPosition.r = r;
                    kingPosition.c = c;
                }
            });
        });
        return kingPosition;
    }

    getPotentialCheckMoves(color) {
        this.PotentialCheckMoves = [];
        this.board.grid.forEach((row, crow) => {
            row.forEach((position, ccol) => {
                if (position && position.color == color) {
                    const piece = this.board.getPiece(crow, ccol);
                    const moveContext = {
                        board: this.board,
                        row: crow,
                        col: ccol,
                        withVertical: false,
                        PotentialCheckMoves: [],                         /////special for the king
                        enPassantTarget: this.enPassantTarget,           /////special for the pawn
                        castling: this.castling                          /////special for King/Rook
                    }
                    this.PotentialCheckMoves.push(...piece.getPotentialMoves(moveContext))
                }
            });
        });
        return this.PotentialCheckMoves;
    }

    // generateFEN(grid) {
    //     let FEN = "";
    //     let emptyCount = 0;

    //     grid.forEach((row, i) => {
    //         row.forEach((square, j) => {
    //             if(!square){
    //                 emptyCount++;
    //             }else{
    //                 if(emptyCount > 0){
    //                     FEN.push(`${emptyCount}`);
    //                 }else{
    //                     FEN.push(square.constructor.name[0].toLowerCase());
    //                 }
    //             }
    //         })
    //         emptyCount = 0;
    //         FEN.push('/');
    //     })
    // }

    //////////////////////////////////

    isCheck(color) {
        const otherColor = color === 'white' ? 'black' : 'white';

        this.getPotentialCheckMoves(color);
        return this.PotentialCheckMoves.some(move =>
            move[0] === this.kingPositions[otherColor].r &&
            move[1] === this.kingPositions[otherColor].c
        );
    }

    sandboxValidation(originalRow, originalCol, desiredRow, desiredCol, piece) {
        const opponentColor = this.currentPlayer === 'white' ? 'black' : 'white';
        const originalOccupant = this.board.getPiece(desiredRow, desiredCol);
        const isKing = piece.constructor.name === 'King';

        if (isKing) {
            this.board.setPiece(desiredRow, desiredCol, piece);
            this.board.setPiece(originalRow, originalCol, null);
            this.kingPositions[this.currentPlayer] = { r: desiredRow, c: desiredCol };
        } else {
            this.board.setPiece(desiredRow, desiredCol, piece);
            this.board.setPiece(originalRow, originalCol, null);
        }

        const stillInCheck = this.isCheck(opponentColor);

        if (stillInCheck) {
            alert()
            if (isKing) {
                this.board.setPiece(originalRow, originalCol, piece);
                this.board.setPiece(desiredRow, desiredCol, originalOccupant);
                this.kingPositions[this.currentPlayer] = { r: originalRow, c: originalCol };
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
