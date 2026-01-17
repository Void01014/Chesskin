import Piece from "./Piece.js"

export default class Bishop extends Piece{
    getPotentialMoves(row, col, board){
        let potentialMoves = [];
        const directions = [
            [-1, -1],
            [-1, 1],
            [1, 1],
            [1, -1]
        ]

        directions.forEach(([dr, dc]) => {
            let newRow = row + dr;
            let newCol = col + dc;

            while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
                const pieceAtLocation = board.getPiece(newRow, newCol);

                if(!pieceAtLocation){
                    potentialMoves.push([newRow, newCol]);
                }else{
                    if(pieceAtLocation.color !== this.color){
                        potentialMoves.push([newRow, newCol]);
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