import { Piece } from './Piece'

export class King extends Piece {


    constructor(x,y,color, place, move){
        super(x, y, place, move);
        this.image = document.getElementById("king_" +color);
        
    }

    getImage(){
        return this.image;
    }

}