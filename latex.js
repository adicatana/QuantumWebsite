var parser = (function(){
	function insertAfter(newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}
	
	function contains(array, val) {
		for (var x in array) {
			if (val == array[x]) {
				return true;
			}
		}
		return false;
	}
	
	var marked = new Array();
	
	return {
		parse : function(formula, id) {
			var linkage = "http://latex.codecogs.com/gif.latex?";
			var attributeText = linkage + formula;
			var panelId = "panel" + id;
			
			if (!contains(marked, id)) {
				marked.push(id);
				contains(marked, id);
				
				var image = document.createElement("img");
				image.setAttribute("src", attributeText);
				
				image.setAttribute("id", panelId);
				
				$('#' + id).hover(function () {
					$(this).after(image);
					$('#' + panelId).hide().fadeToggle(3000);
				});
			} else {
				$('#' + id).unbind('mouseenter mouseleave')
			}
		}
	};
})();
