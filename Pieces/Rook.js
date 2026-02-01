import Piece from "./Piece.js"


export default class Rook extends Piece{
    getPotentialMoves(row, col, board){
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
            
            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
                const pieceAtSquare = board.getPiece(newRow, newCol);

                if(!pieceAtSquare){
                    potentialMoves.push([newRow, newCol]);
                }else{
                    if(pieceAtSquare.color !== this.color){
                        potentialMoves.push(newRow, newCol)
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