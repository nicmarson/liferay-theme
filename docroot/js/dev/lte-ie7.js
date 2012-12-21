/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-external' : '&#x25;',
			'icon-email' : '&#x26;',
			'icon-search' : '&#x29;',
			'icon-users' : '&#x2a;',
			'icon-calendar' : '&#x2b;',
			'icon-united-states' : '&#x75;',
			'icon-washington' : '&#x6b;',
			'icon-utah' : '&#x7a;',
			'icon-phone' : '&#x27;',
			'icon-information' : '&#x30;',
			'icon-success' : '&#x31;',
			'icon-warning' : '&#x32;',
			'icon-oregon' : '&#x72;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c) {
			addIcon(el, icons[c[0]]);
		}
	}
};