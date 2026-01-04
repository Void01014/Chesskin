import Piece from "./Piece.js"

export default class Knight extends Piece{
    getPotentialMoves(row, col){
        const offsets = [
                         [2, 1], [2, -1], [-2, 1], [-2, -1]
                         [1, 2], [1, -2], [-1, 2], [-1, -2]
                        ];

        let portentialMoves = [];
        for(let i = 0 ;  i < offsets.length; i++){
            const [dr, dc] = offsets[i];    
            const newRow= row + dr;
            const newCol = col + dc;
            if(newRow < 8 && newRow >= 0 && newCol < 8 && newCol >= 0){
                portentialMoves.push([newRow, newCol]);
            }
        }
        return portentialMoves;
    }
}