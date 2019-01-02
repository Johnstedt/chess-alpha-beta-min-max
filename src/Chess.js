import "./styles.css";

import { King } from './pieces/King'
import { Queen } from './pieces/Queen'
import { Rock } from './pieces/Rock'
import { Bishop } from './pieces/Bishop'
import { Knight } from './pieces/Knight'
import { Pawn } from './pieces/Pawn'

import { Evaluator } from './Evaluator'
import { evaluateBoard } from './calculateMove'
import CONSTANTS from './config'

export class Chess {

    constructor() {
        this.chessBoard = document.getElementById("chessBoard");
        this.context = chessBoard.getContext("2d");
        this.evaluator = new Evaluator(this.place.bind(this), this.move.bind(this));
        this.board = this.createBoard()
        
        this.x = -1;
        this.y = -1;
        this.cur_x = -1
        this.cur_y = -1

        this.turn = 0;
        this.score = 0;

        this.initiatePiecesForGame()
    }

    play() {
        setInterval(() => {
            this.paintBoard();
            this.placePieces();
        }, 1000 / 15);
    }

    move(x_n, y_n, cur_x_n, cur_y_n) {
        this.x = x_n
        this.y = y_n
        this.cur_x = cur_x_n
        this.cur_y = cur_y_n
    }

    place(x_old, y_old, x_new, y_new) {

        let temp = this.board[x_old][y_old]

        if (this.turn % 2 === 0 && temp.color === "white" || this.turn % 2 === 1 && temp.color === "black" ){

            let type_move = temp.isLegalMove(this.board, x_new, y_new);
            if (type_move === true) {

                this.board[x_old][y_old] = null
                this.board[x_new][y_new] = temp

                this.turn++;
            }
            else if (type_move === "passant_white") {

                this.board[x_old][y_old] = null
                this.board[x_new][y_new - 1] = null
                this.board[x_new][y_new] = temp

                this.board[x_new][y_new].x = x_new
                this.board[x_new][y_new].y = y_new

                this.turn++;

            } else if (type_move === "passant_black") {

                this.board[x_old][y_old] = null
                this.board[x_new][y_new + 1] = null
                this.board[x_new][y_new] = temp

                this.board[x_new][y_new].x = x_new
                this.board[x_new][y_new].y = y_new

                this.turn++;
            }
            else if (type_move === "queen_white") {
                this.board[x_old][y_old] = null
                this.board[x_new][y_new] = new Queen(x_new, y_new, "white", this.place.bind(this), this.move.bind(this));

                this.turn++;
            }
            else if (type_move === "queen_black") {
                this.board[x_old][y_old] = null
                this.board[x_new][y_new] = new Queen(x_new, y_new, "black", this.place.bind(this), this.move.bind(this));
                this.turn++;
            }
            else if (type_move === "white_king_side") {
                
                this.board[x_new][y_new] = this.board[x_old][y_old]
                this.board[x_new - 1][y_new] = this.board[7][0]  
                this.board[x_old][y_old] = null
                this.board[7][0] = null

                this.board[x_new - 1][y_new].x = x_new - 1;
                this.turn++;
            }
            else if (type_move === "black_king_side") {
                this.board[x_new][y_new] = this.board[x_old][y_old]
                this.board[x_new - 1][y_new] = this.board[7][7]  
                this.board[x_old][y_old] = null
                this.board[7][7] = null

                this.board[x_new - 1][y_new].x = x_new - 1;
                this.turn++;
            }
            else if (type_move === "white_queen_side") {
                this.board[x_new][y_new] = this.board[x_old][y_old]
                this.board[x_new + 1][y_new] = this.board[0][0]  
                this.board[x_old][y_old] = null
                this.board[0][0] = null

                this.board[x_new + 1][y_new].x = x_new + 1;
                this.turn++;
            }
            else if (type_move === "black_queen_side") {
                this.board[x_new][y_new] = this.board[x_old][y_old]
                this.board[x_new + 1][y_new] = this.board[0][7]  
                this.board[x_old][y_old] = null
                this.board[0][7] = null

                this.board[x_new + 1][y_new].x = x_new + 1;
                this.turn++;
            }

            if(type_move !== false){
                this.score = evaluateBoard(this.evaluator.convertBoardFromUI(this.board)).bordScore
            }
        }
        this.x = -1;
        this.y = -1
        this.cur_x = -1
        this.cur_y = -1

        if(this.turn % 2 === 1){
            console.log("thinking...")
            /*var old_element = this.chessBoard;
            var new_element = old_element.cloneNode(true);
            
            old_element.parentNode.replaceChild(new_element, old_element);
            this.context = new_element.getContext("2d");
            this.chessBoard = new_element
            this.paintBoard()
            this.placePieces()*/
            this.board = this.evaluator.getBestMove(this.board, 1, this.turn);
            this.turn++;
            console.log(this.board) 
        }
    }

