export class Evaluator {

    constructor(){

    }

    evaluateBoard(board){
        let obj = {};
        let whiteScore = 0;
        let blackScore = 0;
        let blackPieces = [];
        let whitePieces =  [];

        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(board[i][j]){
                    if(board[i][j].color === "white"){
                        whitePieces.push(board[i][j])
                        whiteScore += this.getPieceValue(board[i][j])
                        console.log(whiteScore)
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

        console.log(obj.boardScore)

        return obj;
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