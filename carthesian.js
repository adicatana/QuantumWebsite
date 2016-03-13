var coords = (function(){
	var canvas = document.getElementById("coords");
	var ctx = canvas.getContext("2d");
 
	var cursorX = 0;
	var cursorY = 0;
 
	function draw() {
		var z = new objectUtils.buildSeg(100, 100, 30, 140, 1); 
		var y = new objectUtils.buildSeg(100, 100, 100, 20, 1); 
		var x = new objectUtils.buildSeg(100, 100, 180, 100, 1); 
 
		x.draw(ctx);
		y.draw(ctx);
		z.draw(ctx);
	}
 
	function clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
 
	function getCursor(event) {
		cursorX = event.pageX - canvas.offsetLeft;
		cursorY = event.pageY - canvas.offsetTop;
	}

	function spawn() {
		ctx.setLineDash([5]);
		var ln = new objectUtils.buildSeg(100, 100, cursorX, cursorY, 2); 
		ln.draw(ctx);
 
		ctx.setLineDash([0]);
		ctx.setLineDash([0]);
 
		ctx.font = "15px Arial";
		ctx.fillText("M(x, y, z)", cursorX, cursorY);
	}
 
	draw();
 
	return {
		mm : function(event){
			clear();
			draw();
			getCursor(event);
			if ( cursorX >= 0 && cursorY >= 0 && 
				 cursorX <= canvas.width && 
				 cursorY <= canvas.height ) {
				spawn();
			}
		}
	};
})();

var graphic = function(id, offset, size) {
	this.canvas  = document.getElementById(id);
	this.ctx     = this.canvas.getContext("2d");

	this.cursorX = 0;
	this.cursorY = 0;
	this.size = size;
	this.offset = offset;

	var x1 = 10;
	var y1 = 10;

	var x2 = size;
	var y2 = size; 

	this.isInside = function(x, y) {
		return x1 + offset <= x && x <= x2 + offset && y1 <= y && y <= y2; 
	};

	this.clear = function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	this.draw = function() {
		this.ctx.fillText("x" ,this.cursorX, this.cursorY);
	};

	this.makeGrid = function() {
		this.ctx.setLineDash([0]);
		this.ctx.moveTo(offset + 10, size);
		this.ctx.lineTo(offset + size, size);
		this.ctx.stroke();
		
		this.ctx.moveTo(offset + 10, 0);
		this.ctx.lineTo(offset + 10, size);
		this.ctx.stroke();

		this.ctx.font = "15px Arial";
		this.ctx.fillText("y", offset - 3, 10);
		this.ctx.fillText("x", offset + size - 10, size + 13);
		this.ctx.fillText("0", offset + 0, size + 13);
		this.ctx.fillText(">", offset + size - 7, size + 5);
		this.ctx.fillText("^", offset + 6, 10);
	};

	this.update = function(event) {
		this.cursorX = event.pageX - this.canvas.offsetLeft;
		this.cursorY = event.pageY - this.canvas.offsetTop;
	};

	this.line = function(x, y, x2, y2) {
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	};
};

var draw = (function() {
	var g1 = new graphic("myCanvas", 120, 120);
	var g2 = new graphic("myCanvas2", 120, 120);
	var g3 = new graphic("myCanvas3", 120, 120);

	g1.makeGrid();
	g2.makeGrid();
	g3.makeGrid();

	g1.draw = function() {
		var ctx = this.ctx;
		var x = this.cursorX;
		var y = this.cursorY;

		ctx.fillText("M(x,y)", x, y);

		ctx.setLineDash([5]);

		this.line(x, y, 10 + this.offset, y);
		this.line(x, y, x, this.size);
		this.line(0, 0, 0, 0);
	};

	g2.draw = function() {
		var ctx = this.ctx;
		var x = this.cursorX;
		var y = this.cursorY;

		ctx.fillText("M(x,y)", x, y);

		ctx.setLineDash([5]);

		var x2 = x;
		var y2 = 2 * this.size - y;

		this.line(x, y, x2, y2);
		this.line(0, 0, 0, 0);

		ctx.fillText("M'(x,-y)", x2 ,y2);
	};

	g3.draw = function() {
		var ctx = this.ctx;
		var x = this.cursorX;
		var y = this.cursorY;

		ctx.fillText("M(x,y)", x, y);

		ctx.setLineDash([5]);

		var x2 = 2 * (this.size + 10) - x;
		var y2 = 2 * this.size - y;

		this.line(x, y, x2, y2);
		this.line(0, 0, 0, 0);

		ctx.fillText("M''(-x,-y)", x2 ,y2);
	};

	document.onmousemove = function(event){
		coords.mm(event);

		g1.clear();
		g2.clear();
		g3.clear();

		g1.makeGrid();
		g2.makeGrid();
		g3.makeGrid();

		g1.update(event);
		g2.update(event);
		g3.update(event);

		if ( g1.isInside(g1.cursorX, g1.cursorY) ) g1.draw(); 
		if ( g2.isInside(g2.cursorX, g2.cursorY) ) g2.draw(); 
		if ( g3.isInside(g3.cursorX, g3.cursorY) ) g3.draw(); 
	};
})();
