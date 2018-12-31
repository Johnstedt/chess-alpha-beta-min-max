import { Piece } from './Piece'

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

}