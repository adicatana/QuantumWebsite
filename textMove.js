var textMove = (function() {
	var id = "textMove";

	var canvas = document.getElementById(id);
	var context = canvas.getContext("2d");

	var x = 10;
	var y = 50;

	var textPull = [
		{
			size : 20,
			txt : "Maths",
			x : 7,
			y : 50,
			dx : 1 
		},
		{
			size : 20,
			txt : "Qubits",
			x : 25,
			y : 100,
			dx : 2
		},
		{
			size : 10,
			txt : "Deutsch's Algorithm",
			x : 10,
			y : 120,
			dx : 2
		},
		{
			size : 10,
			txt : "Hilbert spaces",
			x : 10,
			y : 160,
			dx : 2.2
		},
		{
			size : 20,
			txt : "Physics",
			x : 30,
			y : 180,
			dx : 1.5
		}
	];

	function drawText(textField) {
		context.font = "" + textField.size + "px Arial";
		context.fillText(
			textField.txt, 
			textField.x, 
			textField.y
		);
		textField.x += textField.dx;
		if (textField.x > canvas.width) {
			textField.x = -10 * textField.txt.length;
		}
	};

	function draw() {
		for (var i = 0; i < textPull.length; ++i) {
			var textField = textPull[i];
			drawText(textField);
		}
	}

	function clear() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	setInterval(function() { 
		clear();
		draw();
	}, 10);
})();

var rotating = (function() {
	var id = "rotating";

	var canvas = document.getElementById(id);
	var context = canvas.getContext("2d");

	context.strokeStyle = "#99FFCC";
	context.fillStyle = "#008055";	

	function clear() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	function drawStaticText(textField) {
		context.font = "" + textField.size + "px Arial";
		context.fillText(
			textField.txt, 
			textField.x, 
			textField.y
		);
	}

	function rotate(x, y, ox, oy, ang) {
		x -= ox;
		y -= oy;

		ang = ang * Math.PI / 180;
		var xp = x * Math.cos(ang) - y * Math.sin(ang);
		var yp = x * Math.sin(ang) + y * Math.cos(ang);

		x = xp;
		y = yp;

		x += ox;
		y += oy;

		return {
			x : x,
			y : y
		};
	}

	function drawBit(c) {
		c.x += c.dx[c.time];
		c.y += c.dy[c.time];

		context.beginPath();
		context.arc(c.x, c.y ,c.scale[c.time],0, 2*Math.PI);
		context.fill();
		context.stroke();
	}

	var iterator = 0;
	var time = 10;
	
	var x = [90,100,95,95];
	var y = [87,87,103,72];

	var x2 = [150,123,142,50,23,42,142,132,52];
	var y2 = [150,132,123,50,122,123,52,32,170];

	var ox = 95;
	var oy = 87;

	var async = 18;
	for (var i = 0; i < async; ++i) {
		for (var j = 2; j < 4; ++j) {
			var rot = rotate(x[j], y[j], ox, oy, 10); 
			x[j] = rot.x; 
			y[j] = rot.y;
		}
	}
	setInterval(function() { 
		clear();

		drawStaticText({
			txt : "Qu",
			x : 30,
			y : 100,
			size : 30
		});

		for (var i = 0; i < x.length; ++i) {
			drawBit({
				x : x[i],
				y : y[i],
				scale : [4,4,4,4,3,4,4,4,4,4,4],
				dx : [0,0,0,0,0,0,0,0,0,0],
				dy : [0,0,0,0,0,0,0,0,0,0],
				time : (iterator+i)%time
			});

			var speed = i < 2 ? 1 : 3;
			var rot = rotate(x[i], y[i], ox, oy, speed); 
			x[i] = rot.x; 
			y[i] = rot.y;
		}

		for (var i = 0; i < x2.length; ++i) {
			drawBit({
				x : x2[i],
				y : y2[i],
				scale : [4,4,4,4,3,4,4,4,4,4,4],
				dx : [0,1,0,0,1,0,0,0,1,0],
				dy : [0,0,1,0,0,0,1,0,0,0],
				//dx : [0,1,2,2,1,22,4,0,1,10],
				//dy : [-10,0,1,-10,0,2,1,0,10,0],
				time : (iterator+i)%time
			});
		}

		drawStaticText({
			txt : "ntum",
			x : 120,
			y : 100,
			size : 30
		});

		iterator = (iterator + 1) % time;
	}, time);
})();