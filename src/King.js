import { Piece } from './Piece'

export class King extends Piece {

    constructor(x, y, color, place, move) {
        super(x, y, color, place, move);
        this.image = document.getElementById("king_" + color);

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

        //Move in every direction one step
        if (Math.abs(this.x - x) < 2 && Math.abs(this.y - y) < 2) {
            this.x = x;
            this.y = y;
            return true
        }
        return false
    }

}