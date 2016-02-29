var c = document.getElementById("background");
var ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;

//values characters - taken from the unicode charset
var values = "αβγδεζηθλμνξρστφψω";
values = values.split("");

var font_size = 17;
var columns = c.width/font_size;
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
	drops[x] = 1; 

function draw()
{
	ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);
	
	ctx.fillStyle = "#00F"; //green text
	ctx.font = font_size + "px arial";
	for(var i = 0; i < drops.length; i++)
	{
		var text = values[Math.floor(Math.random()*values.length)];
		//x = i*font_size, y = value of drops[i]*font_size
		ctx.fillText(text, i*font_size, drops[i]*font_size);
		
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size > c.height && Math.random() > 0.975)
			drops[i] = 0;
		
		//incrementing Y coordinate
		drops[i]++;
	}
}

setInterval(draw, 60); 
