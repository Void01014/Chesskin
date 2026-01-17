import Piece from "./Piece.js"

export default class Pawn extends Piece{
    constructor(color){
        super(color);
        this.xtraMove = 1;
    }
    getPotentialMoves(row, col, board){
        let potentialMoves = [];
        const dir = this.color === 'white' ? -1 : 1;

        for (let i = 1; i <= (1 + this.xtraMove); i++) {
            const targetRow = row + (dir * i);
            
            if (targetRow < 0 || targetRow >= 8) break;

            if (!board.getPiece(targetRow, col)) {
                potentialMoves.push([targetRow, col]);
                
            } else {
                break;
            }
        }

        return potentialMoves;
    }
}