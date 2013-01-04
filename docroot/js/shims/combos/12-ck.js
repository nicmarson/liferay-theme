jQuery.webshims.register("dom-extend",function(e,t,n,r,i){var s=t.modules,o=/\s*,\s*/,u={},a={},f={},l={},c={},h=e.fn.val,p=function(t,n,r,i,s){return s?h.call(e(t)):h.call(e(t),r)};e.fn.val=function(t){var n=this[0];arguments.length&&null==t&&(t="");if(!arguments.length)return!n||1!==n.nodeType?h.call(this):e.prop(n,"value",t,"val",!0);if(e.isArray(t))return h.apply(this,arguments);var r=e.isFunction(t);return this.each(function(s){n=this;1===n.nodeType&&(r?(s=t.call(n,s,e.prop(n,"value",i,"val",!0)),null==s&&(s=""),e.prop(n,"value",s,"val")):e.prop(n,"value",t,"val"))})};var d="_webshimsLib"+Math.round(1e3*Math.random()),v=function(t,n,r){t=t.jquery?t[0]:t;if(!t)return r||{};var s=e.data(t,d);r!==i&&(s||(s=e.data(t,d,{})),n&&(s[n]=r));return n?s&&s[n]:s};[{name:"getNativeElement",prop:"nativeElement"},{name:"getShadowElement",prop:"shadowElement"},{name:"getShadowFocusElement",prop:"shadowFocusElement"}].forEach(function(t){e.fn[t.name]=function(){return this.map(function(){var e=v(this,"shadowData");return e&&e[t.prop]||this})}});["removeAttr","prop","attr"].forEach(function(n){u[n]=e[n];e[n]=function(t,r,s,o,l){var h="val"==o,d=h?p:u[n];if(!t||!a[r]||1!==t.nodeType||!h&&o&&"attr"==n&&e.attrFn[r])return d(t,r,s,o,l);var v=(t.nodeName||"").toLowerCase(),m=f[v],g="attr"!=n||!1!==s&&null!==s?n:"removeAttr",y,b,w;m||(m=f["*"]);m&&(m=m[r]);m&&(y=m[g]);if(y){"value"==r&&(b=y.isVal,y.isVal=h);if("removeAttr"===g)return y.value.call(t);if(s===i)return y.get?y.get.call(t):y.value;y.set&&("attr"==n&&!0===s&&(s=r),w=y.set.call(t,s));"value"==r&&(y.isVal=b)}else w=d(t,r,s,o,l);if((s!==i||"removeAttr"===g)&&c[v]&&c[v][r]){var E;E="removeAttr"==g?!1:"prop"==g?!!s:!0;c[v][r].forEach(function(e){(!e.only||(e.only="prop"==n)||"attr"==e.only&&"prop"!=n)&&e.call(t,s,E,h?"val":g,n)})}return w};l[n]=function(r,s,o){f[r]||(f[r]={});f[r][s]||(f[r][s]={});var a=f[r][s][n],l=function(e,t,r){return t&&t[e]?t[e]:r&&r[e]?r[e]:"prop"==n&&"value"==s?function(e){return o.isVal?p(this,s,e,!1,0===arguments.length):u[n](this,s,e)}:"prop"==n&&"value"==e&&o.value.apply?function(e){var t=u[n](this,s);t&&t.apply&&(t=t.apply(this,arguments));return t}:function(e){return u[n](this,s,e)}};f[r][s][n]=o;if(o.value===i){o.set||(o.set=o.writeable?l("set",o,a):t.cfg.useStrict&&"prop"==s?function(){throw s+" is readonly on "+r}:e.noop);o.get||(o.get=l("get",o,a))}["value","get","set"].forEach(function(e){o[e]&&(o["_sup"+e]=l(e,a))})}});var m=!e.browser.msie||8<parseInt(e.browser.version,10),g=function(){var e=t.getPrototypeOf(r.createElement("foobar")),n=Object.prototype.hasOwnProperty;return function(i,s,o){var u=r.createElement(i),a=t.getPrototypeOf(u);if(m&&a&&e!==a&&(!u[s]||!n.call(u,s))){var f=u[s];o._supvalue=function(){return f&&f.apply?f.apply(this,arguments):f};a[s]=o.value}else o._supvalue=function(){var e=v(this,"propValue");return e&&e[s]&&e[s].apply?e[s].apply(this,arguments):e&&e[s]},y.extendValue(i,s,o.value);o.value._supvalue=o._supvalue}}(),y=function(){var n={};t.addReady(function(r,i){var s={},o=function(t){s[t]||(s[t]=e(r.getElementsByTagName(t)),i[0]&&e.nodeName(i[0],t)&&(s[t]=s[t].add(i)))};e.each(n,function(e,n){o(e);!n||!n.forEach?t.warn("Error: with "+e+"-property. methods: "+n):n.forEach(function(t){s[e].each(t)})});s=null});var i,s=e([]),o=function(t,s){n[t]?n[t].push(s):n[t]=[s];e.isDOMReady&&(i||e(r.getElementsByTagName(t))).each(s)};return{createTmpCache:function(t){e.isDOMReady&&(i=i||e(r.getElementsByTagName(t)));return i||s},flushTmpCache:function(){i=null},content:function(t,n){o(t,function(){var t=e.attr(this,n);null!=t&&e.attr(this,n,t)})},createElement:function(e,t){o(e,t)},extendValue:function(t,n,r){o(t,function(){e(this).each(function(){v(this,"propValue",{})[n]=this[n];this[n]=r})})}}}(),b=function(e,t){e.defaultValue===i&&(e.defaultValue="");e.removeAttr||(e.removeAttr={value:function(){e[t||"prop"].set.call(this,e.defaultValue);e.removeAttr._supvalue.call(this)}});e.attr||(e.attr={})};e.extend(t,{getID:function(){var t=(new Date).getTime();return function(n){var n=e(n),r=n.attr("id");r||(t++,r="ID-"+t,n.attr("id",r));return r}}(),extendUNDEFProp:function(t,n){e.each(n,function(e,n){e in t||(t[e]=n)})},createPropDefault:b,data:v,moveToFirstEvent:function(){var t=e._data?"_data":"data";return function(n,r,i){(n=(e[t](n,"events")||{})[r])&&1<n.length&&(r=n.pop(),i||(i="bind"),"bind"==i&&n.delegateCount?n.splice(n.delegateCount,0,r):n.unshift(r))}}(),addShadowDom:function(){var i,s,o,u={init:!1,runs:0,test:function(){var e=u.getHeight(),t=u.getWidth();e!=u.height||t!=u.width?(u.height=e,u.width=t,u.handler({type:"docresize"}),u.runs++,30>u.runs&&setTimeout(u.test,30)):u.runs=0},handler:function(t){clearTimeout(i);i=setTimeout(function(){if("resize"==t.type){var r=e(n).width(),i=e(n).width();if(i==s&&r==o)return;s=i;o=r;u.height=u.getHeight();u.width=u.getWidth()}e.event.trigger("updateshadowdom")},"resize"==t.type?50:9)},_create:function(){e.each({Height:"getHeight",Width:"getWidth"},function(e,t){var n=r.body,i=r.documentElement;u[t]=function(){return Math.max(n["scroll"+e],i["scroll"+e],n["offset"+e],i["offset"+e],i["client"+e])}})},start:function(){!this.init&&r.body&&(this.init=!0,this._create(),this.height=u.getHeight(),this.width=u.getWidth(),setInterval(this.test,400),e(this.test),e(n).bind("load",this.test),e(n).bind("resize",this.handler),function(){var t=e.fn.animate,n;e.fn.animate=function(){clearTimeout(n);n=setTimeout(function(){u.test();u.handler({type:"animationstart"})},19);return t.apply(this,arguments)}}())}};e.event.customEvent.updateshadowdom=!0;t.docObserve=function(){t.ready("DOM",function(){u.start()})};return function(n,r,i){i=i||{};n.jquery&&(n=n[0]);r.jquery&&(r=r[0]);var s=e.data(n,d)||e.data(n,d,{}),o=e.data(r,d)||e.data(r,d,{}),u={};if(i.shadowFocusElement){if(i.shadowFocusElement){i.shadowFocusElement.jquery&&(i.shadowFocusElement=i.shadowFocusElement[0]);u=e.data(i.shadowFocusElement,d)||e.data(i.shadowFocusElement,d,u)}}else i.shadowFocusElement=r;s.hasShadow=r;u.nativeElement=o.nativeElement=n;u.shadowData=o.shadowData=s.shadowData={nativeElement:n,shadowElement:r,shadowFocusElement:i.shadowFocusElement};i.shadowChilds&&i.shadowChilds.each(function(){v(this,"shadowData",o.shadowData)});i.data&&(u.shadowData.data=o.shadowData.data=s.shadowData.data=i.data);i=null;t.docObserve()}}(),propTypes:{standard:function(e){b(e);e.prop||(e.prop={set:function(t){e.attr.set.call(this,""+t)},get:function(){return e.attr.get.call(this)||e.defaultValue}})},"boolean":function(e){b(e);e.prop||(e.prop={set:function(t){t?e.attr.set.call(this,""):e.removeAttr.value.call(this)},get:function(){return null!=e.attr.get.call(this)}})},src:function(){var t=r.createElement("a");t.style.display="none";return function(n,r){b(n);n.prop||(n.prop={set:function(e){n.attr.set.call(this,e)},get:function(){var n=this.getAttribute(r),i;if(null==n)return"";t.setAttribute("href",n+"");if(!e.support.hrefNormalized){try{e(t).insertAfter(this),i=t.getAttribute("href",4)}catch(s){i=t.getAttribute("href",4)}e(t).detach()}return i||t.href}})}}(),enumarated:function(e){b(e);e.prop||(e.prop={set:function(t){e.attr.set.call(this,t)},get:function(){var t=(e.attr.get.call(this)||"").toLowerCase();if(!t||-1==e.limitedTo.indexOf(t))t=e.defaultValue;return t}})}},reflectProperties:function(n,r){"string"==typeof r&&(r=r.split(o));r.forEach(function(r){t.defineNodeNamesProperty(n,r,{prop:{set:function(t){e.attr(this,r,t)},get:function(){return e.attr(this,r)||""}}})})},defineNodeNameProperty:function(n,r,i){a[r]=!0;i.reflect&&t.propTypes[i.propType||"standard"](i,r);["prop","attr","removeAttr"].forEach(function(s){var o=i[s];o&&(o="prop"===s?e.extend({writeable:!0},o):e.extend({},o,{writeable:!0}),l[s](n,r,o),"*"!=n&&t.cfg.extendNative&&"prop"==s&&o.value&&e.isFunction(o.value)&&g(n,r,o),i[s]=o)});i.initAttr&&y.content(n,r);return i},defineNodeNameProperties:function(e,n,r,i){for(var s in n)!i&&n[s].initAttr&&y.createTmpCache(e),r&&!n[s][r]&&(n[s][r]={},["value","set","get"].forEach(function(e){e in n[s]&&(n[s][r][e]=n[s][e],delete n[s][e])})),n[s]=t.defineNodeNameProperty(e,s,n[s]);i||y.flushTmpCache();return n},createElement:function(n,r,i){var s;e.isFunction(r)&&(r={after:r});y.createTmpCache(n);r.before&&y.createElement(n,r.before);i&&(s=t.defineNodeNameProperties(n,i,!1,!0));r.after&&y.createElement(n,r.after);y.flushTmpCache();return s},onNodeNamesPropertyModify:function(t,n,r,i){"string"==typeof t&&(t=t.split(o));e.isFunction(r)&&(r={set:r});t.forEach(function(e){c[e]||(c[e]={});"string"==typeof n&&(n=n.split(o));r.initAttr&&y.createTmpCache(e);n.forEach(function(t){c[e][t]||(c[e][t]=[],a[t]=!0);if(r.set){i&&(r.set.only=i);c[e][t].push(r.set)}r.initAttr&&y.content(e,t)});y.flushTmpCache()})},defineNodeNamesBooleanProperty:function(n,r,s){s||(s={});e.isFunction(s)&&(s.set=s);t.defineNodeNamesProperty(n,r,{attr:{set:function(e){this.setAttribute(r,e);s.set&&s.set.call(this,!0)},get:function(){return null==this.getAttribute(r)?i:r}},removeAttr:{value:function(){this.removeAttribute(r);s.set&&s.set.call(this,!1)}},reflect:!0,propType:"boolean",initAttr:s.initAttr||!1})},contentAttr:function(e,t,n){if(e.nodeName){if(n===i)return e=e.attributes[t]||{},n=e.specified?e.value:null,null==n?i:n;"boolean"==typeof n?n?e.setAttribute(t,t):e.removeAttribute(t):e.setAttribute(t,n)}},activeLang:function(){var n=[],r={},i,o,u=/:\/\/|^\.*\//,a=function(n,r,i){return r&&i&&-1!==e.inArray(r,i.availabeLangs||[])?(n.loading=!0,i=i.langSrc,u.test(i)||(i=t.cfg.basePath+i),t.loader.loadScript(i+r+".js",function(){n.langObj[r]?(n.loading=!1,l(n,!0)):e(function(){n.langObj[r]&&l(n,!0);n.loading=!1})}),!0):!1},f=function(e){r[e]&&r[e].forEach(function(e){e.callback()})},l=function(e,t){if(e.activeLang!=i&&e.activeLang!==o){var n=s[e.module].options;e.langObj[i]||o&&e.langObj[o]?(e.activeLang=i,e.callback(e.langObj[i]||e.langObj[o],i),f(e.module)):!t&&!a(e,i,n)&&!a(e,o,n)&&e.langObj[""]&&""!==e.activeLang&&(e.activeLang="",e.callback(e.langObj[""],i),f(e.module))}};return function(t){if("string"==typeof t&&t!==i)i=t,o=i.split("-")[0],i==o&&(o=!1),e.each(n,function(e,t){l(t)});else if("object"==typeof t)if(t.register)r[t.register]||(r[t.register]=[]),r[t.register].push(t),t.callback();else{t.activeLang||(t.activeLang="");n.push(t);l(t)}return i}}()});e.each({defineNodeNamesProperty:"defineNodeNameProperty",defineNodeNamesProperties:"defineNodeNameProperties",createElements:"createElement"},function(e,n){t[e]=function(e,r,i,s){"string"==typeof e&&(e=e.split(o));var u={};e.forEach(function(e){u[e]=t[n](e,r,i,s)});return u}});t.isReady("webshimLocalization",!0)});(function(e,t){var n=e.webshims.browserVersion;if(!(e.browser.mozilla&&5<n)&&(!e.browser.msie||12>n&&7<n)){var r={article:"article",aside:"complementary",section:"region",nav:"navigation",address:"contentinfo"},i=function(e,t){e.getAttribute("role")||e.setAttribute("role",t)};e.webshims.addReady(function(n,s){e.each(r,function(t,r){for(var o=e(t,n).add(s.filter(t)),u=0,a=o.length;u<a;u++)i(o[u],r)});if(n===t){var o=t.getElementsByTagName("header")[0],u=t.getElementsByTagName("footer"),a=u.length;o&&!e(o).closest("section, article")[0]&&i(o,"banner");a&&(o=u[a-1],e(o).closest("section, article")[0]||i(o,"contentinfo"))}})}})(jQuery,document);(function(e,t,n){var r=t.audio&&t.video,i=!1,s=n.cfg.mediaelement,o=n.bugs,u="jwplayer"==s.player?"mediaelement-swf":"mediaelement-jaris",a=function(){n.ready(u,function(){n.mediaelement.createSWF||(n.mediaelement.loadSwf=!0,n.reTest([u],r))})},f;if(r){var l=document.createElement("video");t.videoBuffered="buffered"in l;i="loop"in l;n.capturingEvents("play,playing,waiting,paused,ended,durationchange,loadedmetadata,canplay,volumechange".split(","));t.videoBuffered||(n.addPolyfill("mediaelement-native-fix",{f:"mediaelement",test:t.videoBuffered,d:["dom-support"]}),n.reTest("mediaelement-native-fix"))}if(r&&!s.preferFlash){var c=function(t){var r=t.target.parentNode;!s.preferFlash&&(e(t.target).is("audio, video")||r&&e("source:last",r)[0]==t.target)&&n.ready("DOM mediaelement",function(){f&&a();n.ready("WINDOWLOAD "+u,function(){setTimeout(function(){f&&!s.preferFlash&&n.mediaelement.createSWF&&!e(t.target).closest("audio, video").is(".nonnative-api-active")?(s.preferFlash=!0,document.removeEventListener("error",c,!0),e("audio, video").mediaLoad(),n.info("switching mediaelements option to 'preferFlash', due to an error with native player: "+t.target.src)):f||document.removeEventListener("error",c,!0)},20)})})};document.addEventListener("error",c,!0);e("audio, video").each(function(){this.error&&c({target:this})})}o.track=!1;t.track&&function(){o.track||(o.track="number"!=typeof e("<track />")[0].readyState);if(!o.track)try{new TextTrackCue(2,3,"")}catch(t){o.track=!0}var r=n.cfg.track,i=function(t){e(t.target).filter("track").each(s)},s=function(){if(o.track||!r.override&&3==e.prop(this,"readyState"))r.override=!0,n.reTest("track"),document.removeEventListener("error",i,!0),this&&e.nodeName(this,"track")?n.error("track support was overwritten. Please check your vtt including your vtt mime-type"):n.info("track support was overwritten. due to bad browser support")},u=function(){document.addEventListener("error",i,!0);o.track?s():e("track").each(s)};r.override||(n.isReady("track")?u():e(u))}();n.register("mediaelement-core",function(e,n,l,c,h){f=swfobject.hasFlashPlayerVersion("9.0.115");var d=n.mediaelement,m=function(t,n){var t=e(t),r={src:t.attr("src")||"",elem:t,srcProp:t.prop("src")};if(!r.src)return r;var i=t.attr("type");if(i)r.type=i,r.container=e.trim(i.split(";")[0]);else if(n||(n=t[0].nodeName.toLowerCase(),"source"==n&&(n=(t.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),i=d.getTypeForSrc(r.src,n))r.type=i,r.container=i;if(i=t.attr("media"))r.media=i;return r},y=!f&&"postMessage"in l&&r,b=function(){var t;return function(){!t&&y&&(t=!0,n.loader.loadScript("https://www.youtube.com/player_api"),e(function(){n.polyfill("mediaelement-yt")}))}}(),w=function(){f?a():b()};n.addPolyfill("mediaelement-yt",{test:!y,d:["dom-support"]});d.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],'audio/ogg;codecs="opus"':"opus","audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":"mp4,mpg4,m4r,m4a,m4p,m4b,aac".split(","),"audio/wav":["wav"],"audio/3gpp":["3gp","3gpp"],"audio/webm":["webm"],"audio/fla":["flv","f4a","fla"],"application/x-mpegURL":["m3u8","m3u"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg","mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"],"application/x-mpegURL":["m3u8","m3u"],"video/MP2T":["ts"]}};d.mimeTypes.source=e.extend({},d.mimeTypes.audio,d.mimeTypes.video);d.getTypeForSrc=function(t,n){if(-1!=t.indexOf("youtube.com/watch?")||-1!=t.indexOf("youtube.com/v/"))return"video/youtube";var t=t.split("?")[0].split("."),t=t[t.length-1],r;e.each(d.mimeTypes[n],function(e,n){if(-1!==n.indexOf(t))return r=e,!1});return r};d.srces=function(t,n){t=e(t);if(!n){var n=[],r=t[0].nodeName.toLowerCase(),i=m(t,r);i.src?n.push(i):e("source",t).each(function(){i=m(this,r);i.src&&n.push(i)});return n}t.removeAttr("src").removeAttr("type").find("source").remove(),e.isArray(n)||(n=[n]),n.forEach(function(e){var n=c.createElement("source");"string"==typeof e&&(e={src:e});n.setAttribute("src",e.src);e.type&&n.setAttribute("type",e.type);e.media&&n.setAttribute("media",e.media);t.append(n)})};e.fn.loadMediaSrc=function(t,n){return this.each(function(){n!==h&&(e(this).removeAttr("poster"),n&&e.attr(this,"poster",n));d.srces(this,t);e(this).mediaLoad()})};d.swfMimeTypes="video/3gpp,video/x-msvideo,video/quicktime,video/x-m4v,video/mp4,video/m4p,video/x-flv,video/flv,audio/mpeg,audio/aac,audio/mp4,audio/x-m4a,audio/m4a,audio/mp3,audio/x-fla,audio/fla,youtube/flv,jwplayer/jwplayer,video/youtube".split(",");d.canThirdPlaySrces=function(t,n){var r="";if(f||y)t=e(t),n=n||d.srces(t),e.each(n,function(e,t){if(t.container&&t.src&&(f&&-1!=d.swfMimeTypes.indexOf(t.container)||y&&"video/youtube"==t.container))return r=t,!1});return r};var E={};d.canNativePlaySrces=function(t,n){var i="";if(r){var t=e(t),s=(t[0].nodeName||"").toLowerCase();if(!E[s])return i;n=n||d.srces(t);e.each(n,function(e,n){if(n.type&&E[s].prop._supvalue.call(t[0],n.type))return i=n,!1})}return i};d.setError=function(t,r){r||(r="can't play sources");e(t).pause().data("mediaerror",r);n.warn("mediaelementError: "+r);setTimeout(function(){e(t).data("mediaerror")&&e(t).trigger("mediaerror")},1)};var S=function(){var e;return function(t,r,i){n.ready(f?u:"mediaelement-yt",function(){d.createSWF?d.createSWF(t,r,i):e||(e=!0,w(),S(t,r,i))});!e&&y&&!d.createSWF&&b()}}(),x=function(e,t,n,r,i){n||!1!==n&&t&&"third"==t.isActive?(n=d.canThirdPlaySrces(e,r))?S(e,n,t):i?d.setError(e,!1):x(e,t,!1,r,!0):(n=d.canNativePlaySrces(e,r))?t&&"third"==t.isActive&&d.setActive(e,"html5",t):i?(d.setError(e,!1),t&&"third"==t.isActive&&d.setActive(e,"html5",t)):x(e,t,!0,r,!0)},T=/^(?:embed|object|datalist)$/i,N=function(t,r){var i=n.data(t,"mediaelementBase")||n.data(t,"mediaelementBase",{}),o=d.srces(t),u=t.parentNode;clearTimeout(i.loadTimer);e.data(t,"mediaerror",!1);o.length&&u&&1==u.nodeType&&!T.test(u.nodeName||"")&&(r=r||n.data(t,"mediaelement"),x(t,r,s.preferFlash||h,o))};e(c).on("ended",function(t){var r=n.data(t.target,"mediaelement");(!i||r&&"html5"!=r.isActive||e.prop(t.target,"loop"))&&setTimeout(function(){!e.prop(t.target,"paused")&&e.prop(t.target,"loop")&&e(t.target).prop("currentTime",0).play()},1)});i||n.defineNodeNamesBooleanProperty(["audio","video"],"loop");["audio","video"].forEach(function(t){var i=n.defineNodeNameProperty(t,"load",{prop:{value:function(){var e=n.data(this,"mediaelement");N(this,e);r&&(!e||"html5"==e.isActive)&&i.prop._supvalue&&i.prop._supvalue.apply(this,arguments)}}});E[t]=n.defineNodeNameProperty(t,"canPlayType",{prop:{value:function(n){var i="";r&&E[t].prop._supvalue&&(i=E[t].prop._supvalue.call(this,n),"no"==i&&(i=""));!i&&f&&(n=e.trim((n||"").split(";")[0]),-1!=d.swfMimeTypes.indexOf(n)&&(i="maybe"));return i}}})});n.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var e=this,t=n.data(e,"mediaelementBase")||n.data(e,"mediaelementBase",{});clearTimeout(t.loadTimer);t.loadTimer=setTimeout(function(){N(e);e=null},9)}});l=function(){n.addReady(function(t,i){e("video, audio",t).add(i.filter("video, audio")).each(function(){e.browser.msie&&8<n.browserVersion&&e.prop(this,"paused")&&!e.prop(this,"readyState")&&e(this).is('audio[preload="none"][controls]:not([autoplay])')?e(this).prop("preload","metadata").mediaLoad():N(this);if(r){var t,i,s=this,o=function(){var t=e.prop(s,"buffered");if(t){for(var n="",r=0,i=t.length;r<i;r++)n+=t.end(r);return n}},u=function(){var t=o();t!=i&&(i=t,e(s).triggerHandler("progress"))};e(this).on({"play loadstart progress":function(e){"progress"==e.type&&(i=o());clearTimeout(t);t=setTimeout(u,999)},"emptied stalled mediaerror abort suspend":function(e){"emptied"==e.type&&(i=!1);clearTimeout(t)}})}})})};t.track&&!o.track&&n.defineProperty(TextTrack.prototype,"shimActiveCues",{get:function(){return this._shimActiveCues||this.activeCues}});r?(n.isReady("mediaelement-core",!0),l(),n.ready("WINDOWLOAD mediaelement",w)):n.ready(u,l);e(function(){n.loader.loadList(["track-ui"])})})})(jQuery,Modernizr,jQuery.webshims);jQuery.webshims.register("details",function(e,t,n,r,i,s){var o=function(t){var n=e(t).parent("details");if(n[0]&&n.children(":first").get(0)===t)return n},u=function(t,n){var t=e(t),n=e(n),r=e.data(n[0],"summaryElement");e.data(t[0],"detailsElement",n);if(!r||t[0]!==r[0])r&&(r.hasClass("fallback-summary")?r.remove():r.unbind(".summaryPolyfill").removeData("detailsElement").removeAttr("role").removeAttr("tabindex").removeAttr("aria-expanded").removeClass("summary-button").find("span.details-open-indicator").remove()),e.data(n[0],"summaryElement",t),n.prop("open",n.prop("open"))};t.createElement("summary",function(){var n=o(this);if(n&&!e.data(this,"detailsElement")){var r,i,s=e.attr(this,"tabIndex")||"0";u(this,n);e(this).on({"focus.summaryPolyfill":function(){e(this).addClass("summary-has-focus")},"blur.summaryPolyfill":function(){e(this).removeClass("summary-has-focus")},"mouseenter.summaryPolyfill":function(){e(this).addClass("summary-has-hover")},"mouseleave.summaryPolyfill":function(){e(this).removeClass("summary-has-hover")},"click.summaryPolyfill":function(t){var n=o(this);if(n){if(!i&&t.originalEvent)return i=!0,t.stopImmediatePropagation(),t.preventDefault(),e(this).trigger("click"),i=!1;clearTimeout(r);r=setTimeout(function(){t.isDefaultPrevented()||n.prop("open",!n.prop("open"))},0)}},"keydown.summaryPolyfill":function(t){(13==t.keyCode||32==t.keyCode)&&!t.isDefaultPrevented()&&(i=!0,t.preventDefault(),e(this).trigger("click"),i=!1)}}).attr({tabindex:s,role:"button"}).prepend('<span class="details-open-indicator" />');t.moveToFirstEvent(this,"click")}});var a;t.defineNodeNamesBooleanProperty("details","open",function(t){var n=e(e.data(this,"summaryElement"));if(n){var r=t?"removeClass":"addClass",i=e(this);if(!a&&s.animate){i.stop().css({width:"",height:""});var o={width:i.width(),height:i.height()}}n.attr("aria-expanded",""+t);i[r]("closed-details-summary").children().not(n[0])[r]("closed-details-child");!a&&s.animate&&(t={width:i.width(),height:i.height()},i.css(o).animate(t,{complete:function(){e(this).css({width:"",height:""})}}))}});t.createElement("details",function(){a=!0;var t=e.data(this,"summaryElement");t||(t=e("> summary:first-child",this),t[0]?u(t,this):(e(this).prependPolyfill('<summary class="fallback-summary">'+s.text+"</summary>"),e.data(this,"summaryElement")));e.prop(this,"open",e.prop(this,"open"));a=!1})});