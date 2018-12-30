import { Piece } from './Piece'

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
        if(board[x][y]){
            if(board[x][y].color === this.color){
                return false;
            }
        }

        if( ( Math.abs(this.x - x) == 2 && Math.abs(this.y - y) == 1 ) 
            ||  (Math.abs(this.y - y) == 2 &&  Math.abs(this.x - x) == 1 ) ){

            this.x = x;
            this.y = y;
            return true;
        }

        return false
    }

}