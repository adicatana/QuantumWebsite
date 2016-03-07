var formulaUtils = (function() {
	var tab = "\\qquad";
	var sp = "\\ ";
	
	return {
		matrix : function(m, n, arr) {
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
		},
		halign : function() {
			var ans = "";
			for (var i = 0; i < arguments.length; i++) {
				ans += arguments[i];
				if (i < arguments.length - 1) {
					ans += tab;
					ans += ' ';
				}
			}
			return ans;
		}
	};
})();

