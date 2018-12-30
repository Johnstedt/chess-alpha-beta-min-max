import "./styles.css";

import { King } from './King'
import { Queen } from './Queen'
import { Rock } from './Rock'
import { Bishop } from './Bishop'
import { Knight } from './Knight'
import { Pawn } from './Pawn'
import CONSTANTS from './config'

export class Chess {

    constructor() {
        this.chessBoard = document.getElementById("chessBoard");
        this.context = chessBoard.getContext("2d");
        this.board = this.createBoard()

        this.x = -1;
        this.y = -1;
        this.cur_x = -1
        this.cur_y = -1

        this.initiatePiecesForGame()
    }

    play() {
        setInterval(() => {
            this.paintBoard();
            this.placePieces();
        }, 1000 / 15);
    }

    move (x_n, y_n, cur_x_n, cur_y_n)  {
        this.x = x_n
        this.y = y_n
        this.cur_x = cur_x_n
        this.cur_y = cur_y_n
    }

    place(x_old, y_old, x_new, y_new) {

        let temp = this.board[x_old][y_old]

        if (temp.isLegalMove(this.board, x_new, y_new) === true) {

            this.board[x_old][y_old] = null
            this.board[x_new][y_new] = temp

        }
        else if(temp.isLegalMove(this.board, x_new, y_new) === "passant_white"){

            this.board[x_old][y_old] = null
            this.board[x_new][y_new - 1] = null
            this.board[x_new][y_new] = temp

            this.board[x_new][y_new].x = x_new
            this.board[x_new][y_new].y = y_new

        } else if(temp.isLegalMove(this.board, x_new, y_new) === "passant_black"){

            this.board[x_old][y_old] = null
            this.board[x_new][y_new + 1] = null
            this.board[x_new][y_new] = temp

            this.board[x_new][y_new].x = x_new
            this.board[x_new][y_new].y = y_new
        }
        else if(temp.isLegalMove(this.board, x_new, y_new) === "queen_white"){
            this.board[x_old][y_old] = null
            this.board[x_new][y_new] = new Queen(x_new, y_new, "white", this.place.bind(this), this.move.bind(this));
        }
        else if(temp.isLegalMove(this.board, x_new, y_new) === "queen_black"){
            this.board[x_old][y_old] = null
            this.board[x_new][y_new] = new Queen(x_new, y_new, "black", this.place.bind(this), this.move.bind(this));
        }

        this.x = -1;
        this.y = -1
        this.cur_x = -1
        this.cur_y = -1
    }

    placePieces() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board[i][j] != null) {

                    if (this.x == i && this.y == j) {
                        this.context.drawImage(this.board[i][j].getImage(), this.cur_x - (CONSTANTS.BOARD_SIZE / 16), this.cur_y - (CONSTANTS.BOARD_SIZE / 16), CONSTANTS.BOARD_SIZE / 8, CONSTANTS.BOARD_SIZE / 8);
                    }
                    else {
                        this.context.drawImage(this.board[i][j].getImage(), (i) * CONSTANTS.BOARD_SIZE / 8, (7 - j) * CONSTANTS.BOARD_SIZE / 8, CONSTANTS.BOARD_SIZE / 8, CONSTANTS.BOARD_SIZE / 8);
                    }
                }
            }
        }
    }

    initiatePiecesForGame(){
        this.createPiece(4, 0, "white", "king")
        this.createPiece(4, 7, "black", "king")
        this.createPiece(0, 0, "white", "rock")
        this.createPiece(7, 0, "white", "rock")
        this.createPiece(0, 7, "black", "rock")
        this.createPiece(7, 7, "black", "rock")
        this.createPiece(1, 0, "white", "knight")
        this.createPiece(6, 0, "white", "knight")
        this.createPiece(1, 7, "black", "knight")
        this.createPiece(6, 7, "black", "knight")
        this.createPiece(2, 0, "white", "bishop")
        this.createPiece(5, 0, "white", "bishop")
        this.createPiece(2, 7, "black", "bishop")
        this.createPiece(5, 7, "black", "bishop")
        this.createPiece(3, 0, "white", "queen")
        this.createPiece(3, 7, "black", "queen")

        this.createPiece(0, 1, "white", "pawn")
        this.createPiece(1, 1, "white", "pawn")
        this.createPiece(2, 1, "white", "pawn")
        this.createPiece(3, 1, "white", "pawn")
        this.createPiece(4, 1, "white", "pawn")
        this.createPiece(5, 1, "white", "pawn")
        this.createPiece(6, 1, "white", "pawn")
        this.createPiece(7, 1, "white", "pawn")
        this.createPiece(0, 6, "black", "pawn")
        this.createPiece(1, 6, "black", "pawn")
        this.createPiece(2, 6, "black", "pawn")
        this.createPiece(3, 6, "black", "pawn")
        this.createPiece(4, 6, "black", "pawn")
        this.createPiece(5, 6, "black", "pawn")
        this.createPiece(6, 6, "black", "pawn")
        this.createPiece(7, 6, "black", "pawn")
    }

    createPiece(x, y, color, type){
        switch(type){
            case "king":
                this.board[x][y] = new King(x, y, color, this.place.bind(this), this.move.bind(this));
                break;
            case "queen":
                this.board[x][y] = new Queen(x, y, color, this.place.bind(this), this.move.bind(this));
                break;
            case "rock":
                this.board[x][y] = new Rock(x, y, color, this.place.bind(this), this.move.bind(this));
                break;
            case "bishop":
                this.board[x][y] = new Bishop(x, y, color, this.place.bind(this), this.move.bind(this));
                break;
            case "knight":
                this.board[x][y] = new Knight(x, y, color, this.place.bind(this), this.move.bind(this));
                break;
            case "pawn":
                this.board[x][y] = new Pawn(x, y, color, this.place.bind(this), this.move.bind(this));
                break;
 
        }
        
    }

    paintBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 == 0) {

                    this.context.fillStyle = "#ffffff";
                } else {

                    this.context.fillStyle = "#8B4513";
                }

                this.context.fillRect(i * CONSTANTS.BOARD_SIZE / 8, j * CONSTANTS.BOARD_SIZE / 8, CONSTANTS.BOARD_SIZE / 8, CONSTANTS.BOARD_SIZE / 8)
            }
        }
    }

    createBoard() {
        let board = [];
        for (let i = 0; i < 8; i++) {
            board[i] = [];
            for (let j = 0; j < 8; j++) {
                board[i][j] = null;
            }
        }
        return board;
    }
}