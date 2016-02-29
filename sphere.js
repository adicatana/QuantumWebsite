var consts = {
	width : 480,
	height : 270,
	x : 240,
	y : 135,
	r : 125,
	px : 184,
	py : 163,
	cursorX : 0,
	cursorY : 100
};

var sphere = (function() {
	var canvas = document.createElement("canvas");
	canvas.width = consts.width;
	canvas.height = consts.height;
	var ctx = canvas.getContext("2d");
	
	var draw = function() {
		for (var key in objectPull.getObjects()) {
			var object = objectPull.getObjects()[key];
			object.draw(ctx);
		}
	};
	
	var clear = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	
	return {
		build : function() {
			objectPull.addObject("line", 
				new objectUtils.buildLine(consts.x, consts.y)
			);
			objectPull.addObject("zAxis", 
				new objectUtils.buildLine(consts.x, consts.y - consts.r)
			);
			objectPull.addObject("yAxis", 
				new objectUtils.buildLine(consts.x + consts.r, consts.y)
			);
			objectPull.addObject("xAxis", 
				new objectUtils.buildLine(consts.px, consts.py)
			);
			objectPull.addObject("circle", 
				new objectUtils.buildCircle(consts.x, consts.y, consts.r)
			);
			objectPull.addObject("elipse", 
				new objectUtils.buildEllipse()
			);
			document.body.insertBefore(canvas, document.body.lastChild);
			draw();
		},
		render : function() {
			document.onmousemove = mouseMove.onMouseMove;
			setInterval(function() { 
				clear();
				draw();
			}, 10);
		}
	};
})();

var objectPull = (function() {
	var objects = {};
	return {
		getObjects : function() {
			return objects;
		},
		addObject : function(name, object) {
			objects[name] = object;
		}
	};
})();

var mouseMove = (function() {
	var cursorX = 0;
	var cursorY = 0;
	
	return {
		onMouseMove : function(event) {
			cursorX = event.pageX;
			cursorY = event.pageY;
			//alert(cursorX);
			//alert(cursorY);
			objectPull.getObjects().line.setX(cursorX - consts.cursorX);
			objectPull.getObjects().line.setY(cursorY - consts.cursorY);
		}
	};
})();

var objectUtils = (function() {
	return {
		buildLine : function(x, y) {
			var _x = x;
			var _y = y;
			
			this.getX = function() {
				return _x;
			};
			this.getY = function() {
				return _y;
			};
			this.setX = function(x) {
				_x = x;
			};
			this.setY = function(y) {
				_y = y;
			};
			this.draw = function(ctx) {
				ctx.beginPath();
				ctx.moveTo(consts.x, consts.y);
				ctx.lineTo(_x, _y);
				ctx.stroke();
			};
		},
		buildCircle : function(x, y, r) {
			var _x = x;
			var _y = y;
			var _r = r;
			this.draw = function(ctx) {
				ctx.beginPath();
				ctx.arc(_x, _y, _r, 0, 2*Math.PI);
				ctx.stroke();
			};
		},
		buildEllipse : function() {
			this.draw = function(ctx) {
				ctx.save();
				ctx.scale(1, 0.25);
				ctx.beginPath();
				ctx.arc(consts.x, consts.y+400, consts.r, 0, Math.PI*2, false);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();
				ctx.scale(1, 1);
			}
		}
	};
})();
