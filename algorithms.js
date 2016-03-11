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

	var partial = "\\bigg[ \\frac{" + bit(0) + "-" + bit(1) + "}{\\sqrt{2}} \\bigg] ";
	var u2 = "\\frac {1} {2^{n}}";
	var u3 = "\\frac {2} {2^{n}}";

	return {
		fdef : halign(
			"f : \\{0, 1\\} \\rightarrow \\{0, 1\\}",
			"f(0) \\neq f(1) \\implies f " + sp + "injective"
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
		
		gg1 : "f : \\{0, 1\\}^{n} \\rightarrow \\{0, 1\\}",
		gg2 : "U_{f}(H^{\\otimes n}\\otimes I)" + bit("0,0"),
		gg3 : bit("\\phi_{0}") + "=" + bit("0,0"),
		gg4 : bit("\\phi_{1}") + "=" + "\\bigg[ \\frac{ \\sum_{x \\in \\{ 0, \\ 1 \\}^{n} } " + bit("x") + "}{\\sqrt{2^{n}}} \\bigg]" + bit("0,0"),
		gg5 : bit("\\phi_{2}") + "=" + " \\frac{ \\sum_{x \\in \\{ 0, \\ 1 \\}^{n} } " + bit("x, f(x)") + "}{\\sqrt{2^{n}}} ",
		gg6 : bit("\\phi_{0}") + "=" + bit("x,1"),
		gg7 : bit("\\phi_{1}") + "=" + bit("x") + "\\bigg[  \\frac{" + bit(0) + "-" + bit(1) + "}{\\sqrt{2}} \\bigg] " 
			+ "= \\bigg[  \\frac{" + bit("x,0") + "-" + bit("x,1") + "}{\\sqrt{2}} \\bigg] ",
		gg8 : bit("\\phi_{2}") + "= (-1)^{f(x)}" + bit("x") + partial + "= -"+ bit("x") + partial 
			+ ",if \\ x = x_{0}",
		gg9 : bit("\\phi_{2}") + "= (-1)^{f(x)}" + bit("x") + partial + "= +"+ bit("x") + partial 
			+ ",if \\ x \\neq x_{0}",
		gg10 : "A =" + matrix(4,4,[u2,u2,"...",u2,
								   u2,u2,"...",u2,
								   "...","...","...","...",
								   u2,u2,"...",u2]),
		gg11 : "-I + 2A =" + matrix(4,4,["-1+"+u3,u3,"...",u3,
								         u3,"-1+"+u3,"...",u3,
								         "...","...","...","...",
								         u3,u3,"...","-1+"+u3]),

		ini1 : "\\sqrt{m}",
		ini2 : "x_{0}",
		ini3 : bit("0,x") + "\\  to \\ " + bit("x, f(x) \\oplus y"),
		ini4 : "\\frac{" + bit(0) + "+" + bit(1) + "}{\\sqrt{2}}",
		ini5 : "U_{f}(I \\oplus H)" + bit("x, 1"),
		ini6 : "U_{f}",
		ini7 : "U_{f}",
		ini8 : bit(0),
		ini9 : "H^{\\otimes n}",
		ini10 : "\\sqrt{m}(or \\ \\sqrt{2^{n}})",

		system : "A \\cdot \\vec{x} = \\vec{b}",	
		system2 : "\\vec{x} = A^{-1} \\cdot \\vec{b}",
		hhl3 : "\\vec{x} = A^{-1} \\cdot \\vec{b}"
	};				
})();