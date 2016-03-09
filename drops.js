var drops = (function() {
	var c = document.getElementById("background");
	var ctx = c.getContext("2d");

	c.height = window.innerHeight;
	c.width = window.innerWidth;

	var values = "αβγδεζηθλμνξρστφψω";
	values = values.split("");

	var font_size = 17;
	var columns = c.width/font_size;
	var drops = [];

	var limit = 10;

	var limit1 = 0;
	var limit2 = limit;

	var limit3 = columns - limit;
	var limit4 = columns;
	
	for(var x = 0; x < columns; ++x) {
		drops[x] = 1; 
	}

	function spawn(i) {
		var text = values[Math.floor(Math.random() * values.length)];
		
		ctx.fillText(text, i * font_size, drops[i] * font_size);
		if (drops[i] * font_size > c.height && Math.random() > 0.975) {
			drops[i] = 0;
		}
		drops[i]++;	
	}

	function draw()
	{
		ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
		ctx.fillRect(0, 0, c.width, c.height);
		
		ctx.fillStyle = "#878787"; 
		ctx.font = font_size + "px arial";
		for(var x = 0; x < drops.length; ++x) {
			spawn(x);
		}
	}

	var initial_time = 60;
	for (var i = 0; i < initial_time; ++i) {
		draw();
	}
	setInterval(draw, 60); 
})(); 