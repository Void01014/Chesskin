export default class Board {
    constructor(gameInstance) {
        this.game = gameInstance;
        // The GRID is the only thing Vue cares about
        this.grid = Array.from({ length: 8 }, () => Array(8).fill(null));
        this.highlightedMoves = [];
    }

    setPiece(row, col, piece) {
        this.grid[row][col] = piece;
    }

    getPiece(row, col) {
        return this.grid[row][col];
    }

    RenderMoves(moves) {
        this.highlightedMoves = moves;
    }

    renderConsole() {
        const display = this.grid.map(row =>
            row.map(piece => {
                if (!piece) return " . ";
                const char = piece.constructor.name[0];
                return piece.color === 'white' ? ` ${char.toUpperCase()} ` : ` ${char.toLowerCase()} `;

            }).join("")
        ).join("\n");

        console.log(display);
    }
}