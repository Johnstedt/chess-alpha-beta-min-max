import "./styles.css";

import { King } from './King'

var BOARD_SIZE = 700;

let chessBoard = document.getElementById("chessBoard");
var context = chessBoard.getContext("2d");


function paintBoard(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if( (i + j) % 2 == 0){
        
            context.fillStyle = "#ffffff";
            } else {
        
            context.fillStyle = "#000000";
            }
        
            context.fillRect(i * BOARD_SIZE / 8, j * BOARD_SIZE / 8, BOARD_SIZE / 8, BOARD_SIZE / 8)
        } 
    }
}
let board = [];
for(let i=0; i<9; i++) {
    board[i] = [];
    for(let j=0; j<9; j++) {
        board[i][j] = null;
    }
}

board[2][4] = new King("white");

var king_white = document.getElementById("king_white");
placePiece(2, 4);

function placePiece(x, y){
    
    context.drawImage(king_white, x * BOARD_SIZE / 8 , y * BOARD_SIZE / 8, BOARD_SIZE / 8, BOARD_SIZE / 8);
}

var currentX = chessBoard.width/2;
var currentY = chessBoard.height/2;
var isDraggable = false;

function DrawImage() {
    context.drawImage(king_white, currentX-(king_white.width/2), currentY-(king_white.height/2, BOARD_SIZE / 8, BOARD_SIZE / 8));
  }

  _Go();
  
function _Go() {
    _MouseEvents();
  
    setInterval(function() {
     // _ResetchessBoard()
      paintBoard();
      DrawImage();
    }, 1000/10);
  }

  function _ResetchessBoard() {
    context.fillStyle = '#fff';
    context.fillRect(0,0, chessBoard.width, chessBoard.height);
  }

function _MouseEvents(){

    chessBoard.onmousedown = function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
    
        if (mouseX >= (currentX - king_white.width/2) &&
            mouseX <= (currentX + king_white.width/2) &&
            mouseY >= (currentY - king_white.height/2) &&
            mouseY <= (currentY + king_white.height/2)) {
          isDraggable = true;
        }
    };
    chessBoard.onmouseup = function(e) {
        isDraggable = false;
    };

    chessBoard.onmouseout = function(e) {
        isDraggable = false;
    };

  chessBoard.onmousemove = function(e) {
    if (isDraggable) {
       currentX = e.pageX - this.offsetLeft;
       currentY = e.pageY - this.offsetTop;
     }
  };
}