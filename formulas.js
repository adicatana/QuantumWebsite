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
	
	var matrix = function(m, n, arr) {
		var ans = "\\left[ \\begin{array}{cccccccccccccccccccccc}";
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				ans += arr[i * n + j];
				if (j < n - 1) {
					ans += "&";
				} 
			}
			if (i < m - 1) {
				ans += "\\\\";
			}
		}
		ans += "\\end{array} \\right]";
		return ans;
	};
	
	var bit0 = matrix(2,1,[1,0]);
	var bit1 = matrix(2,1,[0,1]);
	var bitg = matrix(2,1,["c_0","c_1"]);
	
	var cgates = {
		not : matrix(2, 2, [0,1,1,0]),
		and : matrix(2, 4, [1,1,1,0,0,0,0,1]),
		or : matrix(2, 4, [1,0,0,0,0,1,1,1]),
		nand : matrix(2, 4, [0,0,0,1,1,1,1,0]),
		nor : matrix(2, 4, [0,1,1,1,1,0,0,0]),
		id : matrix(2, 2, [1,0,0,1]),
		cnot : matrix(4, 4, [1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0]),
		toffli : matrix(8, 8, [1,0,0,0,0,0,0,0,
		                       0,1,0,0,0,0,0,0,
		                       0,0,1,0,0,0,0,0,
		                       0,0,0,1,0,0,0,0,
		                       0,0,0,0,1,0,0,0,
		                       0,0,0,0,0,1,0,0,
		                       0,0,0,0,0,0,0,1,
		                       0,0,0,0,0,0,1,0])
	};
	
	var tp = "\\otimes";
	var xor = "\\oplus";
	
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
	
	var halign = function() {
		var ans = "";
		for (var i = 0; i < arguments.length; i++) {
			ans += arguments[i];
			if (i < arguments.length - 1) {
				ans += tab;
			}
		}
		return ans;
	};
	
	return {
		bitdefs : halign(bit0def, bit1def),
		bitdef : bitgdef,
		equality1 : bit("q") + "=" + "c_0" + bit0 + "+ c_1" + bit1
					+ "=" + "c_0" + bit("0") + "+ c_1" + bit("1"),
		equality2 : bit("1") + tp + bit("0") + tp + bit("1") 
					+ "=" + bit1 + tp + bit0 + tp + bit1,
		equality3 : "(" + _set("C") + "^2" + ")" + "^{" + tp + "8}=" + _set("C") + "^{256}",
		classic1 : halign( 
			matrix(2, 2, ["c_{0,0}","c_{0,1}","c_{1,0}","c_{1,1}"]) + bit(0) + "=" + bit(1), 
			matrix(2, 2, ["c_{0,0}","c_{0,1}","c_{1,0}","c_{1,1}"]) + bit(1) + "=" + bit(0) 
		),
		notGateDef : halign(
			"NOT = " + cgates.not,
			cgates.not + bit0 + "=" + bit1,  
			cgates.not + bit1 + "=" + bit0
		),
		andGateDef : halign(
			"AND = " + cgates.and,
			cgates.and + matrix(4,1,[0,0,0,1]) + "=" + bit0
		),
		andGateEx : cgates.and + matrix(4,1,[3.5,2,0,-4.1]) + "=" + matrix(2,1,[5.5,-4.1]),
		orGateDef : "OR =" + cgates.or,
		nandGateDef : "NOT * AND =" + cgates.not + cgates.and + "=" + cgates.nand + "= NAND",
		norGateDef : "NOT * OR =" + cgates.not + cgates.or + "=" + cgates.nor + "= NOR",
		notNot : "NOT * NOT =" + cgates.not + cgates.not + "=" + cgates.id + "= ID",
		classic2 : "(NOT" + tp + "{NOR}) *" + bit("100") + "=" + bit("01"),
		classic3 : "(OR * (NOT" + tp + "{NOR})) *" + bit("100") + "= OR *" + bit("01") + "=" + bit("1"),
		cnotCnot : "CNOT * CNOT = " + cgates.cnot + "*" + cgates.cnot + "= ID",
		toffli : bit("x, y, z") + sp + "to" + sp + bit("x, y, z" + xor + "(x \\land y)"),
		toffliUni : halign( 
			bit("x, y, 0") + sp + "to" + sp + bit("x, y, x \\land y"),
			bit("1, 1, z") + sp + "to" + sp + bit("1, 1, \\lnot z")
		),
		toffliDef : "TOFFLI = " + cgates.toffli,
		fredkin : halign( 
			bit("0, y, z") + sp + "to" + sp + bit("0, y, z"),
			bit("1, y, z") + sp + "to" + sp + bit("1, z, y")
		)
	};
})();
