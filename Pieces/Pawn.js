import Piece from "./Piece.js"

export default class Pawn extends Piece {
    constructor(color) {
        super(color);
        this.xtraMove = 1;
    }

    //I will probably add a param to tell the function wherther to return the verical moves or no, 
    //this way i won't need to change anything inside the Game class, it will  be automatic, other
    //classes will receive additional params but that won't effect anything

    getPotentialMoves(moveContext) {
        const { row, col, board, withVertical, enPassantTarget } = moveContext;
        let potentialMoves = [];
        const dir = this.color === 'white' ? -1 : 1;

        if (withVertical) {
            for (let i = 1; i <= (1 + this.xtraMove); i++) {
                const targetRow = row + (dir * i);

                if (targetRow < 0 || targetRow >= 8) break;

                if (!board.getPiece(targetRow, col)) {
                    potentialMoves.push([targetRow, col]);
                } else {
                    break;
                }
            }
        }

        const captureCols = [col - 1, col + 1];

        captureCols.forEach(c => {
            const targetRow = row + dir;

            if (targetRow >= 0 && targetRow < 8) {
                const targetPiece = board.getPiece(targetRow, c);
                
                if (c >= 0 && c < 8) {
                    if (!withVertical) {
                        potentialMoves.push([row + dir, c]);
                    } else {
                        if (targetPiece && targetPiece.color !== this.color) {
                            potentialMoves.push([row + dir, c]);
                        }
                    }
                }
            }
        });

        if (enPassantTarget && enPassantTarget[0] === row && (enPassantTarget[1] === col + 1 || enPassantTarget[1] === col - 1)) {
            potentialMoves.push([row + dir, enPassantTarget[1]])
        }

        return potentialMoves;
    }
}