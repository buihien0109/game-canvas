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
}

let radius = canvas.height / 5;
let centerX = canvas.width /2;
let centerY = canvas.height / 3;

let clock = new Clock(centerX, centerY, radius);
clock.drawFace();
clock.drawDot();
clock.drawNum();