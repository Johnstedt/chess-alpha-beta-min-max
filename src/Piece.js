import CONSTANTS from './config'

export class Piece {

    constructor(xAxel, yAxel, place, move) {
        this.image = document.getElementById("king_white"); // default 
        this.board = document.getElementById("chessBoard");
        console.log(xAxel)
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

    mouseEvents() {

        let self = this;
        let currentX;
        let currentY;

        this.board.onmousedown = function (e) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;

            if (mouseX >= (self.x * CONSTANTS.BOARD_SIZE / 8) &&
                mouseX < ((self.x + 1) * CONSTANTS.BOARD_SIZE / 8) &&
                mouseY >= ( (8 - self.y) * CONSTANTS.BOARD_SIZE /8) &&
                mouseY < (( (8 - self.y) + 1) * CONSTANTS.BOARD_SIZE / 8) ) {
                self.isDraggable = true;
            }
        };

        this.board.onmouseup = function (e) {
            self.isDraggable = false;
            self.place(self.x, self.y, Math.floor(currentX / (CONSTANTS.BOARD_SIZE / 8) ), 8 - Math.floor(currentY / (CONSTANTS.BOARD_SIZE / 8) ) )
            self.x = Math.floor(currentX / (CONSTANTS.BOARD_SIZE / 8))
            self.y = 8 - Math.floor(currentY / (CONSTANTS.BOARD_SIZE / 8))
        };

        this.board.onmouseout = function (e) {
            self.isDraggable = false;
        };

        this.board.onmousemove = function (e) {
            if (self.isDraggable) {
                currentX = e.pageX - this.offsetLeft;
                currentY = e.pageY - this.offsetTop;
                
                self.move(self.x, self.y, currentX, currentY)
            }
        };   
    }
}