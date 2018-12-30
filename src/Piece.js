import CONSTANTS from './config'

export class Piece {

    constructor(xAxel, yAxel, place, move) {
        this.image = document.getElementById("king_white"); // default 
        this.board = document.getElementById("chessBoard");
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

    isLegalMove(){
        // Overwrite this method in inherited classes
        console.error("This method is supposed to be overwritten by inherited class");
        return true;
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
                mouseY >= ( (8 - self.y) * CONSTANTS.BOARD_SIZE /8) &&
                mouseY < (( (8 - self.y) + 1) * CONSTANTS.BOARD_SIZE / 8) ) {
                self.isDraggable = true;
            }
        });

        this.board.addEventListener("mouseup", function (e) {
            if(self.isDraggable){
                self.isDraggable = false;
                self.place(self.x, self.y, Math.floor(self.currentX / (CONSTANTS.BOARD_SIZE / 8) ), 8 - Math.floor(self.currentY / (CONSTANTS.BOARD_SIZE / 8) ) )
                self.x = Math.floor(self.currentX / (CONSTANTS.BOARD_SIZE / 8))
                self.y = 8 - Math.floor(self.currentY / (CONSTANTS.BOARD_SIZE / 8))
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
                self.move(self.x, self.y, self.currentX, self.currentY)
            }
        });   
    }
}