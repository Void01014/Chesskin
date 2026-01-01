export default class Board {
    constructor() {
        this.grid = Array.from({ length: 8 }, () => Array(8).fill(null));
    }
    setPiece(row, col, piece) {
        this.grid[row][col] = piece;
    }
    getPiece(row, col){
        return this.grid[row][col];
    }
}