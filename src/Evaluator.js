import {deepCopy} from './pieces/copyPiece'

export class Evaluator {

    constructor() { }

    evaluateBoard(board) {
        let obj = {};
        let whiteScore = 0;
        let blackScore = 0;
        let blackPieces = [];
        let whitePieces = [];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j]) {
                    if (board[i][j].color === "white") {
                        whitePieces.push(board[i][j])
                        whiteScore += this.getPieceValue(board[i][j])
                    } else {
                        blackPieces.push(board[i][j])
                        blackScore += this.getPieceValue(board[i][j])
                    }
                }
            }
        }

        obj.whitePieces = whitePieces;
        obj.blackPieces = blackPieces;
        obj.boardScore = whiteScore - blackScore;

        return obj;
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

    getBestMove(board, depth, turn) {
        let obj = this.evaluateBoard(board)
        var boards = [];
        var tempBoards = [];
        if(turn % 2 === 1){
            boards = this.getAllLegalMoves(board, obj.blackPieces, obj.boardScore)
        } else {
            boards = this.getAllLegalMoves(board, obj.whitePieces, obj.boardScore)
        }
        
        let firstBoard = [];
        let worstScore;
        let winning;

        if(depth > 0){
            for (let i = 0; i < boards.length; i++) {
                firstBoard[i] = deepCopy(boards[i].board)
                console.log(i)
                tempBoards.push(this.getBestMove(boards[i].board, depth -1, turn +1))
            }
            boards = tempBoards;
        }
        
        if(depth > 0){
            console.log("HERE")
            console.log(boards)
        }

        if (turn % 2 === 1) { //MIN
            worstScore = 200;
            winning = null

            for (let i = 0; i < boards.length; i++) {
                if (boards[i].score < worstScore) {
                    winning = i
                    worstScore = boards[i].score
                }
            }
        }
        else { // MAX
            worstScore = -200;
            winning = null
            for (let i = 0; i < boards.length; i++) {
                if (boards[i].score > worstScore) {
                    winning = i
                    worstScore = boards[i].score
                }
            }

        }
        if(depth > 0){
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
}