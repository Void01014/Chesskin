import Piece from "./Piece.js"

export default class King extends Piece {
    getPotentialMoves(row, col, board, PotentialCheckMoves) {
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

        const otherColor = this.color === 'white' ? 'black' : 'white'

        directions.forEach(([dr, dc]) => {
            let newRow = row + dr;
            let newCol = col + dc;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const piece = board.getPiece(newRow, newCol) ?? null;
                if (!piece || piece.color !== this.color) {
                    if (!PotentialCheckMoves || !PotentialCheckMoves.some(move => move[0] === newRow && move[1] === newCol)) {
                        potentialMoves.push([newRow, newCol]);
                    }
                }
            }
        });

        return potentialMoves;
    }
}