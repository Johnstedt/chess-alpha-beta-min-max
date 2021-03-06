
const kingBoard = [
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
    [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0]
]

const queenBoard = [
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
    [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
]

const rockBoard = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, -0.5],
]

const bishopBoard = [
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
]

const knightBoard = [
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0 ],
    [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
    [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
    [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
    [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
    [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
    [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0 ]
]

const pawnBoard = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
    [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
    [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
    [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
    [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
    [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
]

function getPieceValue(piece, x, y) {
    let val = 0;
    let m = 1
    if(piece.charAt(1) == "B"){
        y = 7 - y
        m = -1
    }
    switch (piece.charAt(0)) {
        case "P":
            val = (m * 10) + (m * pawnBoard[x][y]);
            break;
        case "H":
            val = (m * 30) + (m * knightBoard[x][y]);
            break;
        case "B":
            val = (m * 30) + (m * bishopBoard[x][y]);
            break;
        case "R":
            val = (m * 50) + (m * rockBoard[x][y]);
            break;
        case "Q":
            val = (m * 90) + (m * queenBoard[x][y]);
            break;
        case "K":
            val = (m * 10000) + (m * kingBoard[x][y]);
            break;
    }
    
  return val;
}

export function evaluateBoard(board) {
    let obj = {};
    let whiteScore = 0;
    let blackScore = 0;
    let blackPieces = [];
    let whitePieces = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j]) {
                if (board[i][j].charAt(1) === "W") {
                    whitePieces.push({ x: i, y: j })
                    whiteScore += getPieceValue(board[i][j], i, j)
                } else {
                    blackPieces.push({ x: i, y: j })
                    blackScore += getPieceValue(board[i][j], i, j)
                }
            }
        }
    }

    obj.whitePieces = whitePieces;
    obj.blackPieces = blackPieces;
    obj.boardScore = whiteScore + blackScore;

    return obj;
}

export function calculateMove(board, turn) {
    let nBoard = {}
    nBoard.board = board
    let obj = evaluateBoard(board)
    nBoard.score = obj.boardScore;
    let pieces;
    if (turn % 2 === 1) {
        pieces = obj.blackPieces
    } else {
        pieces = obj.whitePieces
    }
    let moves = []
    for (let i = 0; i < pieces.length; i++) {
        moves = moves.concat(getAllLegalMoves(nBoard, pieces[i].x, pieces[i].y))
    }
    return moves
}

function getAllLegalMoves(board, old_x, old_y) {
    switch (board.board[old_x][old_y].charAt(0)) {
        case "K":
            return allKingMoves(board, old_x, old_y)
        case "Q":
            return allQueenMoves(board, old_x, old_y);
        case "R":
            return allRockMoves(board, old_x, old_y);
        case "H":
            return allKnightMoves(board, old_x, old_y);
        case "B":
            return allBishopMoves(board, old_x, old_y);
        case "P":
            return allPawnMoves(board, old_x, old_y);

    }
}

function allKingMoves(board, old_x, old_y) {
    let boards = [];
    tryMove(board.board, boards, board.score, old_x, old_y, old_x + 1, old_y + 1);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x + 1, old_y - 1);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x + 1, old_y);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x, old_y + 1);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x, old_y - 1);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x - 1, old_y + 1);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x - 1, old_y - 1);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x - 1, old_y);

    return boards;
}

function allQueenMoves(board, old_x, old_y) {
    let moves = []
    moves = moves.concat(allRockMoves(board, old_x, old_y))
    moves = moves.concat(allBishopMoves(board, old_x, old_y))
    return moves;
}

function allRockMoves(board, old_x, old_y) {
    let boards = [];
    getFromDirection(board.board, boards, board.score, 1, 0, old_x, old_y);
    getFromDirection(board.board, boards, board.score, -1, 0, old_x, old_y);
    getFromDirection(board.board, boards, board.score, 0, 1, old_x, old_y);
    getFromDirection(board.board, boards, board.score, 0, -1, old_x, old_y);
    return boards;
}

function allBishopMoves(board, old_x, old_y) {
    let boards = [];
    getFromDirection(board.board, boards, board.score, 1, 1, old_x, old_y);
    getFromDirection(board.board, boards, board.score, 1, -1, old_x, old_y);
    getFromDirection(board.board, boards, board.score, -1, 1, old_x, old_y);
    getFromDirection(board.board, boards, board.score, -1, -1, old_x, old_y);
    return boards;
}

function allKnightMoves(board, old_x, old_y) {
    let boards = [];
    tryMove(board.board, boards, board.score, old_x, old_y, old_x + 2, old_y + 1);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x + 2, old_y - 1);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x + 1, old_y + 2);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x + 1, old_y - 2);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x - 1, old_y + 2);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x - 1, old_y - 2);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x - 2, old_y + 1);
    tryMove(board.board, boards, board.score, old_x, old_y, old_x - 2, old_y - 1);

    return boards;
}

