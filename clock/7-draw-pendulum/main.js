const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Khởi tạo class Hình tròn
class Arc {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}

// Khởi tạo class Hình chữ nhật
class Rect {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.fillStyle = this.color;
        c.fill();
    }
}

// Class Clock
class Clock {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    drawFace() {
        let rect = new Rect(this.x - this.radius, this.y - this.radius * 1.5, 2 * this.radius, 4 * this.radius, '#f0e5d0')
        rect.draw();

        let rect1 = new Rect(this.x - this.radius * 0.5, this.y - this.radius * 1.6, this.radius, 4.8 * this.radius, '#937a62')
        rect1.draw();
        
        let arc1 = new Arc(this.x, this.y, this.radius * 1.2, '#cba370');
        arc1.draw();

        let arc = new Arc(this.x, this.y, this.radius, '#EBEAE4');
        arc.draw();

        let arc2 = new Arc(this.x, this.y, this.radius * 0.08, '#000');
        arc2.draw();
    }

    drawDot() {
        let radianPerDot = Math.PI / 30;
        let ang;
        let dot;
        for(let i = 1; i < 61 ; i++) {
            ang = i * radianPerDot;
            if( i % 5 == 0) {
                dot = new Arc(
                    this.x + this.radius * Math.sin(ang) * 0.8,
                    this.y - this.radius * Math.cos(ang) * 0.8,
                    this.radius * 0.02, 
                    '#000'
                )
            } else {
                dot = new Arc(
                    this.x + this.radius * Math.sin(ang) * 0.8,
                    this.y - this.radius * Math.cos(ang) * 0.8,
                    this.radius * 0.005, 
                    '#000'
                )
            }
            dot.draw();
        }
    }

    drawNum() {
        let radiusPerNum = Math.PI / 6;
        let ang;

        c.font = "24px Arial";
        c.textBaseline = "middle";
        c.textAlign = "center";

        for(let i = 1; i < 13; i++) {
            ang = i * radiusPerNum;
            c.fillStyle = "#000";
            c.fillText(`${i}`, this.x + this.radius * Math.sin(ang) * 0.9, this.y - this.radius * Math.cos(ang) * 0.9);
        }
    }

    drawHand(angle, length, width, color) {
        c.beginPath();
        c.lineWidth = width;
        c.lineCap = 'round';
        c.strokeStyle = color;

        c.moveTo(this.x, this.y);
        c.lineTo(this.x + length * Math.sin(angle), this.y - length * Math.cos(angle));

        c.stroke();
    }

    drawTime() {
        let now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        let milisecond = now.getMilliseconds();

        hour = hour % 12;

        let angHour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (6 * 3600));
        let angMinute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        let angSecond = (second * Math.PI / 30) + (milisecond * Math.PI / 30000);

        // Kim giờ
        this.drawHand(angHour, radius * 0.5, 15, '#000');
        // Kim phút
        this.drawHand(angMinute, radius * 0.7, 10, '#000');
        // Kim giấy
        this.drawHand(angSecond, radius * 0.8, 4, "#F7633A");
    }

    drawText() {
        c.beginPath();
        c.font = '20px Arial';
        c.textAlign = 'center';
        c.fillText(getDate(),this.x,this.y-this.radius*0.6);    
    }
}

class Pendulum {
    constructor(x, y, length, radius, angle) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.radius = radius;
        this.angle = angle;
    }

    update() {
        c.beginPath();
        c.lineWidth = 4;
        c.lineCap = "round";
        c.moveTo(this.x, this.y);
        c.strokeStyle = "white";
        c.lineTo(
            this.x + this.length * Math.cos(this.angle), 
            this.y + this.length * Math.sin(this.angle)
        ) 
        c.stroke();
        
        c.beginPath();
        c.arc(
            this.x + (this.length + this.radius) * Math.cos(this.angle), 
            this.y + (this.length + this.radius)* Math.sin(this.angle), 
            this.radius, 
            0, 
            Math.PI * 2, 
            false
        );
        
        c.fillStyle = '#e3e5e4';
        c.fill();
        c.stroke();
        c.closePath();
    }
}

let radius = canvas.height / 5;
let centerX = canvas.width /2;
let centerY = canvas.height / 3;

let clock = new Clock(centerX, centerY, radius);
let pendulum = new Pendulum(centerX, centerY, canvas.height / 2, 35, Math.PI / 3);

function updateClock() {
    clock.drawFace();
    clock.drawDot();
    clock.drawNum();
    clock.drawTime();
    clock.drawText();

}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    updateClock();
    pendulum.update();
}

animate();

function getDate() {
    let date = new Date();

    let ampm = date.getHours() >= 12 ? ' PM' : ' AM';

    let hour = ('0' + (date.getHours() % 12)).slice(-2);
    let minute = ('0' + (date.getMinutes())).slice(-2);
    let second = ('0' + (date.getSeconds())).slice(-2);

    return `${hour}:${minute}:${second} ${ampm}`;
}