export default class Piece{
    constructor(color) {
        this.color = color;
    }

    getPotentialMoves(row, col, board){
        console.warn(`getPotentialMoves not implemented for ${this.constructor.name}`);
        return [];
    }
}