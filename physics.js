var phyFormulas = (function() {
 	
 	var rb = "\\langle";
 	var lb = "\\rangle";
   
	var matrix = formulaUtils.matrix;
	
   	var bit = function(arg) {
 		return "|" + arg + lb;
 	};
   
 	var rbit = function(arg) {
 		return rb + arg + "|";
 	};
	
	var dbit = function(arg) {
		return rb + arg + "' |" + arg + lb;
	};
	
 	return {
		formula0 : bit("\\psi"),
 		formula1 : bit("x_0") + " = " + "[1, 0, ..., 0]^T",
 		formula2 : bit("x_1") + " = " + "[0, 1, ..., 0]^T",
 		formula3 : bit("x_{n-1}") + " = " + "[0, 0, ..., 1]^T",
 		formula4 : bit("\\psi") + "= c_0" + bit("x_0") + " + " + " c_1" + bit("x_1") + " + ... + " + "c_{n-1}" + bit("x_{n-1}"),
 		formula5 : bit("\\psi") + " = " + matrix(4, 1, ["c_0", "c_1", "...", "c_{n-1}"]),
 		formula6 : bit("\\psi^{\\prime}") + " = " + matrix(4, 1, ["c_0^{\\prime}", "c_1^{\\prime}", "...", "c_{n-1}^{\\prime}"]),
 		formula7 : "p(x_i) = \\frac{|c_i|^2}{|" + bit("\\psi") + "|^2} = \\frac{|c_i|^2}{\\sum_{j} |c_j|^2} ",
 		formula8 : dbit("\\psi") + " = " + "[\\overline{c_0^{\\prime}}, \\overline{c_1^{\\prime}}, ..., \\overline{c_{n-1}^{\\prime}}]" + matrix(4, 1, ["c_0", "c_1", "...", "c_{n-1}"]) + " = \\overline{c_0^{\\prime}} \\times {c_0} + ... \\overline{c_1^{\\prime}} \\times {c_1} + ... + \\overline{c_{n-1}^{\\prime}} \\times {c_{n-1}}",
		formula9 : rbit("\\psi^{\\prime}") + "=" + bit("\\psi^{\\prime}") + "^{\\dag}" + " = " + "[\\overline{c_0^{\\prime}}, \\overline{c_1^{\\prime}}, ..., \\overline{c_{n-1}^{\\prime}}]",
		formula10: bit("\\psi^{\\prime}"),
		formula11: "\\Omega",
		formula12: "\\frac{" + bit("\\psi (t+\\delta t)") + "-" + bit("\\psi (t)") + "}{\\delta t} ="
		   + "-i \\frac{2 \\cdot \\pi}{\\hbar} \\mathcal{H}" + bit("\\psi (t)"),
		formula13: "Var_{x}(A)Var_{x}(B) \\ge \\frac{1}{4} | \\langle x|[A,B]x \\rangle |^{2}",
		formula14: "\\otimes",
        formula15: "E = h \\nu",
        formula16: "h = 6,262.068 \\times 10^{-34}",
	    formula17: "\\lambda = h / p",
        formula18: "i \\hbar \\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\hat H \\Psi(\\mathbf{r},t)",
        formula19: "x_i",
        formula19: "x_i",
        formula20: "\\lambda_i",
        formula21: "\\lambda"
	};
 })();
 


