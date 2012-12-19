/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-email' : '&#x26;',
			'icon-search' : '&#x29;',
			'icon-users' : '&#x2a;',
			'icon-United-States' : '&#x75;',
			'icon-Washington' : '&#x6b;',
			'icon-Utah' : '&#x7a;',
			'icon-phone' : '&#x27;',
			'icon-information' : '&#x30;',
			'icon-success' : '&#x31;',
			'icon-warning' : '&#x32;',
			'icon-Oregon' : '&#x72;',
			'icon-lightning' : '&#x21;',
			'icon-pointer' : '&#x70;',
			'icon-user-info' : '&#x69;',
			'icon-folder-closed' : '&#xf07b;',
			'icon-folder-open' : '&#xf07c;',
			'icon-checked' : '&#xf00c;',
			'icon-close' : '&#xf00d;',
			'icon-linked' : '&#xf0c1;',
			'icon-play' : '&#xe000;',
			'icon-new-tab' : '&#xe001;'
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
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};