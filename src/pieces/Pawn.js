import { Piece } from './Piece'
import {deepCopy} from './copyPiece'

export class Pawn extends Piece {

    constructor(x, y, color, place, move) {
        super(x, y, color, place, move);
        this.image = document.getElementById("pawn_" + color);
        this.steps = 0;

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

        //Move one step
        if (this.x === x &&
            ((this.y - y) === -1 && this.color == "white" || (this.y - y) === 1 && this.color == "black")
            && !board[x][y]) {

            if (y === 7) {
                return "queen_white"
            } else if (y === 0) {
                return "queen_black"
            }

            this.x = x;
            this.y = y;
            this.steps++;
            return true
        }

        //Move two step
        if (this.x === x && this.steps === 0 &&
            (((this.y - y) === -2 && this.color == "white" && !board[x][this.y + 1]) || ((this.y - y) === 2 && this.color == "black" && !board[x][this.y - 1]))
            && !board[x][y]) {
            this.x = x;
            this.y = y;
            this.steps++;
            return true
        }

        // Take piece
        if (this.color === "white") {
            if (Math.abs(this.x - x) === 1 && board[x][y] && (this.y - y) === -1) {
                if (board[x][y].color === "black") {

                    if (y === 7) {
                        return "queen_white"
                    }

                    this.x = x;
                    this.y = y;
                    this.steps++;
                    return true
                }
            }
        }
        else {
            if (Math.abs(this.x - x) === 1 && board[x][y] && (this.y - y) === 1) {
                if (board[x][y].color === "white") {

                    if (y === 0) {
                        return "queen_black"
                    }

                    this.x = x;
                    this.y = y;
                    this.steps++;
                    return true
                }
            }
        }

        // En passant
        if (this.color === "white") {

            if (this.y === 4 && Math.abs(this.x - x) === 1 && board[x][y - 1]) {

                if (board[x][y - 1].color === "black" && board[x][y - 1].steps === 1) {
                    return "passant_white"
                }
            }

        } else {
            if (this.y === 3 && Math.abs(this.x - x) === 1 && board[x][y + 1]) {

                if (board[x][y + 1].color === "white" && board[x][y + 1].steps === 1) {
                    return "passant_black"
                }
            }
        }

        return false
    }

    getAllLegalMoves(board, score) {

        let boards = [];
        let x = this.x;
        let y;
        let y2;
        let dir;

        if (this.color === "white") {
            y = this.y + 1;
            y2 = this.y + 2
        } else {
            y = this.y - 1;
            y2 = this.y - 2;
        }

        if (y >= 0 && y <= 7) {

            x = this.x;
            if (!board[x][y]) {
                let p_board = deepCopy(board);
                p_board[x][y] = p_board[this.x][this.y]
                p_board[this.x][this.y] = null;
                p_board[x][y].x = x
                p_board[x][y].y = y
                boards.push({
                    score: score,
                    board: p_board
                });

            }

            x = this.x + 1;
            if (x <= 7) {
                if (board[x][y]) {
                    if (board[x][y].color !== this.color) {
                        let p_score = score + super.getScoreChange(board[x][y])
                        let p_board = deepCopy(board);
                        p_board[x][y] = p_board[this.x][this.y]
                        p_board[this.x][this.y] = null;
                        p_board[x][y].x = x
                        p_board[x][y].y = y
                        boards.push({
                            score: p_score,
                            board: p_board
                        });
                    }
                }

            }
            x = this.x - 1;
            if (x >= 0) {
                if (board[x][y]) {
                    if (board[x][y].color !== this.color) {

                        let p_score = score + super.getScoreChange(board[x][y])
                        let p_board = deepCopy(board);
                        p_board[x][y] = p_board[this.x][this.y]
                        p_board[this.x][this.y] = null;
                        p_board[x][y].x = x
                        p_board[x][y].y = y
                        boards.push({
                            score: p_score,
                            board: p_board
                        });
                    }
                }
            }
        }

        x = this.x
        if (y2 >= 0 && y2 <= 7) {
            if (!board[x][y2]) {

                let p_board = deepCopy(board);
                p_board[x][y2] = p_board[this.x][this.y]
                p_board[this.x][this.y] = null;
                p_board[x][y2].x = x
                p_board[x][y2].y = y2
                boards.push({
                    score: score,
                    board: p_board
                });

            }
        }
        
        return boards;
    }
}
