var formulas = (function() {
	var matrix = formulaUtils.matrix;
	return {
		formula1 : "\\log_2 N",
		formula2 : "\\(x, y) + (z, t) = (x + z, y + t)",
		formula3 : "\\(x, y) (z, t) = (xz - yt, xy + yz)",
		formula4 : "\\OM = \sqrt{(x_M - x_O)^2 + (y_M - y_O)^2}",
		formula5 : "A = " + matrix(3,3,["a_{11}","...","a_{1n}","...","...","...","a_{m1}","...","a_{mn}"]) + " = [a_{ij}]",
		formula6 : "I_n = " + matrix(4, 4,[1, 0, "...", 0, 0, 1, "...", 0, "...", "...", "...", "...", 0, 0, "...", 1]),
		formula7 : matrix(3, 1,["5 + 3i", "4 - i", "7"]),
	};
})();
