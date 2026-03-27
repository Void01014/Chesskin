import Piece from "./Piece.js"


export default class Rook extends Piece {
    getPotentialMoves(moveContext) {
        const { row, col, board, friendlyFire } = moveContext;
        const potentialMoves = [];
        const directions = [
            [0, -1],
            [-1, 0],
            [0, 1],
            [1, 0]
        ];

        directions.forEach(([dr, dc]) => {
            let newRow = row + dr;
            let newCol = col + dc;

            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const pieceAtSquare = board.getPiece(newRow, newCol);

                if (!pieceAtSquare) {
                    potentialMoves.push([newRow, newCol]);
                } else {
                    if (pieceAtSquare.color !== this.color || (pieceAtSquare.color === this.color && friendlyFire)) {
                        potentialMoves.push([newRow, newCol]);
                    }
                    if (pieceAtSquare.color !== this.color && pieceAtSquare.constructor.name === "King") {
                        const rowBehind = newRow + dr;
                        const colBehind = newCol + dc;

                        if (rowBehind >= 0 && rowBehind < 8 && colBehind >= 0 && colBehind < 8) {
                            potentialMoves.push([rowBehind, colBehind]);
                        }
                    }
                    
                    break;
                }
                newRow += dr;
                newCol += dc;
            }
        });
        return potentialMoves;
    }
}