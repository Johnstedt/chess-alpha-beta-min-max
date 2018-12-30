import { Piece } from './Piece'

export class Rock extends Piece {

    constructor(x, y, color, place, move) {
        super(x, y, color, place, move);
        this.image = document.getElementById("rock_" + color);

    }

    getImage() {
        return this.image;
    }

    isLegalMove(board, x, y) {

        //Can't take own pieces
        if (board[x][y]) {
            if (board[x][y].color === this.color) {
                return false;
            }
        }

        //Something blocking y axis
        if (this.x === x) {
            let dir;
            let ly = this.y
            if (this.y > y) {
                dir = -1;
            } else {
                dir = 1;
            }
            while (ly + dir !== y) {
                ly = ly + dir;
                if (board[x][ly]) {
                    return false
                }
            }
        }

        //Something blocking x axis
        if (this.y === y) {
            let dir;
            let lx = this.x
            if (this.x > x) {
                dir = -1;
            } else {
                dir = 1;
            }

            while ((lx + dir) !== x) {
                lx = lx + dir;
                if (board[lx][y]) {
                    return false
                }
            }
        }

        //Move in one line
        if (this.x === x || this.y === y) {
            this.x = x;
            this.y = y;
            return true
        }

        return false
    }

}