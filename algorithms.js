var algoFormulas = (function() {
	var matrix = formulaUtils.matrix;
	var halign = formulaUtils.halign;
	
	var lb = "\\rangle";
	var rb = "\\rangle";

	var tab = "\\qquad";
	var sp = "\\ ";

	var cgates = archFormulas.cgates;
	var bit    = archFormulas.bit;

	var bit0 = matrix(2,1,[1,0]);
	var bit1 = matrix(2,1,[0,1]);

	var gates = {
		I : matrix(2, 2, [1,0,0,1]),
		X : cgates.not,
		Z : cgates.zPauli,
		H : matrix(2, 2, ["\\frac{1}{\\sqrt{2}}","\\frac{1}{\\sqrt{2}}",
						  "\\frac{1}{\\sqrt{2}}","-\\frac{1}{\\sqrt{2}}"])
	};

	return {
		fdef : halign(
			"f : \\{0, 1\\} \\rightarrow \\{0, 1\\}",
			"f(0) = f(0), f(1) = f(1) \\implies f " + sp + "injective"
		),
		hadamard : "H = \\frac{1}{\\sqrt{2}} \\cdot (X" + sp + "+" + sp +"Z)" 
		 	+ " = \\frac{1}{\\sqrt{2}} \\cdot ("+ gates.X + "+" + gates.Z + ") =" + gates.H,
		hexample1 : "H \\cdot" + bit(0) + " = "+ gates.H +" \\cdot" + bit0 + "="
			 + matrix(2,1,["\\frac{1}{\\sqrt{2}}", "\\frac{1}{\\sqrt{2}}"]),
		hexample2 : "H \\cdot" + bit(1) + " = "+ gates.H +" \\cdot" + bit1 + "="
			+ matrix(2,1,["\\frac{1}{\\sqrt{2}}", "-\\frac{1}{\\sqrt{2}}"]),
		pipeline : "(H \\otimes I) \\cdot U_{f} \\cdot (H \\otimes H) \\cdot" + bit("0,1"),
		state1 : bit("a") + " = " + bit("0, 1"),
		state0 : bit("b") + " = \\bigg[ \\frac{" + bit(0) +"+"+ bit(1) + "}{\\sqrt{2}} \\bigg] \\bigg[ \\frac{" + bit(0) + "-" +  bit(1) + "}{\\sqrt{2}} \\bigg] = \\frac{+" + bit("0,0") + " - " + bit("0,1") + " + " + bit("1,0") + "-" + bit("1,1") + "}{2} = " + matrix(4, 1,["+\\frac{1}{2}","-\\frac{1}{2}","+\\frac{1}{2}","-\\frac{1}{2}"]),
		state2 : bit("c") + " = (\\pm 1) \\bigg[ \\frac{" + bit(0) + "+" +  bit(1) + "}{\\sqrt{2}} \\bigg]\\bigg[ \\frac{" + bit(0) + "-" +  bit(1) + "}{\\sqrt{2}} \\bigg] \\ where \\ f \\  constant", 
		state3 : bit("c") + " = (\\pm 1) \\bigg[ \\frac{" + bit(0) + "-" +  bit(1) + "}{\\sqrt{2}} \\bigg]\\bigg[ \\frac{" + bit(0) + "-" +  bit(1) + "}{\\sqrt{2}} \\bigg] \\ where \\ f \\  balanced",
		state4 : bit("d") + " = (\\pm) " + bit(0) +"\\bigg[ \\frac{" + bit(0) + "-" +  bit(1) + "}{\\sqrt{2}} \\bigg]  \\ where \\ f \\  constant",
		state5 : bit("d") + " = (\\pm) " + bit(1)+ "\\bigg[ \\frac{" + bit(0) + "-" +  bit(1) + "}{\\sqrt{2}} \\bigg] \\ where \\ f \\  balanced",
		};
})();