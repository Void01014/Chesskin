export default class Board {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.grid = Array.from({ length: 8 }, () => Array(8).fill(null));
    }
    setPiece(row, col, piece) {
        this.grid[row][col] = piece;
    }
    getPiece(row, col) {
        return this.grid[row][col];
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

    Render() {
        const allSquares = document.querySelectorAll('.square');
        let squareIndex = 0;

        this.grid.forEach((row, r) => {
            row.forEach((piece, c) => {
                const square = allSquares[squareIndex];
                square.innerHTML = '';

                if (piece) {
                    const img = document.createElement('img');

                    const pieceName = piece.constructor.name.toLowerCase();
                    img.src = `assets/skins/default/${piece.color}-${pieceName}.svg`;

                    img.classList.add('piece');
                    img.classList.add('absolute');
                    img.classList.add('w-[90%]');
                    square.appendChild(img);
                }
                squareIndex++;
            });
        });
    }

    RenderMoves(moves) {
        // 1. Clear previous highlights first! 
        // Otherwise, old moves stay blue forever.

        document.querySelectorAll('.highlight').forEach(sq => sq.classList.remove('highlight'));

        if (moves.length !== 0) {
            moves.forEach(move => {
                const [r, c] = move;

                const square = document.querySelector(`.square[data-row="${r}"][data-col="${c}"]`);

                if (square) {
                    square.classList.add('highlight');
                }
            });
        }
    }

    fillBoard() {
        const boardElement = document.getElementById('board');
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add('relative');
                square.classList.add('flex');
                square.classList.add('justify-center');
                square.classList.add('items-center');
                square.classList.add('p-2');

                square.dataset.row = r;
                square.dataset.col = c;

                square.addEventListener('click', (e) => {
                    const row = parseInt(e.currentTarget.dataset.row);
                    const col = parseInt(e.currentTarget.dataset.col);

                    this.game.handleSquareClick(row, col);
                    this.Render();
                });

                const isDark = (r + c) % 2 !== 0;
                if (isDark) square.classList.add('blue');

                boardElement.appendChild(square);
            }
        }
    }
}