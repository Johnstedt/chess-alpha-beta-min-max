import "./styles.css";

import { King } from './King'

var BOARD_SIZE = 700;

let chessBoard = document.getElementById("chessBoard");
var context = chessBoard.getContext("2d");

function paintBoard() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 == 0) {

                context.fillStyle = "#ffffff";
            } else {

                context.fillStyle = "#000000";
            }

            context.fillRect(i * BOARD_SIZE / 8, j * BOARD_SIZE / 8, BOARD_SIZE / 8, BOARD_SIZE / 8)
        }
    }
}

let board = [];
for (let i = 0; i < 9; i++) {
    board[i] = [];
    for (let j = 0; j < 9; j++) {
        board[i][j] = null;
    }
}

var x = -1;
var y = -1;
var cur_x = -1
var cur_y = -1

var move = (x_n, y_n, cur_x_n, cur_y_n) => {
    x = x_n
    y = y_n
    cur_x = cur_x_n
    cur_y = cur_y_n
}

var place = (x_old, y_old, x_new, y_new) => {

    let temp = board[x_old][y_old]

    if (temp.isLegalMove(board, x_new, x_old)) {

        board[x_old][y_old] = null
        board[x_new][y_new] = temp
        x = -1;
        y = -1
        cur_x = -1
        cur_y = -1
    }
}

board[2][4] = new King(2, 4, "white", place, move);
board[5][7] = new King(5, 7, "black", place, move);

var king_white = document.getElementById("king_white");

function placePieces() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] != null) {

                if (x == i && y == j) {
                    context.drawImage(board[i][j].getImage(), cur_x - (BOARD_SIZE / 16), cur_y - (BOARD_SIZE / 16), BOARD_SIZE / 8, BOARD_SIZE / 8);
                }
                else {
                    context.drawImage(board[i][j].getImage(), (i) * BOARD_SIZE / 8, (8 - j) * BOARD_SIZE / 8, BOARD_SIZE / 8, BOARD_SIZE / 8);
                }
            }
        }
    }
}

var currentX = chessBoard.width / 2;
var currentY = chessBoard.height / 2;
var isDraggable = false;

function DrawImage() {
    context.drawImage(king_white, currentX - (king_white.width / 2), currentY - (king_white.height / 2, BOARD_SIZE / 8, BOARD_SIZE / 8));
}

play();

function play() {

    setInterval(function () {
        paintBoard();
        placePieces();
    }, 1000 / 15);
}
