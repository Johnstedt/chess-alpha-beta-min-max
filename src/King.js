import { Piece } from './Piece'

export class King extends Piece {

    constructor(x, y, color, place, move) {
        super(x, y, color, place, move);
        this.image = document.getElementById("king_" + color);

        this.moves = 0;
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
            this.moves++;
            return true
        }

        if(this.moves === 0 && x === 6 && !board[5][0] && !board[6][0] && board[7][0] ){
            if(board[7][0].constructor.name === "Rock"){
                this.x = x;
                this.y = y;
                this.moves++;
                return "white_king_side"
            }
        }

        if(this.moves === 0 && x === 6 && !board[5][7] && !board[6][7] && board[7][7] ){
            if(board[7][7].constructor.name === "Rock"){
                this.x = x;
                this.y = y;
                this.moves++;
                return "black_king_side"
            }
        }

        if(this.moves === 0 && x === 2 && !board[3][0] && !board[2][0] && !board[1][0] && board[0][0] ){
            if(board[0][0].constructor.name === "Rock"){
                this.x = x;
                this.y = y;
                this.moves++;
                return "white_queen_side"
            }
        }
        
        if(this.moves === 0 && x === 2 && !board[3][7] && !board[2][7] && !board[1][7] && board[0][7] ){
            if(board[0][7].constructor.name === "Rock"){
                this.x = x;
                this.y = y;
                this.moves++;
                return "black_queen_side"
            }
        }
        return false
    }
}