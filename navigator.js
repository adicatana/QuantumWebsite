$(function() {
	function activator() {
		$(".navbarElem").hover(function() {
			$( this ).addClass("active");
		}, function() {
			$( this ).removeClass("active");
		});
	}
	activator();
});