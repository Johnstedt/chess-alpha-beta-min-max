import { Piece } from './Piece'
import {deepCopy} from './copyPiece'

export class King extends Piece {

    constructor(x, y, color, place, move) {
        super(x, y, color, place, move);
        this.image = document.getElementById("king_" + color);
        this.type 
        this.moves = 0;
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

        //Move in every direction one step
        if (Math.abs(this.x - x) < 2 && Math.abs(this.y - y) < 2) {
            this.x = x;
            this.y = y;
            this.moves++;
            return true
        }

        //Castle white king side
        if (this.moves === 0 && x === 6 && !board[5][0] && !board[6][0] && board[7][0]) {
            if (board[7][0].constructor.name === "Rock") {
                this.x = x;
                this.y = y;
                this.moves++;
                return "white_king_side"
            }
        }

        //Castle black king side
        if (this.moves === 0 && x === 6 && !board[5][7] && !board[6][7] && board[7][7]) {
            if (board[7][7].constructor.name === "Rock") {
                this.x = x;
                this.y = y;
                this.moves++;
                return "black_king_side"
            }
        }

        //Castle white queeen side
        if (this.moves === 0 && x === 2 && !board[3][0] && !board[2][0] && !board[1][0] && board[0][0]) {
            if (board[0][0].constructor.name === "Rock") {
                this.x = x;
                this.y = y;
                this.moves++;
                return "white_queen_side"
            }
        }

        //Castle black queen side
        if (this.moves === 0 && x === 2 && !board[3][7] && !board[2][7] && !board[1][7] && board[0][7]) {
            if (board[0][7].constructor.name === "Rock") {
                this.x = x;
                this.y = y;
                this.moves++;
                return "black_queen_side"
            }
        }
        return false
    }

    getAllLegalMoves(board, score) {

        let boards = [];
        this.tryMove(board, boards, score, this.x + 1, this.y + 1);
        this.tryMove(board, boards, score, this.x + 1, this.y - 1);
        this.tryMove(board, boards, score, this.x + 1, this.y);
        this.tryMove(board, boards, score, this.x, this.y + 1);
        this.tryMove(board, boards, score, this.x, this.y - 1);
        this.tryMove(board, boards, score, this.x - 1, this.y + 1);
        this.tryMove(board, boards, score, this.x - 1, this.y - 1);
        this.tryMove(board, boards, score, this.x - 1, this.y);

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