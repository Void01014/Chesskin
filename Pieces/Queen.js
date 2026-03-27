import Piece from "./Piece.js"

export default class Queen extends Piece {
    getPotentialMoves(moveContext) {
        const { row, col, board, friendlyFire } = moveContext;
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

            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const pieceAtLocation = board.getPiece(newRow, newCol);

                if (!pieceAtLocation) {
                    potentialMoves.push([newRow, newCol]);
                } else {
                    if (pieceAtLocation.color !== this.color || (pieceAtLocation.color === this.color && friendlyFire)) {
                        potentialMoves.push([newRow, newCol]);
                    }

                    if (pieceAtLocation.color !== this.color && pieceAtLocation.constructor.name === "King") {
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