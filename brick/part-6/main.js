// Ẩn hiện luật chơi
const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");

rulesBtn.addEventListener("click", function () {
    rules.classList.add("show");
});

closeBtn.addEventListener("click", function () {
    rules.classList.remove("show");
});

// Game board
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;
let isRunning = true;

const brickRowCount = 9;
const brickColumnCount = 5;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
};

const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
};

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
};

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {
            x,
            y,
            ...brickInfo,
        };
    }
}

console.log(bricks);

// Vẽ quả bóng
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
}

// Vẻ thanh đệm
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Vẽ điểm người chơi
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}

function moveBall() {
    if (isRunning) {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
            ball.dx *= -1;
        }

        if (ball.y - ball.size < 0) {
            ball.dy *= -1;
        }

        if (ball.y + ball.size > canvas.height) {
            console.log('End game');
            isRunning = false;
        }

        // Paddle collision
        if (
            ball.x - ball.size > paddle.x &&
            ball.x + ball.size < paddle.x + paddle.w &&
            ball.y + ball.size > paddle.y
        ) {
            ball.dy = -ball.speed;
        }

        // Brick collision
        bricks.forEach(column => {
            column.forEach(brick => {
                if (brick.visible) {
                    if (
                        ball.x - ball.size > brick.x && // left brick side check
                        ball.x + ball.size < brick.x + brick.w && // right brick side check
                        ball.y + ball.size > brick.y && // top brick side check
                        ball.y - ball.size < brick.y + brick.h // bottom brick side check
                    ) {
                        ball.dy *= -1;
                        brick.visible = false;

                        updateScore();
                    }
                }
            });
        });
    }
}

// update score
function updateScore() {
    score++;
  
    if (score % (brickRowCount * brickRowCount) === 0) {
        console.log("Win game");
        isRunning = false;
    }
}

function movePaddle() {
    paddle.x += paddle.dx;

    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

function keyDown(e) {
    if (e.keyCode == 39) {
        paddle.dx = paddle.speed;
    } else if (e.keyCode == 37) {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (e.keyCode == 39 || e.keyCode == 37) {
        paddle.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

function update() {
    requestAnimationFrame(update);
    movePaddle();
    moveBall();
    draw();
}

update();