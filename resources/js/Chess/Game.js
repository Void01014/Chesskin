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
    PROMOTION_PENDING: 'PROMOTION_PENDING',
    PAUSED: 'PAUSED',
    GMAE_OVER: 'GAME_OVER',
}

export default class Game {

    constructor(mode, difficulty, timeLimit, ispuzzle, puzzlePosition, puzzleSolution) {
        this.board = new Board(this);
        this.state = gameState.SELECTING_PIECE;
        this.currentPlayer = 'white';
        this.humanColor = 'white';

        this.isAiGame = mode;
        this.aiWorker = new Worker('/js/stockfish.js');
        this.aiWorker.onmessage = (event) => {
            const message = event.data;
            if (message.startsWith('bestmove')) {
                const uciMove = message.split(' ')[1];
                this.handleAiResponse(uciMove);
            }
        };
        this.aiWorker.onerror = (error) => {
            console.error("Stockfish Worker Error:", error);
        };
        this.aiWorker.postMessage('uci');
        this.aiWorker.postMessage('isready');
        this.aiWorker.postMessage('setoption name UCI_LimitStrength value true');
        this.aiWorker.postMessage(`setoption name Skill Level value ${difficulty}`);
        this.aiWorker.postMessage(`setoption name Skill Level Maximum Error value ${20 - difficulty}`); //the higher the level the less mistakes stockfish will make


        this.selectedSquare = null;
        this.validMovesForSelected = [];
        this.PotentialCheckMoves = [];
        this.kingPositions = {
            white: { r: null, c: null },
            black: { r: null, c: null }
        };
        this.pendingPromotion = null;
        this.enPassantTarget = null;
        this.castling = {
            white: ['Q', 'K'],
            black: ['q', 'k']
        }

        //////////////////////
        //puzzles        

        this.ispuzzle = ispuzzle;
        this.puzzleCompleted = false;
        this.puzzleFailed = false;
        this.puzzleSolution = puzzleSolution ?? [];
        this.puzzle_played_moves = []
        if (ispuzzle) {            
            this.generatePuzzle(puzzlePosition)
        } else {
            this.initializeBoard();
        }


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
                friendlyFire: false,
                PotentialCheckMoves: this.PotentialCheckMoves,   /////special for the King/Pawn
                enPassantTarget: this.enPassantTarget,           /////special for the Pawn
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

        if (this.sandboxValidation(this.selectedSquare.row, this.selectedSquare.col, row, col, selectedPiece, opponentColor)) {
            //if puzzle, check if the sequence is correct
            if (this.ispuzzle) {
                const valid_puzzle_move = this.puzzleValidation(this.selectedSquare.row, this.selectedSquare.col, row, col);
                if (valid_puzzle_move) {
                    this.executeMove(this.selectedSquare.row, this.selectedSquare.col, row, col);
                }
            }else{
                this.executeMove(this.selectedSquare.row, this.selectedSquare.col, row, col);
            }

        } else {
            this.finalizeTurn(true);
        }
    }

