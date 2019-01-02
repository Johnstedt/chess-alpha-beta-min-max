import { King } from './King'
import { Queen } from './Queen'
import { Rock } from './Rock'
import { Bishop } from './Bishop'
import { Knight } from './Knight'
import { Pawn } from './Pawn'

export function deepCopy(board){
    let arr = []
    for(let i = 0; i < board.length; i++){
        arr[i] = []
        for(let j = 0; j < board.length; j++){
            if(board[i][j]){
               arr[i][j] = createPiece(board[i][j].x,board[i][j].y, board[i][j].color, board[i][j].constructor.name,board[i][j].place,board[i][j].move)
            }
            else {
                arr[i][j] = null
            }
        }
    }
    
    return arr;
}

function createPiece(x, y, color, type, place, move) {
    switch (type) {
        case "King":
            return new King(x, y, color, place, move);
            break;
        case "Queen":
            return new Queen(x, y, color, place, move);
            break;
        case "Rock":
            return new Rock(x, y, color, place, move);
            break;
        case "Bishop":
            return new Bishop(x, y, color, place, move);
            break;
        case "Knight":
            return new Knight(x, y, color, place, move);
            break;
        case "Pawn":
            return new Pawn(x, y, color, place, move);
            break;

    }
}