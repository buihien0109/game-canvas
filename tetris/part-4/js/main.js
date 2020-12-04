const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ROW = 18;
const COL = 10;
const SQ = 40;
const COLOR = "WHITE";

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = "#ccc";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

let board = [];
for (let r = 0; r < ROW; r++) {
    board[r] = [];
    for (let c = 0; c < COL; c++) {
        board[r][c] = COLOR;
    }
}

function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();

class Piece {
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;
        
        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];

        this.x = 3;
        this.y = -2;
    }

    fill(color) {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }

    draw() {
        this.fill(this.color)
    }

    unDraw() {
        this.fill(COLOR)
    }

    moveDown() {
        this.unDraw();
        this.y++;
        this.draw();
    }

    moveLeft() {
        if(!this.collision(-1 , 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    moveRight() {
        if(!this.collision(1 , 0, this.activeTetromino)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }

    collision(x, y, piece) {
        for(let r = 0; r < piece.length; r++) {
            for(let c = 0; c < piece.length; c++) {
                if(!piece[r][c]) {
                    continue
                }

                let newX = this.x + c + x;
                let newY = this.y + r + y;

                if(newX < 0 || newX >= COL || newY >= ROW) {
                    return true
                }

                if(newY < 0) {
                    continue
                }

                if(board[newY][newX] != COLOR) {
                    return true
                }
            }
        }
        return false;
    }
}

const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

let p = randomPiece();
console.log(p);

document.addEventListener('keydown', function(e) {
    if(e.keyCode == 37) {
        p.moveLeft();
    } else if(e.keyCode == 39) {
        p.moveRight();
    } else if(e.keyCode == 38) {
        
    } else if(e.keyCode == 40) {
        p.moveDown();
    }
})

let gameOver = false;
let interval;

function drop() {
    interval = setInterval(function() {
        if(!gameOver) {
            p.moveDown();
        } else {
            clearInterval(interval)
        }
    }, 1000)
}

drop();