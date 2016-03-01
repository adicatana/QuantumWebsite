var formulas = (function() {
	return {
		formula1 : "\\frac{1+sin(x)}{y}",
		formula2 : "\\left( \\begin{array}{ccc}\
			a & b & c \\\\\
			d & e & f \\\\\
			g & h & i \\end{array} \\right)"
	};
})();

var archFormulas = (function() {
	var lb = "\\rangle";
	var rb = "\\rangle";
	
	var tab = "\\qquad";
	var sp = "\\ ";
	
	var bit0 = "\\left[ \\begin{array}{ccc}\
			1 \\\\\
			0 \\end{array} \\right]";
	
	var bit1 = "\\left[ \\begin{array}{ccc}\
			0 \\\\\
			1 \\end{array} \\right]";
	
	var bitg = "\\left[ \\begin{array}{ccc}\
			c_0 \\\\\
			c_1 \\end{array} \\right]";
	
	var tp = "\\otimes";
	
	var cond1 = sp + "where" + sp +" |c_0|^2 + |c_1|^2 = 1";
	
	var bit = function(arg) {
		return "|" + arg + lb;
	};
	
	var bit0def = bit("0") + "=" + bit0;
	var bit1def = bit("1") + "=" + bit1;
	var bitgdef = bit("q") + "=" + bitg + cond1;
	var equality1 = bit("q") + "=" + "c_0" + bit0 + "+ c_1" + bit1
	+ "=" + "c_0" + bit("0") + "+ c_1" + bit("1") ;
	
	var _set = function(arg) {
		return "\\mathbb{" + arg + "}";
	};
	
	var halign = function(f1, f2) {
		return f1 + tab + f2;
	};
	
	return {
		bitdefs : halign(bit0def, bit1def),
		bitdef : bitgdef,
		equality1 : bit("q") + "=" + "c_0" + bit0 + "+ c_1" + bit1
					+ "=" + "c_0" + bit("0") + "+ c_1" + bit("1"),
		equality2 : bit("1") + tp + bit("0") + tp + bit("1") 
					+ "=" + bit1 + tp + bit0 + tp + bit1,
		equality3 : "(" + _set("C") + "^2" + ")" + "^{" + tp + "8}=" + _set("C") + "^{256}"
	};
})();
