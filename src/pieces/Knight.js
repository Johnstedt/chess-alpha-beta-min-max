import { Piece } from './Piece'
import {deepCopy} from './copyPiece'

export class Knight extends Piece {

    constructor(x, y, color, place, move) {
        super(x, y, color, place, move);
        this.image = document.getElementById("knight_" + color);
    }

    getImage() {
        return this.image;
    }

    isLegalMove(board, x, y) {

        // Can't take own pieces
        if (board[x][y]) {
            if (board[x][y].color === this.color) {
                return false;
            }
        }

        if ((Math.abs(this.x - x) == 2 && Math.abs(this.y - y) == 1)
            || (Math.abs(this.y - y) == 2 && Math.abs(this.x - x) == 1)) {

            this.x = x;
            this.y = y;
            return true;
        }

        return false
    }

    getAllLegalMoves(board, score) {

        let boards = [];
        this.tryMove(board, boards, score, this.x + 2, this.y + 1);
        this.tryMove(board, boards, score, this.x + 2, this.y - 1);
        this.tryMove(board, boards, score, this.x + 1, this.y + 2);
        this.tryMove(board, boards, score, this.x + 1, this.y - 2);
        this.tryMove(board, boards, score, this.x - 1, this.y + 2);
        this.tryMove(board, boards, score, this.x - 1, this.y - 2);
        this.tryMove(board, boards, score, this.x - 2, this.y + 1);
        this.tryMove(board, boards, score, this.x - 2, this.y - 1);

        return boards;
    }

    tryMove(board, boards, score, x, y) {

        if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {

            if (board[x][y]) {

                if (board[x][y].color !== this.color) {

                    let p_score = score + super.getScoreChange(board[x][y])
                    let p_board = deepCopy(board)
                    p_board[x][y] = p_board[this.x][this.y]
                    p_board[this.x][this.y] = null;
                    p_board[x][y].x = x
                    p_board[x][y].y = y
                    boards.push({
                        score: p_score,
                        board: p_board
                    });
                }
            } else {

                let p_board = deepCopy(board)
                p_board[x][y] = p_board[this.x][this.y]
                p_board[this.x][this.y] = null;
                p_board[x][y].x = x
                p_board[x][y].y = y
                boards.push({
                    score: score,
                    board: p_board
                });
            }
        }
    }
}