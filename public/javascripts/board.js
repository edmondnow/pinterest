
var wall = new Freewall("#freewall");
wall.fitWidth()
wall.reset({
	selector: '.brick',
	animate: true,
	cellW: 200,
	cellH: 'auto',
	onResize: function() {
		wall.fitWidth();
	}
});

wall.container.find('.brick img').load(function() {
	wall.fitWidth();
});



