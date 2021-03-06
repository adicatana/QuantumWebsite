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
			"f(0) \\neq f(1) \\implies f " + sp + "\\text{injective}"
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
		state2 : bit("c") + " = (\\pm 1) \\bigg[ \\frac{" + bit(0) + "+" +  bit(1) + "}{\\sqrt{2}} \\bigg]\\bigg[ \\frac{" + bit(0) + "-" +  bit(1) + "}{\\sqrt{2}} \\bigg] \\ \\text{where} \\ f \\  \\text{constant}", 
		state3 : bit("c") + " = (\\pm 1) \\bigg[ \\frac{" + bit(0) + "-" +  bit(1) + "}{\\sqrt{2}} \\bigg]\\bigg[ \\frac{" + bit(0) + "-" +  bit(1) + "}{\\sqrt{2}} \\bigg] \\ \\text{where} \\ f \\  \\text{balanced}",
		state4 : bit("d") + " = (\\pm) " + bit(0) +"\\bigg[ \\frac{" + bit(0) + "-" +  bit(1) + "}{\\sqrt{2}} \\bigg]  \\ \\text{where} \\ f \\  \\text{constant}",
		state5 : bit("d") + " = (\\pm) " + bit(1)+ "\\bigg[ \\frac{" + bit(0) + "-" +  bit(1) + "}{\\sqrt{2}} \\bigg] \\ \\text{where} \\ f \\  \\text{balanced}",
		
		gg1 : "f : \\{0, 1\\}^{n} \\rightarrow \\{0, 1\\}",
		gg2 : "U_{f}(H^{\\otimes n}\\otimes I)" + bit("0,0"),
		gg3 : bit("\\phi_{0}") + "=" + bit("0,0"),
		gg4 : bit("\\phi_{1}") + "=" + "\\bigg[ \\frac{ \\sum_{x \\in \\{ 0, \\ 1 \\}^{n} } " + bit("x") + "}{\\sqrt{2^{n}}} \\bigg]" + bit("0,0"),
		gg5 : bit("\\phi_{2}") + "=" + " \\frac{ \\sum_{x \\in \\{ 0, \\ 1 \\}^{n} } " + bit("x, f(x)") + "}{\\sqrt{2^{n}}} ",
		gg6 : bit("\\phi_{0}") + "=" + bit("x,1"),
		gg7 : bit("\\phi_{1}") + "=" + bit("x") + "\\bigg[  \\frac{" + bit(0) + "-" + bit(1) + "}{\\sqrt{2}} \\bigg] " 
			+ "= \\bigg[  \\frac{" + bit("x,0") + "-" + bit("x,1") + "}{\\sqrt{2}} \\bigg] ",
		gg8 : bit("\\phi_{2}") + "= (-1)^{f(x)}" + bit("x") + partial + "= -"+ bit("x") + partial 
			+ ",\\text{if} \\ x = x_{0}",
		gg9 : bit("\\phi_{2}") + "= (-1)^{f(x)}" + bit("x") + partial + "= +"+ bit("x") + partial 
			+ ",\\text{if} \\ x \\neq x_{0}",
		gg10 : "A =" + matrix(4,4,[u2,u2,"...",u2,
								   u2,u2,"...",u2,
								   "...","...","...","...",
								   u2,u2,"...",u2]),
		gg11 : "-I + 2A =" + matrix(4,4,["-1+"+u3,u3,"...",u3,
								         u3,"-1+"+u3,"...",u3,
								         "...","...","...","...",
								         u3,u3,"...","-1+"+u3]),

		ini1 : "\\sqrt{m}",
		ini2 : "x = x_{0}",
		ini3 : bit("0,x") + "\\  to \\ " + bit("x, f(x) \\oplus y"),
		ini4 : "\\frac{" + bit(0) + "+" + bit(1) + "}{\\sqrt{2}}",
		ini5 : "U_{f}(I \\oplus H)" + bit("x, 1"),
		ini6 : "U_{f}",
		ini7 : "U_{f}",
		ini8 : bit(0),
		ini9 : "H^{\\otimes n}",
		ini10 : "\\sqrt{m}( \\text{or} \\ \\sqrt{2^{n}})",

		comp1 : "O(N^2 \\log(N))",
		comp2 : "O(\\log(N))",
		comp3 : "O(N)",

		system : "A \\cdot \\vec{x} = \\vec{b}",	
		system2 : "\\vec{x} = A^{-1} \\cdot \\vec{b}",
		hhl3 : "\\vec{x} = A^{-1} \\cdot \\vec{b}",
		tensor1 : "f(0) \\otimes f(1)",
		tensor2 : "f(0) \\otimes f(1)",
		adiFormula1 : "\\bigg[ \\frac{|0 \\rangle - |1 \\rangle}{\\sqrt{2}} \\bigg]",
		adiFormula2 : "\\bigg[ \\frac{|0 \\otimes f(0) \\rangle - |1 \\otimes f(1)\\rangle}{\\sqrt{2}} \\bigg]",
		adiFormula3 : "V = [53, 38,17,23,79]",
		adiFormula4 : "A * V = [42,42,42,42,42]",
		adiFormula5 : "x_0",
		adiFormula6 : "U_f",
		adiFormula7 : "f(x) = 1",
		adiFormula8 : "f(x) = 0",
		adiFormula9 : "\\frac{m}{2}",
		adiFormula10 : "53, 38, 17, 23, 79",
		adiFormula11 : "a = 42",
		adiFormula12 : "v",
		adiFormula13 : "v = a + (a - v)",
		adiFormula14 : "53",
		adiFormula15 : "42 + (42 - 53) = 31",
		adiFormula16 : "\\{0, 1 \\}",
		adiFormula18 : "f(0)",
		adiFormula19 : "f(1)",

		hhl4 : "A = A^{t}",
		hhl5 : bit("\\psi(t)") + " = U \\cdot " + bit("\\psi(0)"),
		hhl6 : "H = \\sum_{j = 1}^{m} H_{j}",
		hhl7 : bit("\\psi(t)") + " = e ^ {i \\cdot B \\cdot t} \\cdot " + bit("\\psi(0)"),
		hhl8 : "\\epsilon",
		hhl9 : bit("\\psi(t)")+ " = \\sum_{j = 1}^{m} " +  bit("\\psi_{j}(t)"),
		hermite1 : "A = A^t \\Rightarrow A^{-1} = (A^t)^{-1}",
		invertible : "U A U^{-1} = " + matrix(3, 3, ["\\lambda_1", "...", 0, "...", "...", "...", 0, "...", "\\lambda_n"]),
		lambdas : "\\lambda_i",
		inverse : "A = U^{-1}" + matrix(3, 3, ["\\lambda_1", "...", 0, "...", "...", "...", 0, "...", "\\lambda_n"]) + "U",
		inverse2 : "A^{-1} = U^{-1} " + matrix(3, 3, ["\\frac{1}{\\lambda_1}", "...", 0, "...", "...", "...", 0, "...", "\\frac{1}{\\lambda_n}"]) + "U",
	
		rr1 : "T_{t} = e^{-i \\cdot A \\cdot t}" + "," + bit("\\psi(t)") + " = T_{t} \\cdot " + bit("\\psi(0)"),
		rr2 : "T_{\\otime p} = e^{-i \\cdot A \\otimes p}",
		rr3 : "T_{\\otime p} \\cdot" + bit("b"),
		rr4 : bit(0),
		rr5 : "\\sum_{j} B_j"+bit("\\psi_j")+bit("\\lambda_j t"),
		rr6 : "\\lambda_j",		
		rr7 : bit("b"),		
		rr8 : "\\sum_{j} B_j"+"e^{i \\delta \\lambda_j^{-1}}"+bit("\\psi_j")+bit("\\lambda_j t"),
		rr9 : "e^{i \\delta A^{-1}}"+bit("b")+bit(0),
		rr0 : "\\sum_{j} B_j"+"e^{i \\delta \\lambda_j^{-1}}"+bit("\\psi_j")+bit(0),
		
		mes : "\\langle x | M | x \\rangle" 
	};				
})();