function allPawnMoves(boar, old_x, old_y) {

    let score = boar.score
    let board = boar.board
    let boards = [];
    let x = old_x;
    let y;
    let y2;
    let dir;

    if (board[old_x][old_y].charAt(1) === "W") {
        y = old_y + 1;
        y2 = old_y + 2
    } else {
        y = old_y - 1;
        y2 = old_y - 2;
    }

    if (y >= 0 && y <= 7) {
        x = old_x;
        if (!board[x][y]) {
            let p_board = JSON.parse(JSON.stringify(board));
            p_board[x][y] = p_board[old_x][old_y]
            p_board[old_x][old_y] = null;
            
            boards.push({
                score: score - getPieceValue(p_board[x][y], old_x, old_y) + getPieceValue(p_board[x][y], x, y),
                board: p_board
            });
        }

        x = old_x + 1;
        if (x <= 7) {
            if (board[x][y]) {
                if (board[x][y].charAt(1) !== board[old_x][old_y].charAt(1)) {
                    let p_score = score - getPieceValue(board[x][y], x, y)
                    let p_board = JSON.parse(JSON.stringify(board));
                    p_board[x][y] = p_board[old_x][old_y]
                    p_board[old_x][old_y] = null;
                    boards.push({
                        score: p_score - getPieceValue(p_board[x][y], old_x, old_y) + getPieceValue(p_board[x][y], x, y),
                        board: p_board
                    });
                }
            }

        }
        x = old_x - 1;
        if (x >= 0) {
            if (board[x][y]) {
                if (board[x][y].charAt(1) !== board[old_x][old_y].charAt(1)) {

                    let p_score = score - getPieceValue(board[x][y], x, y)
                    let p_board = JSON.parse(JSON.stringify(board));
                    p_board[x][y] = p_board[old_x][old_y]
                    p_board[old_x][old_y] = null;
                    boards.push({
                        score: p_score - getPieceValue(p_board[x][y], old_x, old_y) + getPieceValue(p_board[x][y], x, y),
                        board: p_board
                    });
                }
            }
        }
    }

    x = old_x
    if (y2 >= 0 && y2 <= 7) {
        if (!board[x][y2]) {

            let p_board = JSON.parse(JSON.stringify(board));
            p_board[x][y2] = p_board[old_x][old_y]
            p_board[old_x][old_y] = null;
            boards.push({
                score: score - getPieceValue(p_board[x][y2], old_x, old_y) + getPieceValue(p_board[x][y2], x, y2),
                board: p_board
            });

        }
    }

    return boards;
}

function tryMove(board, boards, score, old_x, old_y, x, y) {

    if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {

        if (board[x][y]) {

            if (board[x][y].charAt(1) !== board[old_x][old_y].charAt(1)) {

                let p_score = score - getPieceValue(board[x][y], x, y)
                let p_board = JSON.parse(JSON.stringify(board))
                p_board[x][y] = p_board[old_x][old_y]
                p_board[old_x][old_y] = null;
                boards.push({
                    score: p_score - getPieceValue(p_board[x][y], old_x, old_y) + getPieceValue(p_board[x][y], x, y),
                    board: p_board
                });
            }
        } else {

            let p_board = JSON.parse(JSON.stringify(board))
            p_board[x][y] = p_board[old_x][old_y]
            p_board[old_x][old_y] = null;
            boards.push({
                score: score - getPieceValue(p_board[x][y], old_x, old_y) + getPieceValue(p_board[x][y], x, y),
                board: p_board
            });
        }
    }
}

function getFromDirection(board, boards, score, xDir, yDir, old_x, old_y) {
    let x = old_x;
    let y = old_y;

    x += xDir;
    y += yDir;
    while (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
        if (board[x][y]) {

            if (board[x][y].charAt(1) !== board[old_x][old_y].charAt(1)) {

                let p_score = score + getPieceValue(board[x][y], x, y)
                let p_board = JSON.parse(JSON.stringify(board))
                p_board[x][y] = p_board[old_x][old_y]
                p_board[old_x][old_y] = null;
                boards.push({
                    score: p_score - getPieceValue(p_board[x][y], old_x, old_y) + getPieceValue(p_board[x][y], x, y),
                    board: p_board
                });
            }
            break;
        } else {

            let p_board = JSON.parse(JSON.stringify(board))
            p_board[x][y] = p_board[old_x][old_y]
            p_board[old_x][old_y] = null;
            boards.push({
                score: score - getPieceValue(p_board[x][y], old_x, old_y) + getPieceValue(p_board[x][y], x, y),
                board: p_board
            });
        }
        x += xDir;
        y += yDir;
    }
}