    async executeMove(startRow, startCol, endRow, endCol, aiPromotionChoice = null) {
        const otherColor = this.currentPlayer === 'white' ? 'black' : 'white';
        if (this.isCheck(otherColor)) {
            const kingPos = this.kingPositions[this.currentPlayer];
            const myKingElem = document.querySelector(`.square[data-row="${kingPos.r}"][data-col="${kingPos.c}"]`);
            const squareColor = kingPos.c % 2 === 0 ? 'white' : '#00b3ff';

            if (myKingElem) {
                myKingElem.style.backgroundColor = squareColor;
            }
        }


        const selectedPiece = this.board.getPiece(startRow, startCol);
        const opponentColor = this.currentPlayer === 'white' ? 'black' : 'white';

        this.board.setPiece(endRow, endCol, selectedPiece);
        this.board.setPiece(startRow, startCol, null);
        this.board.grid = [...this.board.grid];

        //Logic for En Passant
        if (selectedPiece.constructor.name === 'Pawn' && this.enPassantTarget) {
            const [epRow, epCol] = this.enPassantTarget;
            const captureRow = selectedPiece.color === 'white' ? endRow + 1 : endRow - 1;

            if (endRow === (selectedPiece.color === 'white' ? 2 : 5) && endCol === epCol) {
                this.board.setPiece(epRow, epCol, null);
            }
        }

        if (selectedPiece.constructor.name === 'Pawn' && Math.abs(startRow - endRow) === 2) {
            this.enPassantTarget = [endRow, endCol];
        } else {
            this.enPassantTarget = null;
        }

        if (selectedPiece.xtraMove !== undefined) {
            selectedPiece.xtraMove = 0;
        }

        //Logic for castling
        if (selectedPiece.constructor.name === 'King') {
            if (endCol - startCol > 1) {
                const king_s_rook = this.board.getPiece(startRow, 7);
                this.board.setPiece(startRow, 5, king_s_rook);
                this.board.setPiece(startRow, 7, null);
            } else if (endCol - startCol < -1) {
                const queen_s_rook = this.board.getPiece(startRow, 0);
                this.board.setPiece(startRow, 3, queen_s_rook);
                this.board.setPiece(startRow, 0, null);
            }
        }

        if (selectedPiece.constructor.name === 'King') {
            this.castling[selectedPiece.color] = []
        } else if (selectedPiece.constructor.name === 'Rook') {
            const kingCol = this.kingPositions[selectedPiece.color].c;
            const rookCol = startCol;

            if (rookCol < kingCol) {
                const targetColor = selectedPiece.color === 'white' ? 'Q' : 'q';
                this.castling[selectedPiece.color] = this.castling[selectedPiece.color].filter(color => color != targetColor);
            } else {
                const targetColor = selectedPiece.color === 'white' ? 'K' : 'k';
                this.castling[selectedPiece.color] = this.castling[selectedPiece.color].filter(color => color != targetColor);
            }
        }

        const isPawn = selectedPiece.constructor.name === 'Pawn';
        const promotionRank = selectedPiece.color === 'white' ? 0 : 7;

        //Logic for promotion
        if (isPawn && endRow === promotionRank) {
            if (aiPromotionChoice) {
                const pieceClasses = {
                    'q': Queen,
                    'r': Rook,
                    'b': Bishop,
                    'n': Knight
                }

                const chosenClass = pieceClasses[aiPromotionChoice] || Queen;
                const promotedPiece = new chosenClass(selectedPiece.color);

                this.board.setPiece(endRow, endCol, promotedPiece)
            } else {
                this.pendingPromotion = [endRow, endCol];
                this.state = gameState.PROMOTION_PENDING;
                return;
            }
        }

        this.check_n_checkmate(startRow, startCol, endRow, endCol);

        // console.log(`Moved to ${endRow},${endCol}`);
    }

    check_n_checkmate() {
        const opponentColor = this.currentPlayer === 'white' ? 'black' : 'white';
        const is_check = this.isCheck(this.currentPlayer);
        const enemy_have_legal_moves = this.everyPieceSandbox(this.board.grid, this.currentPlayer);

        if (!enemy_have_legal_moves) {
            this.getPotentialCheckMoves(this.currentPlayer);

            const op_kingRow = this.kingPositions[opponentColor].r;
            const op_kingCol = this.kingPositions[opponentColor].c;
            const op_king = this.board.getPiece(op_kingRow, op_kingCol);

            const moveContext = {
                board: this.board,
                row: op_kingRow,
                col: op_kingCol,
                withVertical: true,
                friendlyFire: false,
                PotentialCheckMoves: this.PotentialCheckMoves,   /////special for the king
                enPassantTarget: this.enPassantTarget,           /////special for the pawn
                castling: this.castling                          /////special for King/Rook
            }

            const kingMoves = op_king.getPotentialMoves(moveContext);

            if (is_check) {
                alert('checkmate');
            } else if (kingMoves.length === 0) {
                alert('stalemate');
            }
        }

        this.finalizeTurn(false);
    }

    ///////////////////////////////////

