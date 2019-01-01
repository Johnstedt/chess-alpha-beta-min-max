import CONSTANTS from '../config'

/**
 * Class supposed to only be used by inheritance.
 */
export class Piece {

    constructor(xAxel, yAxel, color, place, move) {
        this.image = document.getElementById("king_white"); // default 
        this.board = document.getElementById("chessBoard");
        this.color = color;
        this.x = xAxel;
        this.y = yAxel;
        this.isDraggable = false;
        this.mouseEvents()
        this.place = place
        this.move = move
    }

    getImage() {
        return this.image;
    }

    // Overwrite this method in inherited classes
    isLegalMove(board, x, y){
        console.error("This method is supposed to be overwritten by inherited class");
        return true;
    }

    // Overwrite this method in inherited classes
    getAllLegalMoves(board, score){
        console.error("This method is supposed to be overwritten by inherited class");
        return [];
    }

    mouseEvents() {

        let self = this;
        this.currentX = -1;
        this.currentY = -1;

        this.board.addEventListener("mousedown", function (e) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;

            if (mouseX >= (self.x * CONSTANTS.BOARD_SIZE / 8) &&
                mouseX < ((self.x + 1) * CONSTANTS.BOARD_SIZE / 8) &&
                mouseY >= ( (7 - self.y) * CONSTANTS.BOARD_SIZE /8) &&
                mouseY < (( (7 - self.y) + 1) * CONSTANTS.BOARD_SIZE / 8) ) {
                self.isDraggable = true;
            }
        });

        this.board.addEventListener("mouseup", function (e) {
            if(self.isDraggable){
                self.isDraggable = false;
                self.place(self.x, self.y, Math.floor(self.currentX / (CONSTANTS.BOARD_SIZE / 8) ), 7 - Math.floor(self.currentY / (CONSTANTS.BOARD_SIZE / 8) ) );
            }
        });

        this.board.addEventListener("mouseout", function (e) {
            if(self.isDraggable){

                self.place(self.x, self.y, self.x, self.y)
                self.isDraggable = false;
            }
        });

        this.board.addEventListener("mousemove", function (e) {
            if (self.isDraggable) {
                self.currentX = e.pageX - this.offsetLeft;
                self.currentY = e.pageY - this.offsetTop;   
                self.move(self.x, self.y, self.currentX, self.currentY);
            }
        });   
    }

    getScoreChange(piece) {
        if (this.color === "white") {
            return this.getPieceValue(piece);
        } else {
            return 0 - this.getPieceValue(piece);
        }
    }

    getPieceValue(piece){
        switch(piece.constructor.name){
            case "Pawn":
                return 1;
            case "Knight":
                return 3;
            case "Bishop":
                return 3;
            case "Rock":
                return 5;
            case "Queen":
                return 9;    
            case "King":
                return 40;
        }
    }
}