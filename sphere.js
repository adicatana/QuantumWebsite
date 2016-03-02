var consts = {
	width : 480,
	height : 270,
	x : 240,
	y : 135,
	r : 125,
	r2 : 50,
	px : 184,
	py : 163,
	cursorX : 0,
	cursorY : 100,
	vpy : 150,
	angX : 222,
	angY : 144,
	angX2 : 240,
	angY2 : 110
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
		getCanvas : function() {
			return canvas;
		},
		build : function(where) {
			objectPull.addObject("line", 
				new objectUtils.buildLine(consts.x, consts.y, 3)
			);
			objectPull.addObject("zAxis", 
				new objectUtils.buildLine(consts.x, consts.y - consts.r, 1)
			);
			objectPull.addObject("yAxis", 
				new objectUtils.buildLine(consts.x + consts.r, consts.y, 1)
			);
			objectPull.addObject("xAxis", 
				new objectUtils.buildLine(consts.px, consts.py, 1)
			);
			objectPull.addObject("circle", 
				new objectUtils.buildCircle(consts.x, consts.y, consts.r)
			);
			objectPull.addObject("elipse", 
				new objectUtils.buildEllipse()
			);
			objectPull.addObject("seg1",
				new objectUtils.buildSeg(consts.x, consts.y, consts.x, consts.y, 1)
			);
			objectPull.addObject("seg2",
				new objectUtils.buildSeg(consts.x, consts.y, consts.x, consts.y, 1)
			);
			objectPull.addObject("down",
				new objectUtils.buildSeg(0, 0, 0, 0, 1)
			);
			objectPull.addObject("plane",
				new objectUtils.buildSeg(0, 0, 0, 0, 1)
			);
			objectPull.addObject("ang1",
				new objectUtils.buildSeg(0, 0, 0, 0, 1)
			);
			objectPull.addObject("ang2",
				new objectUtils.buildSeg(0, 0, 0, 0, 1)
			);
			objectPull.addObject("text1",
				new objectUtils.buildText("0", 245, 30)
			);
			objectPull.addObject("text2",
				new objectUtils.buildText("1", 240, 255)
			);
			objectPull.addObject("text3",
				new objectUtils.buildText("ϕ", 0, 0)
			);
			objectPull.addObject("text4",
				new objectUtils.buildText("θ", 0, 0)
			);
			$("#" + where).after(canvas);
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
			var canv = sphere.getCanvas();
			
			cursorX = event.pageX - canv.offsetLeft;
			cursorY = event.pageY - canv.offsetTop;
			
			var pX = cursorX;
			var pY = cursorY;
			
			var len = Geo.length(pX, pY, consts.x, consts.y);
			var perX = (pX - consts.x) / consts.r * 0.2;
			var perY = (pY - consts.y) / consts.r * 0.2;
			 
			var projX = pX;
			var projY = consts.vpy;
			var perX2 = (projX - consts.x) / consts.r * 0.2;
			var perY2 = (projY - consts.y) / consts.r * 0.2;
			
			if (len > consts.r) {
				pX = consts.x;
				pY = consts.y;
				projX = consts.x;
				projY = consts.y;
				perX = 0;
				perX2 = 0;
				perY = 0;
				perY2 = 0;
			} 
				
			objectPull.getObjects().line.setX(pX);
			objectPull.getObjects().line.setY(pY);
				
			objectPull.getObjects().plane.setX(projX);
			objectPull.getObjects().plane.setY(projY);
			objectPull.getObjects().plane.setX2(consts.x);
			objectPull.getObjects().plane.setY2(consts.y);
			
			objectPull.getObjects().down.setX(projX);
			objectPull.getObjects().down.setY(projY);
			objectPull.getObjects().down.setX2(pX);
			objectPull.getObjects().down.setY2(pY);
			
			objectPull.getObjects().ang1.setX(consts.x + perX * consts.r);
			objectPull.getObjects().ang1.setY(consts.y + perY * consts.r);
			objectPull.getObjects().ang1.setX2(consts.angX2);
			objectPull.getObjects().ang1.setY2(consts.angY2);
			
			objectPull.getObjects().ang2.setX(consts.x + perX2 * consts.r);
			objectPull.getObjects().ang2.setY(consts.y + perY2 * consts.r);
			objectPull.getObjects().ang2.setX2(consts.angX);
			objectPull.getObjects().ang2.setY2(consts.angY);
			
			objectPull.getObjects().text3.setX(consts.x + perX2 * consts.r);
			objectPull.getObjects().text3.setY(consts.y + perY2 * consts.r - 20);
			
			objectPull.getObjects().text4.setX(consts.x + perX2 * consts.r - 20);
			objectPull.getObjects().text4.setY(consts.y + perY2 * consts.r + 20);
		}
	};
})();

var objectUtils = (function() {
	return {
		buildLine : function(x, y, w) {
			var _x = x;
			var _y = y;
			var _w = w;
			
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
				
				ctx.save();
				ctx.moveTo(consts.x, consts.y);
				ctx.lineWidth = _w;
				ctx.lineTo(_x, _y);
				ctx.stroke();
				ctx.restore();
			};
		},
		buildCircle : function(x, y, r) {
			var _x = x;
			var _y = y;
			var _r = r;
			this.draw = function(ctx) {
				ctx.beginPath();
				ctx.arc(_x, _y, _r, 0, 2 * Math.PI);
				ctx.stroke();
			};
		},
		buildEllipse : function() {
			this.draw = function(ctx) {
				ctx.save();
				ctx.scale(1, 0.25);
				ctx.beginPath();
				ctx.arc(consts.x, consts.y+400, consts.r, 0, 2 * Math.PI, false);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();
				ctx.scale(1, 1);
			};
		},
		buildSeg : function(x, y, x2, y2, w) {
			var _x = x;
			var _y = y;
			
			var _x2 = x2;
			var _y2 = y2;
			var _w = w;
			
			this.setX = function(x) {
				_x = x;
			};
			this.setY = function(y) {
				_y = y;
			};
			this.setX2 = function(x) {
				_x2 = x;
			};
			this.setY2 = function(y) {
				_y2 = y;
			};
			
			this.draw = function(ctx) {
				ctx.save();
				ctx.beginPath();
				ctx.lineWidth = _w;
				ctx.moveTo(_x, _y);
				ctx.lineTo(_x2, _y2);
				ctx.stroke();
				ctx.restore();
			};
		},
		buildText : function(txt, x, y) {
			var _x = x;
			var _y = y;
			
			this.setX = function(x) {
				_x = x;
			};
			this.setY = function(y) {
				_y = y;
			};
			
			this.draw = function(ctx) {
				ctx.beginPath();
				ctx.font = "20px Monospace";
				ctx.fillText(txt, _x, _y);
				ctx.stroke();
			};
		}
	};
})();

var Geo = (function() {
	return {
		length : function(x, y, x2, y2) {
			return Math.sqrt( (x-x2) * (x-x2) + (y-y2) * (y-y2) );
		}
	};
})();