    puzzleValidation(startRow, startCol, endRow, endCol) {
        const currentIndex = this.puzzle_played_moves.length;
        const expectedMove = this.puzzleSolution[currentIndex];

        console.log("THIS IS:", this);
        console.log(this.puzzleSolution);
        // console.log('index: ' + currentIndex);
        // console.log('exMove: ' + expectedMove);


        if (!expectedMove) {
            console.log("Puzzle already completed or no more moves expected");
            return;
        }

        const [expStartRow, expStartCol, expEndRow, expEndCol] = expectedMove;

        console.log(expStartRow, expStartCol, expEndRow, expEndCol);


        if (
            startRow === expStartRow &&
            startCol === expStartCol &&
            endRow === expEndRow &&
            endCol === expEndCol
        ) {
            this.puzzle_played_moves.push([startRow, startCol, endRow, endCol]);
            console.log("Correct move");

            if (this.puzzle_played_moves.length === this.puzzleSolution.length) {
                console.log("Puzzle solved!");
                this.puzzleCompleted = true;
            }
        } else {
            console.log("Wrong move");

            this.puzzle_played_moves = [];
            this.finalizeTurn(true);
            return false;
        }
        return true;
    }

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
                        PotentialCheckMoves: PotentialCheckMoves,        /////special for the King/Pawn
                        enPassantTarget: this.enPassantTarget,           /////special for the Pawn
                        castling: this.castling                          /////special for King/Rook
                    }
                    this.PotentialCheckMoves.push(...piece.getPotentialMoves(moveContext))
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
            move[0] === this.kingPositions[otherColor].r &&
            move[1] === this.kingPositions[otherColor].c
        );
    }

    sandboxValidation(originalRow, originalCol, desiredRow, desiredCol, piece, color) {
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

        if (isKing) {
            this.board.setPiece(originalRow, originalCol, piece);
            this.board.setPiece(desiredRow, desiredCol, originalOccupant);
            this.kingPositions[otherColor] = { r: originalRow, c: originalCol };
        } else {
            this.board.setPiece(originalRow, originalCol, piece);
            this.board.setPiece(desiredRow, desiredCol, originalOccupant);
        }

        if (stillInCheck) {
            return false;
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
                    }

                    const moveContext = {
                        board: this.board,
                        row: r,
                        col: c,
                        withVertical: true,
                        friendlyFire: false,
                        PotentialCheckMoves: this.PotentialCheckMoves,   /////special for the king
                        enPassantTarget: this.enPassantTarget,           /////special for the pawn
                        castling: this.castling                          /////special for King/Rook
                    }

                    const potentialMoves = piece.getPotentialMoves(moveContext);

                    let canMove = false;

                    for (const [mrow, mcol] of potentialMoves) {
                        if (this.sandboxValidation(r, c, mrow, mcol, piece, color)) {
                            console.log(`Valid move: (${r}, ${c}) -> (${mrow}, ${mcol})`);
                            canMove = true;
                        }
                    }

                    if (canMove) return true;
                }
            };
        };
        return false;
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
        this.pendingPromotion = null;


        if (!retry && this.isAiGame && this.currentPlayer !== this.humanColor) {
            setTimeout(() => {
                const aiMove = this.getAIMove();
            }, 250)
        }
    }

    promote(pieceName, color) {
        const [row, col] = this.pendingPromotion;
        const pieceClasses = {
            'Queen': Queen,
            'Rook': Rook,
            'Knight': Knight,
            'Bishop': Bishop
        };

        const chosenClass = pieceClasses[pieceName];
        const promotedPiece = new chosenClass(color);

        this.board.setPiece(row, col, promotedPiece)
        this.check_n_checkmate();
    }

    //////////////////////////////////

    // Stockfish

    generateFEN() {
        let fenRows = [];

        for (let r = 0; r < 8; r++) {
            let rowStr = "";
            let emptyCount = 0;

            for (let c = 0; c < 8; c++) {
                const piece = this.board.getPiece(r, c);
                if (!piece) {
                    emptyCount++;
                } else {
                    if (emptyCount > 0) {
                        rowStr += emptyCount;
                        emptyCount = 0;
                    }
                    // Handle Knight (N) vs King (K)
                    let char = piece.constructor.name === "Knight" ? "N" : piece.constructor.name[0];
                    // Uppercase for White, Lowercase for Black
                    rowStr += piece.color === "white" ? char.toUpperCase() : char.toLowerCase();
                }
            }
            if (emptyCount > 0) rowStr += emptyCount;
            fenRows.push(rowStr);
        }

        const piecePlacement = fenRows.join('/');
        const activeColor = this.currentPlayer === 'white' ? 'w' : 'b';

        // Castling Rights
        let castlingStr = (this.castling.white.join('') + this.castling.black.join('')).replace(/ /g, '') || '-';

        // En Passant Target (e.g., "e3" or "-")

        let epTarget = "-";

        if (this.enPassantTarget && this.enPassantTarget.length === 2) {
            const [r, c] = this.enPassantTarget;
            const epPawn = this.board.getPiece(r, c);

            if (epPawn) {
                const step = epPawn.color === "white" ? 1 : -1;
                epTarget = this.coordsToAlgebraic(r + step, c);
            }
        }

        return `${piecePlacement} ${activeColor} ${castlingStr} ${epTarget} 0 1`;
    }

    coordsToAlgebraic(prow, pcol) {
        if (prow === undefined || pcol === undefined) return "-";
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const row = 8 - prow; // Chess rows go 8 to 1
        const col = files[pcol];
        return `${col}${row}`;
    }

    algebraicToCoords(square) {
        if (!square || square === '-') return null;

        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        const col = files.indexOf(square[0]);
        const row = 8 - parseInt(square[1]);

        return { row, col };
    }

    async getAIMove() {
        const fen = this.generateFEN();

        this.aiWorker.postMessage(`position fen ${fen}`);
        this.aiWorker.postMessage('go movetime 1000');
    }

    handleAiResponse(uciMove) {
        const move = this.parseUCIMove(uciMove);

        // Execute the move on your grid
        this.executeMove(
            move.from[0],
            move.from[1],
            move.to[0],
            move.to[1],
            move.promotion
        );
    }

    parseUCIMove(uci) {
        const fileMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7 };

        // e.g., "e2e4"
        const fromFile = uci[0]; // 'e'
        const fromRank = uci[1]; // '2'
        const toFile = uci[2];   // 'e'
        const toRank = uci[3];   // '4'
        const promotion = uci[4] || null;

        return {
            from: [8 - parseInt(fromRank), fileMap[fromFile]], // Converts '2' to index 6
            to: [8 - parseInt(toRank), fileMap[toFile]],       // Converts '4' to index 4
            promotion: promotion
        };
    }

    ////////////////////////////////
    //puzzles


    generatePuzzle(fen) {
        this.pendingPromotion = null;

        const pieces = {
            'p': Pawn,
            'n': Knight,
            'b': Bishop,
            'k': King,
            'q': Queen,
            'r': Rook,
            'e': null,
        }

        const [placement, turn, castling, enPassant, halfmove, fullmove] = fen.split(' ')
        const rows = placement.split('/')

        if (rows.length !== 8) throw new Error('Invalid FEN')

        let expanded_fen = Array(8).fill('')
        const puzzle_pos = Array.from({ length: 8 }, () => Array(8).fill(null))

        rows.forEach((row, r) => {
            Array.from(row).forEach(piece => {
                if (piece >= '0' && piece <= '9') {
                    expanded_fen[r] += 'e'.repeat(Number(piece))
                } else {
                    expanded_fen[r] += piece
                }
            })

            if (expanded_fen[r].length !== 8) {
                throw new Error('Invalid FEN row length')
            }
        })

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = expanded_fen[i][j]

                if (piece === 'e') {
                    puzzle_pos[i][j] = null
                } else {
                    const isWhite = piece === piece.toUpperCase()
                    const chosenClass = pieces[piece.toLowerCase()]

                    if (!chosenClass) {
                        throw new Error(`Unknown piece: ${piece}`)
                    }

                    puzzle_pos[i][j] = new chosenClass(isWhite ? 'white' : 'black')
                }
            }
        }

        this.board.grid = puzzle_pos

        this.turn = turn === 'w' ? 'white' : 'black'

        this.castling = { white: [], black: [] }
        if (castling !== '-') {
            if (castling.includes('K')) this.castling.white.push('K')
            if (castling.includes('Q')) this.castling.white.push('Q')
            if (castling.includes('k')) this.castling.black.push('k')
            if (castling.includes('q')) this.castling.black.push('q')
        }

        this.enPassantTarget = this.algebraicToCoords(enPassant)

        this.halfmoveClock = parseInt(halfmove)
        this.fullmoveNumber = parseInt(fullmove)

        this.kingPositions.white = this.getKingPosition('white')
        this.kingPositions.black = this.getKingPosition('black')
    }
}
