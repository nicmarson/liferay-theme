jQuery.webshims.register("details",function(e,t,n,r,i,s){var o=function(t){var n=e(t).parent("details");if(n[0]&&n.children(":first").get(0)===t)return n},u=function(t,n){t=e(t);n=e(n);var r=e.data(n[0],"summaryElement");e.data(t[0],"detailsElement",n);if(!r||t[0]!==r[0]){r&&(r.hasClass("fallback-summary")?r.remove():r.unbind(".summaryPolyfill").removeData("detailsElement").removeAttr("role").removeAttr("tabindex").removeAttr("aria-expanded").removeClass("summary-button").find("span.details-open-indicator").remove());e.data(n[0],"summaryElement",t);n.prop("open",n.prop("open"))}},a=function(t){var n=e.data(t,"summaryElement");if(!n){n=e("> summary:first-child",t);if(!n[0]){e(t).prependPolyfill('<summary class="fallback-summary">'+s.text+"</summary>");n=e.data(t,"summaryElement")}else u(n,t)}return n};t.createElement("summary",function(){var n=o(this);if(!n||e.data(this,"detailsElement"))return;var r,i,s=e.attr(this,"tabIndex")||"0";u(this,n);e(this).on({"focus.summaryPolyfill":function(){e(this).addClass("summary-has-focus")},"blur.summaryPolyfill":function(){e(this).removeClass("summary-has-focus")},"mouseenter.summaryPolyfill":function(){e(this).addClass("summary-has-hover")},"mouseleave.summaryPolyfill":function(){e(this).removeClass("summary-has-hover")},"click.summaryPolyfill":function(t){var n=o(this);if(n){if(!i&&t.originalEvent){i=!0;t.stopImmediatePropagation();t.preventDefault();e(this).trigger("click");i=!1;return!1}clearTimeout(r);r=setTimeout(function(){t.isDefaultPrevented()||n.prop("open",!n.prop("open"))},0)}},"keydown.summaryPolyfill":function(t){if((t.keyCode==13||t.keyCode==32)&&!t.isDefaultPrevented()){i=!0;t.preventDefault();e(this).trigger("click");i=!1}}}).attr({tabindex:s,role:"button"}).prepend('<span class="details-open-indicator" />');t.moveToFirstEvent(this,"click")});var f;t.defineNodeNamesBooleanProperty("details","open",function(t){var n=e(e.data(this,"summaryElement"));if(!n)return;var r=t?"removeClass":"addClass",i=e(this);if(!f&&s.animate){i.stop().css({width:"",height:""});var o={width:i.width(),height:i.height()}}n.attr("aria-expanded",""+t);i[r]("closed-details-summary").children().not(n[0])[r]("closed-details-child");if(!f&&s.animate){var u={width:i.width(),height:i.height()};i.css(o).animate(u,{complete:function(){e(this).css({width:"",height:""})}})}});t.createElement("details",function(){f=!0;var t=a(this);e.prop(this,"open",e.prop(this,"open"));f=!1})});