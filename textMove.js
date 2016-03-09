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