window.addEventListener("load", function() {
    var dataURL = "media/anim_back.png";
    var background;
    var init = function() {
        var canvas = document.getElementById('animation');
        var electrons = new Array();
        var WIDTH = 600, HEIGHT = 250;
        var con = canvas.getContext('2d');
        con.canvas.width=WIDTH;
        con.canvas.height=HEIGHT;
        
        background = new Image();
        background.src = dataURL;
        con.drawImage(background, 0, 0);
        
        for(var i = 0; i < 100; i++) {
           electrons[i] = new Electron();
        }
        spawnElectron(electrons);
        draw(canvas, electrons);
    };


    var currentlyFlying = 0;
    var colourFlying = 5;
    var frequency = .25;
    var rgb_s = "rgb(255,0,0)";

    var sliderChange = function(){
        var newVal = document.getElementById("colour-slider").value;
        colourFlying = newVal;
        var red   = Math.floor(Math.sin(frequency*colourFlying + 0) * 127 + 128);
        var green = Math.floor(Math.sin(frequency*colourFlying + 2) * 127 + 128);
        var blue  = Math.floor(Math.sin(frequency*colourFlying + 4) * 127 + 128);
        rgb_s = "rgb("+red+","+green+","+blue+")";
        console.log(rgb_s);
    }

    
    function spawnElectron(electrons) {
        electrons.push(createElectron(300, 150));
	electrons.push(createElectron(250, 150));
	electrons.push(createElectron(200, 150));
        setTimeout(function() {spawnElectron(electrons);}, 7000/colourFlying);
    }
    
    function createElectron(x, y) {
	var temp = new Electron();
        temp.setFlying(x, y);
	return temp;
    }


    function draw(canvas, electrons) {
        var con = canvas.getContext('2d');
        
        var buf_canvas = document.createElement('canvas');
        buf_canvas.width = con.canvas.width;
        buf_canvas.height = con.canvas.height;
        var buf_context = buf_canvas.getContext('2d');
        buf_context.drawImage(background, 0, 0);
        for(var i = 0; i < electrons.length; i++) {
            if(electrons[i].dump){
                electrons.splice(i, 1);
            }else{
                electrons[i].draw(buf_context);
            }
        }
        
       
       
        buf_context.strokeStyle = rgb_s;
        buf_context.lineWidth = 5;
        buf_context.beginPath();
        buf_context.moveTo(0, 0);
        buf_context.lineTo(200, 150);
        buf_context.stroke();
	buf_context.strokeStyle = rgb_s;
        buf_context.lineWidth = 5;
        buf_context.beginPath();
        buf_context.moveTo(50, 0);
        buf_context.lineTo(250, 150);
        buf_context.stroke();
	buf_context.strokeStyle = rgb_s;
        buf_context.lineWidth = 5;
        buf_context.beginPath();
        buf_context.moveTo(100, 0);
        buf_context.lineTo(300, 150);
        buf_context.stroke();
        con.drawImage(buf_canvas, 0, 0);
        window.requestAnimationFrame(function() {draw(canvas, electrons);});
    }

    //Get ready to drop some serious JS OOP shit broh

    var X_ORIGIN = 0;
    var Y_LBOUND = 155;
    var Y_UBOUND = 250;
    var EL_SPEED = 2;
    var X_STOP = 881;
    var FLY_X = 200;
    var FLY_Y = 363;
    function Electron(){
        this.reset = function() {
            this.x = X_STOP * Math.random();
            this.y = Y_LBOUND + (Y_UBOUND - Y_LBOUND - 1)*Math.random();
            // That random function returns values between 0
            // and 1.                                     ---^
            this.dx = 1;
            this.dy = -1;
            this.radius = 7;
            this.stop = Math.random()*.2+.4;
	    this.px = EL_SPEED * Math.random();
	    this.py = EL_SPEED * Math.random();
	    this.vibrated = false;
	    this.flying = false;
        }
        
        this.vibrate = function() {
	    if(this.vibrated) {
	      this.vibrated = false;
	      this.px = this.x;
	      this.py = this.y;
	    } else {
	      this.vibrated = true;
	      this.px += EL_SPEED * Math.random();
	      this.py += EL_SPEED * Math.random();
	    }
        }
        
        this.setFlying = function(x, y) {
	    this.flying = true;
	    this.dump = false;
	    this.x = x;
	    this.y = y;
        }
        
        this.reset(); //calls on instantiation the function we just made
        
        this.move = function() {
            this.x += this.dx;
            this.y += this.dy;
            if(this.x > X_STOP || this.y < 0) {
	          this.dump = true;
	      }
        }
        
        this.draw = function(con) {
	        if(this.flying) {
	          this.move();
	        }
            var opacity = 1.0;
            con.fillStyle="#00F"; //Stands for blue
            con.beginPath();
            this.vibrate();
            con.arc(this.px,this.py,this.radius,0,Math.PI*2,true);
            con.closePath();
            var g = con.createRadialGradient(this.px,this.py,0,this.px,this.py,this.radius*opacity);
            g.addColorStop(0.0, 'rgba(255,255,255,'+opacity+')');
            g.addColorStop(this.stop, 'rgba(77,101,181,'+(opacity*.6)+')');
            g.addColorStop(1.0, 'rgba(77,101,181,0)');
            con.fillStyle = g;
            con.fill();
        }
    }
    init();
    document.getElementById("colour-slider").addEventListener("change", sliderChange);
    document.getElementById("colour-slider").value = colourFlying;
}, false);

