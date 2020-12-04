let canvas = document.getElementById("canvas");

class FreeHand {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.isDraw = false;
        this.points = [];

        this.context.lineWidth = 2;
        this.context.lineJoin = "round";
        this.context.lineCap = "round";
        this.context.strokeStyle = "#FFF";

        this.memCanvas = document.createElement("canvas");
        this.memCanvas.width = canvas.width;
        this.memCanvas.height = canvas.height;
        this.memCtx = this.memCanvas.getContext("2d");
    }

    onmousedown(event) {
        this.x = event.offsetX;
        this.y = event.offsetY;

        this.points.push({
            x: this.x,
            y: this.y,
        });

        this.isDraw = true;
    }

    onmousemove(event) {
        if(this.isDraw) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(this.memCanvas, 0, 0);

            this.points.push({
                x: event.offsetX,
                y: event.offsetY,
            });

            this.drawPoints();
        }
    }

    onmouseup() {
        if (this.isDraw) {
            this.isDraw = false;

            this.memCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.memCtx.drawImage(this.canvas, 0, 0);
            this.points = [];
        }
    }

    drawPoints() {
        
    }
}



