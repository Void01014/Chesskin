export default class Board {
    constructor(gameInstance) {
        this.game = gameInstance;
        // The GRID is the only thing Vue cares about
        this.grid = Array.from({ length: 8 }, () => Array(8).fill(null));
        this.highlightedMoves = []; // New property to track moves
    }

    setPiece(row, col, piece) {
        this.grid[row][col] = piece;
    }

    getPiece(row, col) {
        return this.grid[row][col];
    }

    // Vue replaces Render()! We just update the highlights array.
    RenderMoves(moves) {
        this.highlightedMoves = moves;
    }
}