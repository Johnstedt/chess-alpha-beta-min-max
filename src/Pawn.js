import { Piece } from './Piece'

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
        if(board[x][y]){
            if(board[x][y].color === this.color){
                return false;
            }
        }

        //Move one step
        if (this.x === x && 
            ( (this.y - y) === -1 && this.color == "white" ||(this.y - y) === 1 && this.color == "black" ) 
            && !board[x][y] ) {

            if(y === 7){
                return "queen_white"
            } else if(y === 0) {
                return "queen_black"
            }

            this.x = x;
            this.y = y;
            this.steps++;
            return true
        }

         //Move two step
         if (this.x === x && this.steps === 0 &&
            ( ((this.y - y) === -2 && this.color == "white" && !board[x][this.y+1]) || ((this.y - y) === 2 && this.color == "black" && !board[x][this.y-1]) ) 
            && !board[x][y] ) {
            this.x = x;
            this.y = y;
            this.steps++;
            return true
        }

        // Take piece
        if(this.color === "white"){
            if(Math.abs(this.x - x) === 1 && board[x][y] && (this.y - y) === -1 ){
                if(board[x][y].color === "black"){

                    if(y === 7){
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
            if(Math.abs(this.x - x) === 1 && board[x][y] && (this.y - y) === 1 ){
                if(board[x][y].color === "white"){

                    if(y === 0) {
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
        if(this.color === "white"){

            if(this.y === 4 && Math.abs(this.x - x) === 1 && board[x][y-1]){
                
                if(board[x][y-1].color === "black" && board[x][y-1].steps === 1){
                    return "passant_white"
                }
            }

        } else {
            if(this.y === 3 && Math.abs(this.x - x) === 1 && board[x][y+1]){
                
                if(board[x][y+1].color === "white" && board[x][y+1].steps === 1){
                    return "passant_black"
                }
            }
        }

        return false
    }

}