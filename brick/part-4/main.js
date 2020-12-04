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

function moveBall() {
    if(isRunning) {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if( ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
            ball.dx *= -1;
        }

        if(ball.y - ball.size < 0) {
            ball.dy *= -1;
        }

        if(ball.y + ball.size > canvas.height) {
            console.log('End game');
            isRunning = false;
        }
    }
}

function movePaddle() {
    paddle.x += paddle.dx;

    if(paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0) {
        paddle.x = 0;
    }
}

function keyDown(e) {
    if(e.keyCode == 39) {
        paddle.dx = paddle.speed;
    } else if(e.keyCode == 37) {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if(e.keyCode == 39 || e.keyCode == 37) {
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
}

function update() {
    requestAnimationFrame(update);
    movePaddle();
    moveBall();
    draw();
}

update();