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

    //visualization
    render() {
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