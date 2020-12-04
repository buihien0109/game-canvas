const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

class Board {
	constructor(cellWidth, row, col) {
		this.cellWidth = cellWidth;
		this.row = row;
		this.col = col;

		canvas.width = this.col * this.cellWidth;
		canvas.height = this.row * this.cellWidth;

		this.data = [];
		this.create2DArray();
		this.xTurn = true;
	}

	create2DArray() {
		for (let i = 0; i < this.row; i++) {
            this.data[i] = []
            for (let j = 0; j < this.col; j++) {
                this.data[i][j] = 0;
            }
		}
		console.log(this.data);
	}

	drawGrid() {
		c.lineWidth = 1;
		// Vẽ đường kẻ ngang
		for(let i = 0; i <= this.row; i++) {
			c.beginPath();
			if(i == 0 || i == this.row) {
				c.strokeStyle = '#000';
			} else {
				c.strokeStyle = '#777';
			}
			c.moveTo(0, i * this.cellWidth);
			c.lineTo(this.col * this.cellWidth, i * this.cellWidth);
			c.stroke();
			c.closePath();
		}

		// Vẽ đường kẻ dọc
		for(let j = 0; j <= this.col; j++) {
			c.beginPath();
			if(j == 0 || j == this.col) {
				c.strokeStyle = '#000';
			} else {
				c.strokeStyle = '#777';
			}
			c.moveTo(j * this.cellWidth, 0);
			c.lineTo(j * this.cellWidth, this.row * this.cellWidth);
			c.stroke();
			c.closePath();
		}
	}

	handleClick(e) {
		let x = e.offsetX;
		let y = e.offsetY;
		
		let i = Math.floor(y / this.cellWidth);
		let j = Math.floor(x / this.cellWidth);
		
		if(i >= 0 && j>=0 && this.data[i][j] === 0) {
			if(this.xTurn) {
				this.data[i][j] = 1
			} else {
				this.data[i][j] = 2
			}
			this.xTurn = !this.xTurn
		}
		console.log(this.data);
	}
}

const board = new Board(40, 10, 10);
board.drawGrid();

canvas.addEventListener('click', function(e) {
	board.handleClick(e);
})