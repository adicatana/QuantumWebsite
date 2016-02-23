function activator(element) {
	if (document.getElementById(element).className == 'active') {
		document.getElementById(element).className = '';
	} else {
		document.getElementById(element).className = 'active';
	}
}
