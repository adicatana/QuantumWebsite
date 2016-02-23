function activator(element) {
	document.getElementById(element).className = 'active';
}

function deactivator(element, suffix) {
	var elements = [];
	for (var i = 0; i < suffix.length; ++i) {
		elements.push(element.concat(suffix[i]));
	} 
	for (var i = 0; i < elements.length; ++i) {
		document.getElementById(elements[i]).className = '';
	}
}

function changeTitle(name) { // dependency on index.js
	document.title = name;
	copyFrame(frameMap[name], 'content');
}

