var graphic = (function() {
	
	var canvas = document.getElementById("myCanvas");
	
	var ctx = canvas.getContext("2d");
	ctx.moveTo(10,200);
	ctx.lineTo(200,200);
	ctx.stroke();
	ctx.moveTo(10,0);
	ctx.lineTo(10,200);
	ctx.stroke();
	ctx.font = "15px Arial";
	ctx.fillText("x", 190, 213);
	ctx.fillText("y", 0, 15);
	ctx.fillText("0", 0, 213);
	ctx.fillText(">", 193, 205);
	ctx.fillText("^", 6, 10);

})();
