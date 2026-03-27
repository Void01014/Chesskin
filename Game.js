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
            // this.board.setPiece(row, 1, new Knight(color));
            // this.board.setPiece(row, 6, new Knight(color));
            // this.board.setPiece(row, 2, new Bishop(color));
            // this.board.setPiece(row, 5, new Bishop(color));
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
        // placePawns('black', 1);

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
                this.getPotentialCheckMoves(otherColor, this.PotentialCheckMoves);
            }

            const moveContext = {
                board: this.board,
                row: this.selectedSquare.row ?? null,
                col: this.selectedSquare.col ?? null,
                withVertical: true,
                friendlyFire: false,
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


        if (this.sandboxValidation(this.selectedSquare.row, this.selectedSquare.col, row, col, selectedPiece, opponentColor, true)) {
            //Logic for En Passant
            if (selectedPiece.constructor.name === 'Pawn') {
                if (this.enPassantTarget) {
                    const enPassantRow = this.enPassantTarget[0];
                    const enPassantCol = this.enPassantTarget[1];
                    const dir = selectedPiece.color === 'white' ? 1 : -1;

                    if (enPassantRow === row + dir && enPassantCol === col) {
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
                if (col - this.selectedSquare.col > 1) {
                    const king_s_rook = this.board.getPiece(this.selectedSquare.row, 7);
                    this.board.setPiece(this.selectedSquare.row, 5, king_s_rook);
                    this.board.setPiece(this.selectedSquare.row, 7, null);
                } else if (col - this.selectedSquare.col < -1) {
                    const queen_s_rook = this.board.getPiece(this.selectedSquare.row, 0);
                    this.board.setPiece(this.selectedSquare.row, 3, queen_s_rook);
                    this.board.setPiece(this.selectedSquare.row, 0, null);
                }
            }

            if (selectedPiece.constructor.name === 'King') {
                this.castling[selectedPiece.color] = []
            } else if (selectedPiece.constructor.name === 'Rook') {
                const kingCol = this.kingPositions[selectedPiece.color].c;
                const rookCol = this.selectedSquare.col;

                if (rookCol < kingCol) {
                    const targetColor = selectedPiece.color === 'white' ? 'Q' : 'q';
                    this.castling[selectedPiece.color] = this.castling[selectedPiece.color].filter(color => color != targetColor);
                } else {
                    const targetColor = selectedPiece.color === 'white' ? 'K' : 'k';
                    this.castling[selectedPiece.color] = this.castling[selectedPiece.color].filter(color => color != targetColor);
                }
            }

            //Logic for promotion

            if (selectedPiece.constructor.name === 'Pawn') {
                const promotionRank = this.color === 'white' ? 0 : 7;

                if (row === promotionRank) {
                    alert()
                    this.promote(row, col)
                }
            }

            ///////////////////////////

            // console.log(`Moved to ${row},${col}`);
            const is_check = this.isCheck(this.currentPlayer);
            const enemy_have_legal_moves = this.everyPieceSandbox(this.board.grid, this.currentPlayer);

            if (is_check) {
                const kingPos = this.kingPositions[opponentColor];
                const enemyKingElem = document.querySelector(`.square[data-row="${kingPos.r}"][data-col="${kingPos.c}"]`);

                if (enemyKingElem) {
                    enemyKingElem.style.backgroundColor = 'red';
                }

            }

            // alert(enemy_have_legal_moves)

            if (!enemy_have_legal_moves) {
                this.getPotentialCheckMoves(this.currentPlayer);
                this.getPotentialCheckMoves(this.currentPlayer, this.PotentialCheckMoves);

                const op_kingRow = this.kingPositions[opponentColor].r;
                const op_kingCol = this.kingPositions[opponentColor].c;
                const op_king = this.board.getPiece(op_kingRow, op_kingCol);

                const moveContext = {
                    board: this.board,
                    row: op_kingRow,
                    col: op_kingCol,
                    withVertical: true,
                    friendlyFire: true,
                    PotentialCheckMoves: this.PotentialCheckMoves,   /////special for the king
                    enPassantTarget: this.enPassantTarget,           /////special for the pawn
                    castling: this.castling                          /////special for King/Rook
                }

                const kingMoves = op_king.getPotentialMoves(moveContext);

                if (is_check && kingMoves.length === 0) {
                    alert('checkmate');
                } else if (kingMoves.length === 0) {
                    alert('stalemate');
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
                    kingPosition.r = r;
                    kingPosition.c = c;
                }
            });
        });
        return kingPosition;
    }

    getPotentialCheckMoves(color, PotentialCheckMoves = []) {
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
                        friendlyFire: true,
                        PotentialCheckMoves: PotentialCheckMoves,        /////special for the king
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

    sandboxValidation(originalRow, originalCol, desiredRow, desiredCol, piece, color, withmove) {
        const originalOccupant = this.board.getPiece(desiredRow, desiredCol);
        const isKing = piece.constructor.name === 'King';
        const otherColor = color === 'white' ? 'black' : 'white';


        if (isKing) {
            this.board.setPiece(desiredRow, desiredCol, piece);
            this.board.setPiece(originalRow, originalCol, null);
            this.kingPositions[otherColor] = { r: desiredRow, c: desiredCol };
        } else {
            this.board.setPiece(desiredRow, desiredCol, piece);
            this.board.setPiece(originalRow, originalCol, null);
        }

        const stillInCheck = this.isCheck(color);

        if (stillInCheck || !withmove) {
            if (isKing) {
                this.board.setPiece(originalRow, originalCol, piece);
                this.board.setPiece(desiredRow, desiredCol, originalOccupant);
                this.kingPositions[otherColor] = { r: originalRow, c: originalCol };
            } else {
                this.board.setPiece(originalRow, originalCol, piece);
                this.board.setPiece(desiredRow, desiredCol, originalOccupant);
            }
            return !stillInCheck;
        }
        return true;
    }

    everyPieceSandbox(grid, color) {
        const otherColor = color === 'white' ? 'black' : 'white';
        for (const [r, row] of grid.entries()) {
            for (const [c, piece] of row.entries()) {
                if (piece && piece.color === otherColor) {
                    if (piece.constructor.name === "King") {
                        this.getPotentialCheckMoves(color);
                        this.getPotentialCheckMoves(color, this.PotentialCheckMoves);
                    }

                    const moveContext = {
                        board: this.board,
                        row: r,
                        col: c,
                        withVertical: true,
                        friendlyFire: true,
                        PotentialCheckMoves: this.PotentialCheckMoves,   /////special for the king
                        enPassantTarget: this.enPassantTarget,           /////special for the pawn
                        castling: this.castling                          /////special for King/Rook
                    }

                    const potentialMoves = piece.getPotentialMoves(moveContext);

                    const threatens = potentialMoves.some(([mrow, mcol]) =>
                        this.sandboxValidation(r, c, mrow, mcol, piece, color, false)
                    );

                    if (threatens) return true;
                }
            };
        };
        return false;
    }

    ////////////////////////////////////

    promote(row, col) {
        this.board.promotionModal();
    }

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
