/*
 * jQuery Anystretch
 * Version 1.1
 * https://github.com/danmillar/jquery-anystretch
 *
 * Add a dynamically-resized background image to the body
 * of a page or any other block level element within it
 *
 * Copyright (c) 2012 Dan Millar (@danmillar / decode.uk.com)
 * Dual licensed under the MIT and GPL licenses.
 *
 * This is a fork of jQuery Backstretch (v1.2)
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
*/(function(e){e.fn.anystretch=function(t,n,r){var i=this.selector.length?!1:!0;return this.each(function(s){function o(){if(t){var n;i||c.css({position:p.elPosition,background:"none"});h.length==0?h=e("<div />").attr("class","anystretch").css({left:0,top:0,position:i?"fixed":"absolute",overflow:"hidden",zIndex:i?-999999:-999998,margin:0,padding:0,height:"100%",width:"100%"}):h.find("img").addClass("deleteable");n=e("<img />").css({position:"absolute",display:"none",margin:0,padding:0,border:"none",zIndex:-999999}).bind("load",function(t){var n=e(this),i,s;n.css({width:"auto",height:"auto"});i=this.width||e(t.target).width();s=this.height||e(t.target).height();v=i/s;u(function(){n.fadeIn(p.speed,function(){h.find(".deleteable").remove();typeof r=="function"&&r()})})}).appendTo(h);c.children(".anystretch").length==0&&(i?e("body").append(h):c.append(h));h.data("settings",p);n.attr("src",t);e(window).resize(u)}}function u(t){try{w={left:0,top:0};g=a();y=g/v;if(y>=f()){b=(y-f())/2;p.positionY=="center"||p.centeredY?e.extend(w,{top:"-"+b+"px"}):p.positionY=="bottom"&&e.extend(w,{top:"auto",bottom:"0px"})}else{y=f();g=y*v;b=(g-a())/2;p.positionX=="center"||p.centeredX?e.extend(w,{left:"-"+b+"px"}):p.positionX=="right"&&e.extend(w,{left:"auto",right:"0px"})}h.children("img:not(.deleteable)").width(g).height(y).filter("img").css(w)}catch(n){}typeof t=="function"&&t()}function a(){return i?c.width():c.innerWidth()}function f(){return i?c.height():c.innerHeight()}var l={positionX:"center",positionY:"center",speed:0,elPosition:"relative"},c=e(this),h=i?e(".anystretch"):c.children(".anystretch"),p=h.data("settings")||l,d=h.data("settings"),v,m,g,y,b,w;n&&typeof n=="object"&&e.extend(p,n);n&&typeof n=="function"&&(r=n);e(document).ready(o);return this})};e.anystretch=function(t,n,r){var i="onorientationchange"in window?e(document):e(window);i.anystretch(t,n,r)}})(jQuery);