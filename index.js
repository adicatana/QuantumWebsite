function selector(element) {
	document.getElementById(element).className = 'active';
}

function getFrameContent(frame){
	var iFrame =  document.getElementById(frame);
	var iFrameBody;
	if ( iFrame.contentDocument ) 
	{ // FF
		iFrameBody = iFrame.contentDocument.getElementsByTagName('body')[0];
	}
	else if ( iFrame.contentWindow ) 
	{ // IE
		iFrameBody = iFrame.contentWindow.document.getElementsByTagName('body')[0];
	}
	return iFrameBody.innerHTML;
}

function copyFrame(frame, id) {
	var content = getFrameContent(frame);
	var element = document.getElementById(id);
	element.innerHTML = content;
}

frameMap = {};
frameMap['Home'] = "homeFrame";
frameMap['Maths'] = "mathFrame";
frameMap['Physics'] = "physicsFrame";
frameMap['Architecture'] = "archFrame";