    placePieces() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board[i][j] != null) {

                    if (this.x == i && this.y == j) {
                        this.context.drawImage(this.getImage(this.board[i][j]), this.cur_x - (CONSTANTS.BOARD_SIZE / 16), this.cur_y - (CONSTANTS.BOARD_SIZE / 16), CONSTANTS.BOARD_SIZE / 8, CONSTANTS.BOARD_SIZE / 8);
                    }
                    else {
                        this.context.drawImage(this.getImage(this.board[i][j]), (i) * CONSTANTS.BOARD_SIZE / 8, (7 - j) * CONSTANTS.BOARD_SIZE / 8, CONSTANTS.BOARD_SIZE / 8, CONSTANTS.BOARD_SIZE / 8);
                    }
                }
            }
        }
    }

    initiatePiecesForGame() {
        this.createPiece(4, 0, "white", "King")
        this.createPiece(4, 7, "black", "King")
        this.createPiece(0, 0, "white", "Rock")
        this.createPiece(7, 0, "white", "Rock")
        this.createPiece(0, 7, "black", "Rock")
        this.createPiece(7, 7, "black", "Rock")
        this.createPiece(1, 0, "white", "Knight")
        this.createPiece(6, 0, "white", "Knight")
        this.createPiece(1, 7, "black", "Knight")
        this.createPiece(6, 7, "black", "Knight")
        this.createPiece(2, 0, "white", "Bishop")
        this.createPiece(5, 0, "white", "Bishop")
        this.createPiece(2, 7, "black", "Bishop")
        this.createPiece(5, 7, "black", "Bishop")
        this.createPiece(3, 0, "white", "Queen")
        this.createPiece(3, 7, "black", "Queen")

        this.createPiece(0, 1, "white", "Pawn")
        this.createPiece(1, 1, "white", "Pawn")
        this.createPiece(2, 1, "white", "Pawn")
        this.createPiece(3, 1, "white", "Pawn")
        this.createPiece(4, 1, "white", "Pawn")
        this.createPiece(5, 1, "white", "Pawn")
        this.createPiece(6, 1, "white", "Pawn")
        this.createPiece(7, 1, "white", "Pawn")
        this.createPiece(0, 6, "black", "Pawn")
        this.createPiece(1, 6, "black", "Pawn")
        this.createPiece(2, 6, "black", "Pawn")
        this.createPiece(3, 6, "black", "Pawn")
        this.createPiece(4, 6, "black", "Pawn")
        this.createPiece(5, 6, "black", "Pawn")
        this.createPiece(6, 6, "black", "Pawn")
        this.createPiece(7, 6, "black", "Pawn")
    }

    createPiece(x, y, color, type) {
        switch (type) {
            case "King":
                this.board[x][y] = new King(x, y, color, this.place.bind(this), this.move.bind(this));
                break;
            case "Queen":
                this.board[x][y] = new Queen(x, y, color, this.place.bind(this), this.move.bind(this));
                break;
            case "Rock":
                this.board[x][y] = new Rock(x, y, color, this.place.bind(this), this.move.bind(this));
                break;
            case "Bishop":
                this.board[x][y] = new Bishop(x, y, color, this.place.bind(this), this.move.bind(this));
                break;
            case "Knight":
                this.board[x][y] = new Knight(x, y, color, this.place.bind(this), this.move.bind(this));
                break;
            case "Pawn":
                this.board[x][y] = new Pawn(x, y, color, this.place.bind(this), this.move.bind(this));
                break;

        }
    }

    getImage(obj){

        switch (obj.constructor.name) {
            case "King":
                return this.king[obj.color];
                break;
            case "Queen":
                return this.queen[obj.color]
                break;
            case "Rock":
                return this.rock[obj.color]
                break;
            case "Bishop":
                return this.bishop[obj.color]
                break;
            case "Knight":
                return this.knight[obj.color]
                break;
            case "Pawn":
                return this.pawn[obj.color]
                break;

        }
    }
    getPieces(){
        this.king = []
        this.king["white"] = document.getElementById("king_white");
        this.king["black"] = document.getElementById("king_black");
        this.queen = []
        this.queen["white"] = document.getElementById("queen_white");
        this.queen["black"] = document.getElementById("queen_black");
        this.knight = []
        this.knight["white"] = document.getElementById("knight_white");
        this.knight["black"] = document.getElementById("knight_black");
        this.bishop = []
        this.bishop["white"] = document.getElementById("bishop_white");
        this.bishop["black"] = document.getElementById("bishop_black");
        this.pawn = []
        this.pawn["white"] = document.getElementById("pawn_white");
        this.pawn["black"] = document.getElementById("pawn_black");
        this.rock = []
        this.rock["white"] = document.getElementById("rock_white");
        this.rock["black"] = document.getElementById("rock_black");
        
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
        this.context.fillStyle = "#2b2b2b"
        this.context.fillRect(0, CONSTANTS.BOARD_SIZE, CONSTANTS.BOARD_SIZE, 15 )
        this.context.font = "12px Arial";
        this.context.fillStyle = "#fff"
        this.context.fillText(" Score: " + this.score + "     Depth: 4", 0, CONSTANTS.BOARD_SIZE+12);   
    }

    createBoard() {
        this.getPieces()
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