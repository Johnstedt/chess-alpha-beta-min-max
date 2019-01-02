import jQuery from 'jQuery'
import { Piece } from './Piece'
import {deepCopy} from './copyPiece'

export class Bishop extends Piece {

    constructor(x, y, color, place, move) {
        super(x, y, color, place, move);
        this.image = document.getElementById("bishop_" + color);

    }

    getImage() {
        return this.image;
    }

    isLegalMove(board, x, y) {
        
        // Can't take own pieces
        if(board[x][y]){
            if(board[x][y].color === this.color){
                return false;
            }
        }

        let dirX;
        let dirY;
        let lx = this.x
        let ly = this.y

        if(this.y < y ){
            if (this.x > x) {
                dirX = -1;
                dirY = 1;
            } else {
                dirX = 1;
                dirY = 1;
            }
        } else {
            if (this.x > x) {
                dirX = -1;
                dirY = -1;
            } else {
                dirX = 1;
                dirY = -1;
            }
        }
        while (ly + dirY !== y) {
            ly = ly + dirY;
            lx = lx + dirX
            if (board[lx][ly]) {
                return false
            }
        }

        //Move in diagonal
        if (Math.abs(this.x - x) === Math.abs(this.y - y)) {
            this.x = x;
            this.y = y;
            return true
        }
        return false
    }

    getAllLegalMoves(board, score){
         let boards = [];
         this.getFromDirection(board, boards, score, 1, 1);
         this.getFromDirection(board, boards, score, 1, -1);
         this.getFromDirection(board, boards, score, -1, 1);
         this.getFromDirection(board, boards, score, -1, -1);
        return boards;
    }

    getFromDirection(board, boards, score, xDir, yDir){
        let x = this.x;
        let y = this.y;

        x += xDir;
        y += yDir;
        while ( x >= 0 && y >= 0 && x <= 7 && y <= 7) {
            if (board[x][y]) {

                if (board[x][y].color !== this.color) {

                    let p_score = score + this.getScoreChange(board[x][y])
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
                break;
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
            x += xDir;
            y += yDir;
        }
    }

}