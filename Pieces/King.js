import Piece from "./Piece.js"

export default class King extends Piece {
    getPotentialMoves(moveContext) {
        const { row, col, board, PotentialCheckMoves, friendlyFire, castling } = moveContext;
        let potentialMoves = [];
        const directions = [
            [0, -1],
            [-1, 0],
            [0, 1],
            [1, 0],
            [-1, -1],
            [-1, 1],
            [1, 1],
            [1, -1]
        ];

        directions.forEach(([dr, dc]) => {
            let newRow = row + dr;
            let newCol = col + dc;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const piece = board.getPiece(newRow, newCol) ?? null;
                if (!piece || piece.color !== this.color || (piece.color === this.color && friendlyFire)) {
                    if (!PotentialCheckMoves || !PotentialCheckMoves.some(move => move[0] === newRow && move[1] === newCol)) {
                        potentialMoves.push([newRow, newCol]);
                    }
                }
            }
        });


        ////////////////////////////

        const castling_dir = this.color === "white" ? -2 : 2;

        if (castling) {
            castling[this.color].forEach(side => {
                if (side.toLowerCase() === 'q') {
                    let newCol = col - 1;

                    while (newCol >= 0 && newCol < 8) {
                        const piece = board.getPiece(row, newCol) ?? null;

                        if (piece && piece.constructor.name !== "Rook") {
                            break;
                        } else if (!piece) {
                            newCol--;
                            continue;
                        } else {
                            potentialMoves.push([row, col + castling_dir]);
                            break;
                        }
                    }
                } else {
                    let newCol = col + 1;

                    while (newCol >= 0 && newCol < 8) {
                        const piece = board.getPiece(row, newCol) ?? null;

                        if (piece && piece.constructor.name !== "Rook") {
                            break;
                        } else if (!piece) {
                            newCol++;
                        } else {
                            potentialMoves.push([row, col - castling_dir]);
                            break;

                        }
                    };
                }
            });
        }

        // console.log(PotentialCheckMoves);

        return potentialMoves;
    }
}