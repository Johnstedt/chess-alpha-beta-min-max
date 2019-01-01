import { Piece } from './Piece'

export class Queen extends Piece {

    constructor(x, y, color, place, move) {
        super(x, y, color, place, move);
        this.image = document.getElementById("queen_" + color);

    }

    getImage() {
        return this.image;
    }

    isLegalMove(board, x, y) {

        //Can't take own pieces
        if (board[x][y]) {
            if (board[x][y].color === this.color) {
                return false;
            }
        }

        //Move in diagonal
        if (Math.abs(this.x - x) === Math.abs(this.y - y)) {

            // Not blocking 
            let dirX;
            let dirY;
            let lx = this.x
            let ly = this.y

            if (this.y < y) {
                if (this.x > x) {
                    dirX = -1;
                    dirY = 1;
                } else {
                    dirX = 1;
                    dirY = 1;
                }
            } else {
                if (this.x > x) {
                    dirX = -1;
                    dirY = -1;
                } else {
                    dirX = 1;
                    dirY = -1;
                }
            }
            while (ly + dirY !== y) {
                ly = ly + dirY;
                lx = lx + dirX
                if (board[lx][ly]) {
                    return false
                }
            }

            this.x = x;
            this.y = y;
            return true
        }

        //Move in one line
        if (this.x === x || this.y === y) {
            //Something blocking y axis
            if (this.x === x) {
                let dir;
                let ly = this.y
                if (this.y > y) {
                    dir = -1;
                } else {
                    dir = 1;
                }
                while (ly + dir !== y) {
                    ly = ly + dir;
                    if (board[x][ly]) {
                        return false
                    }
                }
            }

            //Something blocking x axis
            if (this.y === y) {
                let dir;
                let lx = this.x
                if (this.x > x) {
                    dir = -1;
                } else {
                    dir = 1;
                }

                while ((lx + dir) !== x) {
                    lx = lx + dir;
                    if (board[lx][y]) {
                        return false
                    }
                }
            }

            this.x = x;
            this.y = y;
            return true
        }

        return false

    }

    getAllLegalMoves(board, score){
        let boards = [];
        this.getFromDirection(board, boards, score, 1, 1);
        this.getFromDirection(board, boards, score, 1, -1);
        this.getFromDirection(board, boards, score, -1, 1);
        this.getFromDirection(board, boards, score, -1, -1);

        //North
        let x = this.x;
        let y = this.y;
        while (y < 7) {

            y++;
            if (board[x][y]) {

                if (board[x][y].color !== this.color) {

                    let p_score = score + super.getScoreChange(board[x][y])
                    let p_board = JSON.parse(JSON.stringify(board));
                    p_board[x][y] = p_board[x][this.y]
                    p_board[x][this.y] = null;
                    boards.push({
                        score: p_score,
                        board: p_board
                    });
                }
                break;
            } else {

                let p_board = JSON.parse(JSON.stringify(board));
                p_board[x][y] = p_board[x][this.y]
                p_board[x][this.y] = null;
                boards.push({
                    score: score,
                    board: p_board
                });
            }
        }

        //South
        x = this.x;
        y = this.y;
        while (y > 0) {

            y--;
            if (board[x][y]) {

                if (board[x][y].color !== this.color) {

                    let p_score = score + super.getScoreChange(board[x][y])
                    let p_board = JSON.parse(JSON.stringify(board));
                    p_board[x][y] = p_board[x][this.y]
                    p_board[x][this.y] = null;
                    boards.push({
                        score: p_score,
                        board: p_board
                    });
                }
                break;
            } else {

                let p_board = JSON.parse(JSON.stringify(board));
                p_board[x][y] = p_board[x][this.y]
                p_board[x][this.y] = null;
                boards.push({
                    score: score,
                    board: p_board
                });
            }
        }


        //East
        x = this.x;
        y = this.y;
        while (x < 7) {

            x++;
            if (board[x][y]) {

                if (board[x][y].color !== this.color) {

                    let p_score = score + super.getScoreChange(board[x][y])
                    let p_board = JSON.parse(JSON.stringify(board));
                    p_board[x][y] = p_board[this.x][y]
                    p_board[this.x][y] = null;
                    boards.push({
                        score: p_score,
                        board: p_board
                    });
                }
                break;
            } else {

                let p_board = JSON.parse(JSON.stringify(board));
                p_board[x][y] = p_board[this.x][y]
                p_board[this.x][y] = null;
                boards.push({
                    score: score,
                    board: p_board
                });
            }
        }

        //West
        x = this.x;
        y = this.y;
        while (x > 0) {

            x--;
            if (board[x][y]) {

                if (board[x][y].color !== this.color) {

                    let p_score = score + super.getScoreChange(board[x][y])
                    let p_board = JSON.parse(JSON.stringify(board));
                    p_board[x][y] = p_board[this.x][y]
                    p_board[this.x][y] = null;
                    boards.push({
                        score: p_score,
                        board: p_board
                    });
                }
                break;
            } else {

                let p_board = JSON.parse(JSON.stringify(board));
                p_board[x][y] = p_board[this.x][y]
                p_board[this.x][y] = null;
                boards.push({
                    score: score,
                    board: p_board
                });
            }
        }
        return boards;

   }

   getFromDirection(board, boards, score, xDir, yDir){
       let x = this.x;
       let y = this.y;

       x += xDir;
       y += yDir;
       while ( x >= 0 && y >= 0 && x <= 7 && y <= 7) {
           
           if (board[x][y]) {

               if (board[x][y].color !== this.color) {

                   let p_score = score + this.getScoreChange(board[x][y])
                   let p_board = JSON.parse(JSON.stringify(board));
                   p_board[x][y] = p_board[this.x][y]
                   p_board[this.x][y] = null;
                   boards.push({
                       score: p_score,
                       board: p_board
                   });
               }
               break;
           } else {

               let p_board = JSON.parse(JSON.stringify(board));
               p_board[x][y] = p_board[this.x][y]
               p_board[this.x][y] = null;
               boards.push({
                   score: score,
                   board: p_board
               });
           }
           x += xDir;
           y += yDir;
       }
   }


}