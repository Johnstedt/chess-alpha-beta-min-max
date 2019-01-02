import {deepCopy} from './pieces/copyPiece'
import {calculateMove, evaluateBoard} from './calculateMove'

import { King } from './pieces/King'
import { Queen } from './pieces/Queen'
import { Rock } from './pieces/Rock'
import { Bishop } from './pieces/Bishop'
import { Knight } from './pieces/Knight'
import { Pawn } from './pieces/Pawn'

export class Evaluator {

    constructor(place, move) {
        this.place = place
        this.move = move
     }


    getPieceValue(piece) {
        switch (piece.constructor.name) {
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

    getBestMove(board, depth, turn){
        let nBoard = this.convertBoardFromUI(board)
        return this.convertBoardToUI(this.getBestMoveRec(nBoard, depth, turn))
    }

    getBestMoveRec(board, depth, turn) {
        
        
        var boards = [];
        var tempBoards = [];
        
        boards = calculateMove(board, turn)
        
        
        let firstBoard = [];
        let worstScore;
        let winning;

        if(depth > 0){
            for (let i = 0; i < boards.length; i++) {
                firstBoard[i] = JSON.parse(JSON.stringify(boards[i].board))
                console.log(i)
                tempBoards.push(this.getBestMoveRec(boards[i].board, depth -1, turn +1))
            }
            boards = tempBoards;
        }
        
        if(depth > 0){
            console.log("HERE")
            console.log(boards)
        }

        if (turn % 2 === 1) { //MIN
            worstScore = 2000;
            winning = null

            for (let i = 0; i < boards.length; i++) {
                if (boards[i].score < worstScore) {
                    winning = i
                    worstScore = boards[i].score
                }
            }
        }
        else { // MAX
            worstScore = -2000;
            winning = null
            for (let i = 0; i < boards.length; i++) {
                if (boards[i].score > worstScore) {
                    winning = i
                    worstScore = boards[i].score
                }
            }
        }
        if(depth > 0){
            console.log("Finaley")
            console.log(firstBoard[winning])
            return firstBoard[winning]
        } else {
            return boards[winning];
        }
    }

    getAllLegalMoves(board, pieces, score) {
        let boards = [];
        for (let i = 0; i < pieces.length; i++) {
            boards = boards.concat(pieces[i].getAllLegalMoves(board, score))
        }
        
        return boards
    }

    convertBoardFromUI(board){
        let newB = [];
        for(let i = 0; i < board.length; i++){
            newB[i] = []
            for(let j = 0; j < board.length; j++){
                if(board[i][j]){
                    newB[i][j] = this.getLetterFromPiece(board[i][j])
                } else{
                    board[i][j] = null;
                }
            }
        }
        return newB
    }

    convertBoardToUI(board){
        let newB = [];
        for(let i = 0; i < board.length; i++){
            newB[i] = []
            for(let j = 0; j < board.length; j++){
                if(board[i][j]){
                    newB[i][j] = this.getPiecesFromLetters(board[i][j])
                } else{
                    board[i][j] = null;
                }
            }
        }
        console.log(newB)
        return newB
    }

    getLetterFromPiece(obj){
        let letters = ""
        switch (obj.constructor.name) {
            case "King":
                letters = "K"
                break;
            case "Queen":
                letters = "Q"
                break;
            case "Rock":
                letters = "R"
                break;
            case "Bishop":
                letters = "B"
                break;
            case "Knight":
                letters = "H"
                break;
            case "Pawn":
                letters = "P"
                break;
        }
        if(obj.color === "white"){
            letters = letters.concat("W")
        } else {
            letters = letters.concat("B")
        }
        return letters;
    }

    getPiecesFromLetters(letters, x, y, place, move) {
        let color;
        if(letters.charAt(1) === "W"){
            color = "white"
        } else {
            color = "black"
        }
        switch (letters.charAt(0)) {
            case "K":
                return new King(x, y, color, this.place, this.move);
                break;
            case "Q":
                return new Queen(x, y, color, this.place, this.move);
                break;
            case "R":
                return new Rock(x, y, color, this.place, this.move);
                break;
            case "B":
                return new Bishop(x, y, color, this.place, this.move);
                break;
            case "H":
                return new Knight(x, y, color, this.place, this.move);
                break;
            case "P":
                return new Pawn(x, y, color, this.place, this.move);
                break;

        }
    }
}