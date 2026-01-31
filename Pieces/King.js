import Piece from "./Piece.js"

export default class King extends Piece{
    getPotentialMoves(row, col, board){
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

        directions.forEach(([dr, dc]) =>{
            let newRow = row + dr; 
            let newCol = col + dc; 
            
            if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && board.getPiece(newCol, newCol)){
                potentialMoves.push([newRow, newCol]);
            }
        });

        return potentialMoves;
    }
}