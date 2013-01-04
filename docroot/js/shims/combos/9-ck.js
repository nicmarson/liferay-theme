jQuery.webshims.register("dom-extend",function(e,t,n,r,i){var s=t.modules,o=/\s*,\s*/,u={},a={},f={},l={},c={},h=e.fn.val,p=function(t,n,r,i,s){return s?h.call(e(t)):h.call(e(t),r)};e.fn.val=function(t){var n=this[0];arguments.length&&null==t&&(t="");if(!arguments.length)return!n||1!==n.nodeType?h.call(this):e.prop(n,"value",t,"val",!0);if(e.isArray(t))return h.apply(this,arguments);var r=e.isFunction(t);return this.each(function(s){n=this;1===n.nodeType&&(r?(s=t.call(n,s,e.prop(n,"value",i,"val",!0)),null==s&&(s=""),e.prop(n,"value",s,"val")):e.prop(n,"value",t,"val"))})};var d="_webshimsLib"+Math.round(1e3*Math.random()),v=function(t,n,r){t=t.jquery?t[0]:t;if(!t)return r||{};var s=e.data(t,d);r!==i&&(s||(s=e.data(t,d,{})),n&&(s[n]=r));return n?s&&s[n]:s};[{name:"getNativeElement",prop:"nativeElement"},{name:"getShadowElement",prop:"shadowElement"},{name:"getShadowFocusElement",prop:"shadowFocusElement"}].forEach(function(t){e.fn[t.name]=function(){return this.map(function(){var e=v(this,"shadowData");return e&&e[t.prop]||this})}});["removeAttr","prop","attr"].forEach(function(n){u[n]=e[n];e[n]=function(t,r,s,o,l){var h="val"==o,d=h?p:u[n];if(!t||!a[r]||1!==t.nodeType||!h&&o&&"attr"==n&&e.attrFn[r])return d(t,r,s,o,l);var v=(t.nodeName||"").toLowerCase(),m=f[v],g="attr"!=n||!1!==s&&null!==s?n:"removeAttr",y,b,w;m||(m=f["*"]);m&&(m=m[r]);m&&(y=m[g]);if(y){"value"==r&&(b=y.isVal,y.isVal=h);if("removeAttr"===g)return y.value.call(t);if(s===i)return y.get?y.get.call(t):y.value;y.set&&("attr"==n&&!0===s&&(s=r),w=y.set.call(t,s));"value"==r&&(y.isVal=b)}else w=d(t,r,s,o,l);if((s!==i||"removeAttr"===g)&&c[v]&&c[v][r]){var E;E="removeAttr"==g?!1:"prop"==g?!!s:!0;c[v][r].forEach(function(e){(!e.only||(e.only="prop"==n)||"attr"==e.only&&"prop"!=n)&&e.call(t,s,E,h?"val":g,n)})}return w};l[n]=function(r,s,o){f[r]||(f[r]={});f[r][s]||(f[r][s]={});var a=f[r][s][n],l=function(e,t,r){return t&&t[e]?t[e]:r&&r[e]?r[e]:"prop"==n&&"value"==s?function(e){return o.isVal?p(this,s,e,!1,0===arguments.length):u[n](this,s,e)}:"prop"==n&&"value"==e&&o.value.apply?function(e){var t=u[n](this,s);t&&t.apply&&(t=t.apply(this,arguments));return t}:function(e){return u[n](this,s,e)}};f[r][s][n]=o;if(o.value===i){o.set||(o.set=o.writeable?l("set",o,a):t.cfg.useStrict&&"prop"==s?function(){throw s+" is readonly on "+r}:e.noop);o.get||(o.get=l("get",o,a))}["value","get","set"].forEach(function(e){o[e]&&(o["_sup"+e]=l(e,a))})}});var m=!e.browser.msie||8<parseInt(e.browser.version,10),g=function(){var e=t.getPrototypeOf(r.createElement("foobar")),n=Object.prototype.hasOwnProperty;return function(i,s,o){var u=r.createElement(i),a=t.getPrototypeOf(u);if(m&&a&&e!==a&&(!u[s]||!n.call(u,s))){var f=u[s];o._supvalue=function(){return f&&f.apply?f.apply(this,arguments):f};a[s]=o.value}else o._supvalue=function(){var e=v(this,"propValue");return e&&e[s]&&e[s].apply?e[s].apply(this,arguments):e&&e[s]},y.extendValue(i,s,o.value);o.value._supvalue=o._supvalue}}(),y=function(){var n={};t.addReady(function(r,i){var s={},o=function(t){s[t]||(s[t]=e(r.getElementsByTagName(t)),i[0]&&e.nodeName(i[0],t)&&(s[t]=s[t].add(i)))};e.each(n,function(e,n){o(e);!n||!n.forEach?t.warn("Error: with "+e+"-property. methods: "+n):n.forEach(function(t){s[e].each(t)})});s=null});var i,s=e([]),o=function(t,s){n[t]?n[t].push(s):n[t]=[s];e.isDOMReady&&(i||e(r.getElementsByTagName(t))).each(s)};return{createTmpCache:function(t){e.isDOMReady&&(i=i||e(r.getElementsByTagName(t)));return i||s},flushTmpCache:function(){i=null},content:function(t,n){o(t,function(){var t=e.attr(this,n);null!=t&&e.attr(this,n,t)})},createElement:function(e,t){o(e,t)},extendValue:function(t,n,r){o(t,function(){e(this).each(function(){v(this,"propValue",{})[n]=this[n];this[n]=r})})}}}(),b=function(e,t){e.defaultValue===i&&(e.defaultValue="");e.removeAttr||(e.removeAttr={value:function(){e[t||"prop"].set.call(this,e.defaultValue);e.removeAttr._supvalue.call(this)}});e.attr||(e.attr={})};e.extend(t,{getID:function(){var t=(new Date).getTime();return function(n){var n=e(n),r=n.attr("id");r||(t++,r="ID-"+t,n.attr("id",r));return r}}(),extendUNDEFProp:function(t,n){e.each(n,function(e,n){e in t||(t[e]=n)})},createPropDefault:b,data:v,moveToFirstEvent:function(){var t=e._data?"_data":"data";return function(n,r,i){(n=(e[t](n,"events")||{})[r])&&1<n.length&&(r=n.pop(),i||(i="bind"),"bind"==i&&n.delegateCount?n.splice(n.delegateCount,0,r):n.unshift(r))}}(),addShadowDom:function(){var i,s,o,u={init:!1,runs:0,test:function(){var e=u.getHeight(),t=u.getWidth();e!=u.height||t!=u.width?(u.height=e,u.width=t,u.handler({type:"docresize"}),u.runs++,30>u.runs&&setTimeout(u.test,30)):u.runs=0},handler:function(t){clearTimeout(i);i=setTimeout(function(){if("resize"==t.type){var r=e(n).width(),i=e(n).width();if(i==s&&r==o)return;s=i;o=r;u.height=u.getHeight();u.width=u.getWidth()}e.event.trigger("updateshadowdom")},"resize"==t.type?50:9)},_create:function(){e.each({Height:"getHeight",Width:"getWidth"},function(e,t){var n=r.body,i=r.documentElement;u[t]=function(){return Math.max(n["scroll"+e],i["scroll"+e],n["offset"+e],i["offset"+e],i["client"+e])}})},start:function(){!this.init&&r.body&&(this.init=!0,this._create(),this.height=u.getHeight(),this.width=u.getWidth(),setInterval(this.test,400),e(this.test),e(n).bind("load",this.test),e(n).bind("resize",this.handler),function(){var t=e.fn.animate,n;e.fn.animate=function(){clearTimeout(n);n=setTimeout(function(){u.test();u.handler({type:"animationstart"})},19);return t.apply(this,arguments)}}())}};e.event.customEvent.updateshadowdom=!0;t.docObserve=function(){t.ready("DOM",function(){u.start()})};return function(n,r,i){i=i||{};n.jquery&&(n=n[0]);r.jquery&&(r=r[0]);var s=e.data(n,d)||e.data(n,d,{}),o=e.data(r,d)||e.data(r,d,{}),u={};if(i.shadowFocusElement){if(i.shadowFocusElement){i.shadowFocusElement.jquery&&(i.shadowFocusElement=i.shadowFocusElement[0]);u=e.data(i.shadowFocusElement,d)||e.data(i.shadowFocusElement,d,u)}}else i.shadowFocusElement=r;s.hasShadow=r;u.nativeElement=o.nativeElement=n;u.shadowData=o.shadowData=s.shadowData={nativeElement:n,shadowElement:r,shadowFocusElement:i.shadowFocusElement};i.shadowChilds&&i.shadowChilds.each(function(){v(this,"shadowData",o.shadowData)});i.data&&(u.shadowData.data=o.shadowData.data=s.shadowData.data=i.data);i=null;t.docObserve()}}(),propTypes:{standard:function(e){b(e);e.prop||(e.prop={set:function(t){e.attr.set.call(this,""+t)},get:function(){return e.attr.get.call(this)||e.defaultValue}})},"boolean":function(e){b(e);e.prop||(e.prop={set:function(t){t?e.attr.set.call(this,""):e.removeAttr.value.call(this)},get:function(){return null!=e.attr.get.call(this)}})},src:function(){var t=r.createElement("a");t.style.display="none";return function(n,r){b(n);n.prop||(n.prop={set:function(e){n.attr.set.call(this,e)},get:function(){var n=this.getAttribute(r),i;if(null==n)return"";t.setAttribute("href",n+"");if(!e.support.hrefNormalized){try{e(t).insertAfter(this),i=t.getAttribute("href",4)}catch(s){i=t.getAttribute("href",4)}e(t).detach()}return i||t.href}})}}(),enumarated:function(e){b(e);e.prop||(e.prop={set:function(t){e.attr.set.call(this,t)},get:function(){var t=(e.attr.get.call(this)||"").toLowerCase();if(!t||-1==e.limitedTo.indexOf(t))t=e.defaultValue;return t}})}},reflectProperties:function(n,r){"string"==typeof r&&(r=r.split(o));r.forEach(function(r){t.defineNodeNamesProperty(n,r,{prop:{set:function(t){e.attr(this,r,t)},get:function(){return e.attr(this,r)||""}}})})},defineNodeNameProperty:function(n,r,i){a[r]=!0;i.reflect&&t.propTypes[i.propType||"standard"](i,r);["prop","attr","removeAttr"].forEach(function(s){var o=i[s];o&&(o="prop"===s?e.extend({writeable:!0},o):e.extend({},o,{writeable:!0}),l[s](n,r,o),"*"!=n&&t.cfg.extendNative&&"prop"==s&&o.value&&e.isFunction(o.value)&&g(n,r,o),i[s]=o)});i.initAttr&&y.content(n,r);return i},defineNodeNameProperties:function(e,n,r,i){for(var s in n)!i&&n[s].initAttr&&y.createTmpCache(e),r&&!n[s][r]&&(n[s][r]={},["value","set","get"].forEach(function(e){e in n[s]&&(n[s][r][e]=n[s][e],delete n[s][e])})),n[s]=t.defineNodeNameProperty(e,s,n[s]);i||y.flushTmpCache();return n},createElement:function(n,r,i){var s;e.isFunction(r)&&(r={after:r});y.createTmpCache(n);r.before&&y.createElement(n,r.before);i&&(s=t.defineNodeNameProperties(n,i,!1,!0));r.after&&y.createElement(n,r.after);y.flushTmpCache();return s},onNodeNamesPropertyModify:function(t,n,r,i){"string"==typeof t&&(t=t.split(o));e.isFunction(r)&&(r={set:r});t.forEach(function(e){c[e]||(c[e]={});"string"==typeof n&&(n=n.split(o));r.initAttr&&y.createTmpCache(e);n.forEach(function(t){c[e][t]||(c[e][t]=[],a[t]=!0);if(r.set){i&&(r.set.only=i);c[e][t].push(r.set)}r.initAttr&&y.content(e,t)});y.flushTmpCache()})},defineNodeNamesBooleanProperty:function(n,r,s){s||(s={});e.isFunction(s)&&(s.set=s);t.defineNodeNamesProperty(n,r,{attr:{set:function(e){this.setAttribute(r,e);s.set&&s.set.call(this,!0)},get:function(){return null==this.getAttribute(r)?i:r}},removeAttr:{value:function(){this.removeAttribute(r);s.set&&s.set.call(this,!1)}},reflect:!0,propType:"boolean",initAttr:s.initAttr||!1})},contentAttr:function(e,t,n){if(e.nodeName){if(n===i)return e=e.attributes[t]||{},n=e.specified?e.value:null,null==n?i:n;"boolean"==typeof n?n?e.setAttribute(t,t):e.removeAttribute(t):e.setAttribute(t,n)}},activeLang:function(){var n=[],r={},i,o,u=/:\/\/|^\.*\//,a=function(n,r,i){return r&&i&&-1!==e.inArray(r,i.availabeLangs||[])?(n.loading=!0,i=i.langSrc,u.test(i)||(i=t.cfg.basePath+i),t.loader.loadScript(i+r+".js",function(){n.langObj[r]?(n.loading=!1,l(n,!0)):e(function(){n.langObj[r]&&l(n,!0);n.loading=!1})}),!0):!1},f=function(e){r[e]&&r[e].forEach(function(e){e.callback()})},l=function(e,t){if(e.activeLang!=i&&e.activeLang!==o){var n=s[e.module].options;e.langObj[i]||o&&e.langObj[o]?(e.activeLang=i,e.callback(e.langObj[i]||e.langObj[o],i),f(e.module)):!t&&!a(e,i,n)&&!a(e,o,n)&&e.langObj[""]&&""!==e.activeLang&&(e.activeLang="",e.callback(e.langObj[""],i),f(e.module))}};return function(t){if("string"==typeof t&&t!==i)i=t,o=i.split("-")[0],i==o&&(o=!1),e.each(n,function(e,t){l(t)});else if("object"==typeof t)if(t.register)r[t.register]||(r[t.register]=[]),r[t.register].push(t),t.callback();else{t.activeLang||(t.activeLang="");n.push(t);l(t)}return i}}()});e.each({defineNodeNamesProperty:"defineNodeNameProperty",defineNodeNamesProperties:"defineNodeNameProperties",createElements:"createElement"},function(e,n){t[e]=function(e,r,i,s){"string"==typeof e&&(e=e.split(o));var u={};e.forEach(function(e){u[e]=t[n](e,r,i,s)});return u}});t.isReady("webshimLocalization",!0)});(function(e,t){var n=e.webshims.browserVersion;if(!(e.browser.mozilla&&5<n)&&(!e.browser.msie||12>n&&7<n)){var r={article:"article",aside:"complementary",section:"region",nav:"navigation",address:"contentinfo"},i=function(e,t){e.getAttribute("role")||e.setAttribute("role",t)};e.webshims.addReady(function(n,s){e.each(r,function(t,r){for(var o=e(t,n).add(s.filter(t)),u=0,a=o.length;u<a;u++)i(o[u],r)});if(n===t){var o=t.getElementsByTagName("header")[0],u=t.getElementsByTagName("footer"),a=u.length;o&&!e(o).closest("section, article")[0]&&i(o,"banner");a&&(o=u[a-1],e(o).closest("section, article")[0]||i(o,"contentinfo"))}})}})(jQuery,document);(function(e,t,n){var r=t.audio&&t.video,i=!1,s=n.cfg.mediaelement,o=n.bugs,u="jwplayer"==s.player?"mediaelement-swf":"mediaelement-jaris",a=function(){n.ready(u,function(){n.mediaelement.createSWF||(n.mediaelement.loadSwf=!0,n.reTest([u],r))})},f;if(r){var l=document.createElement("video");t.videoBuffered="buffered"in l;i="loop"in l;n.capturingEvents("play,playing,waiting,paused,ended,durationchange,loadedmetadata,canplay,volumechange".split(","));t.videoBuffered||(n.addPolyfill("mediaelement-native-fix",{f:"mediaelement",test:t.videoBuffered,d:["dom-support"]}),n.reTest("mediaelement-native-fix"))}if(r&&!s.preferFlash){var c=function(t){var r=t.target.parentNode;!s.preferFlash&&(e(t.target).is("audio, video")||r&&e("source:last",r)[0]==t.target)&&n.ready("DOM mediaelement",function(){f&&a();n.ready("WINDOWLOAD "+u,function(){setTimeout(function(){f&&!s.preferFlash&&n.mediaelement.createSWF&&!e(t.target).closest("audio, video").is(".nonnative-api-active")?(s.preferFlash=!0,document.removeEventListener("error",c,!0),e("audio, video").mediaLoad(),n.info("switching mediaelements option to 'preferFlash', due to an error with native player: "+t.target.src)):f||document.removeEventListener("error",c,!0)},20)})})};document.addEventListener("error",c,!0);e("audio, video").each(function(){this.error&&c({target:this})})}o.track=!1;t.track&&function(){o.track||(o.track="number"!=typeof e("<track />")[0].readyState);if(!o.track)try{new TextTrackCue(2,3,"")}catch(t){o.track=!0}var r=n.cfg.track,i=function(t){e(t.target).filter("track").each(s)},s=function(){if(o.track||!r.override&&3==e.prop(this,"readyState"))r.override=!0,n.reTest("track"),document.removeEventListener("error",i,!0),this&&e.nodeName(this,"track")?n.error("track support was overwritten. Please check your vtt including your vtt mime-type"):n.info("track support was overwritten. due to bad browser support")},u=function(){document.addEventListener("error",i,!0);o.track?s():e("track").each(s)};r.override||(n.isReady("track")?u():e(u))}();n.register("mediaelement-core",function(e,n,l,c,h){f=swfobject.hasFlashPlayerVersion("9.0.115");var d=n.mediaelement,v=function(t,n){var t=e(t),r={src:t.attr("src")||"",elem:t,srcProp:t.prop("src")};if(!r.src)return r;var i=t.attr("type");if(i)r.type=i,r.container=e.trim(i.split(";")[0]);else if(n||(n=t[0].nodeName.toLowerCase(),"source"==n&&(n=(t.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),i=d.getTypeForSrc(r.src,n))r.type=i,r.container=i;if(i=t.attr("media"))r.media=i;return r},g=!f&&"postMessage"in l&&r,y=function(){var t;return function(){!t&&g&&(t=!0,n.loader.loadScript("https://www.youtube.com/player_api"),e(function(){n.polyfill("mediaelement-yt")}))}}(),b=function(){f?a():y()};n.addPolyfill("mediaelement-yt",{test:!g,d:["dom-support"]});d.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],'audio/ogg;codecs="opus"':"opus","audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":"mp4,mpg4,m4r,m4a,m4p,m4b,aac".split(","),"audio/wav":["wav"],"audio/3gpp":["3gp","3gpp"],"audio/webm":["webm"],"audio/fla":["flv","f4a","fla"],"application/x-mpegURL":["m3u8","m3u"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg","mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"],"application/x-mpegURL":["m3u8","m3u"],"video/MP2T":["ts"]}};d.mimeTypes.source=e.extend({},d.mimeTypes.audio,d.mimeTypes.video);d.getTypeForSrc=function(t,n){if(-1!=t.indexOf("youtube.com/watch?")||-1!=t.indexOf("youtube.com/v/"))return"video/youtube";var t=t.split("?")[0].split("."),t=t[t.length-1],r;e.each(d.mimeTypes[n],function(e,n){if(-1!==n.indexOf(t))return r=e,!1});return r};d.srces=function(t,n){t=e(t);if(!n){var n=[],r=t[0].nodeName.toLowerCase(),i=v(t,r);i.src?n.push(i):e("source",t).each(function(){i=v(this,r);i.src&&n.push(i)});return n}t.removeAttr("src").removeAttr("type").find("source").remove(),e.isArray(n)||(n=[n]),n.forEach(function(e){var n=c.createElement("source");"string"==typeof e&&(e={src:e});n.setAttribute("src",e.src);e.type&&n.setAttribute("type",e.type);e.media&&n.setAttribute("media",e.media);t.append(n)})};e.fn.loadMediaSrc=function(t,n){return this.each(function(){n!==h&&(e(this).removeAttr("poster"),n&&e.attr(this,"poster",n));d.srces(this,t);e(this).mediaLoad()})};d.swfMimeTypes="video/3gpp,video/x-msvideo,video/quicktime,video/x-m4v,video/mp4,video/m4p,video/x-flv,video/flv,audio/mpeg,audio/aac,audio/mp4,audio/x-m4a,audio/m4a,audio/mp3,audio/x-fla,audio/fla,youtube/flv,jwplayer/jwplayer,video/youtube".split(",");d.canThirdPlaySrces=function(t,n){var r="";if(f||g)t=e(t),n=n||d.srces(t),e.each(n,function(e,t){if(t.container&&t.src&&(f&&-1!=d.swfMimeTypes.indexOf(t.container)||g&&"video/youtube"==t.container))return r=t,!1});return r};var w={};d.canNativePlaySrces=function(t,n){var i="";if(r){var t=e(t),s=(t[0].nodeName||"").toLowerCase();if(!w[s])return i;n=n||d.srces(t);e.each(n,function(e,n){if(n.type&&w[s].prop._supvalue.call(t[0],n.type))return i=n,!1})}return i};d.setError=function(t,r){r||(r="can't play sources");e(t).pause().data("mediaerror",r);n.warn("mediaelementError: "+r);setTimeout(function(){e(t).data("mediaerror")&&e(t).trigger("mediaerror")},1)};var E=function(){var e;return function(t,r,i){n.ready(f?u:"mediaelement-yt",function(){d.createSWF?d.createSWF(t,r,i):e||(e=!0,b(),E(t,r,i))});!e&&g&&!d.createSWF&&y()}}(),S=function(e,t,n,r,i){n||!1!==n&&t&&"third"==t.isActive?(n=d.canThirdPlaySrces(e,r))?E(e,n,t):i?d.setError(e,!1):S(e,t,!1,r,!0):(n=d.canNativePlaySrces(e,r))?t&&"third"==t.isActive&&d.setActive(e,"html5",t):i?(d.setError(e,!1),t&&"third"==t.isActive&&d.setActive(e,"html5",t)):S(e,t,!0,r,!0)},x=/^(?:embed|object|datalist)$/i,T=function(t,r){var i=n.data(t,"mediaelementBase")||n.data(t,"mediaelementBase",{}),o=d.srces(t),u=t.parentNode;clearTimeout(i.loadTimer);e.data(t,"mediaerror",!1);o.length&&u&&1==u.nodeType&&!x.test(u.nodeName||"")&&(r=r||n.data(t,"mediaelement"),S(t,r,s.preferFlash||h,o))};e(c).on("ended",function(t){var r=n.data(t.target,"mediaelement");(!i||r&&"html5"!=r.isActive||e.prop(t.target,"loop"))&&setTimeout(function(){!e.prop(t.target,"paused")&&e.prop(t.target,"loop")&&e(t.target).prop("currentTime",0).play()},1)});i||n.defineNodeNamesBooleanProperty(["audio","video"],"loop");["audio","video"].forEach(function(t){var i=n.defineNodeNameProperty(t,"load",{prop:{value:function(){var e=n.data(this,"mediaelement");T(this,e);r&&(!e||"html5"==e.isActive)&&i.prop._supvalue&&i.prop._supvalue.apply(this,arguments)}}});w[t]=n.defineNodeNameProperty(t,"canPlayType",{prop:{value:function(n){var i="";r&&w[t].prop._supvalue&&(i=w[t].prop._supvalue.call(this,n),"no"==i&&(i=""));!i&&f&&(n=e.trim((n||"").split(";")[0]),-1!=d.swfMimeTypes.indexOf(n)&&(i="maybe"));return i}}})});n.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var e=this,t=n.data(e,"mediaelementBase")||n.data(e,"mediaelementBase",{});clearTimeout(t.loadTimer);t.loadTimer=setTimeout(function(){T(e);e=null},9)}});l=function(){n.addReady(function(t,i){e("video, audio",t).add(i.filter("video, audio")).each(function(){e.browser.msie&&8<n.browserVersion&&e.prop(this,"paused")&&!e.prop(this,"readyState")&&e(this).is('audio[preload="none"][controls]:not([autoplay])')?e(this).prop("preload","metadata").mediaLoad():T(this);if(r){var t,i,s=this,o=function(){var t=e.prop(s,"buffered");if(t){for(var n="",r=0,i=t.length;r<i;r++)n+=t.end(r);return n}},u=function(){var t=o();t!=i&&(i=t,e(s).triggerHandler("progress"))};e(this).on({"play loadstart progress":function(e){"progress"==e.type&&(i=o());clearTimeout(t);t=setTimeout(u,999)},"emptied stalled mediaerror abort suspend":function(e){"emptied"==e.type&&(i=!1);clearTimeout(t)}})}})})};t.track&&!o.track&&n.defineProperty(TextTrack.prototype,"shimActiveCues",{get:function(){return this._shimActiveCues||this.activeCues}});r?(n.isReady("mediaelement-core",!0),l(),n.ready("WINDOWLOAD mediaelement",b)):n.ready(u,l);e(function(){n.loader.loadList(["track-ui"])})})})(jQuery,Modernizr,jQuery.webshims);jQuery.webshims.register("mediaelement-swf",function(e,t,n,r,i,s){var o=t.mediaelement,u=n.swfobject,a=Modernizr.audio&&Modernizr.video,f=u.hasFlashPlayerVersion("9.0.115"),l=0,n={paused:!0,ended:!1,currentSrc:"",duration:n.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:{start:function(e){if(!e)return 0;t.error("buffered index size error")},end:function(e){if(!e)return 0;t.error("buffered index size error")},length:0}},c=Object.keys(n),h={currentTime:0,volume:1,muted:!1};Object.keys(h);var p=e.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_bufferedEnd:0,_bufferedStart:0,_metadata:!1,_durationCalcs:-1,_callMeta:!1,currentTime:0,_ppFlag:i},n,h),d=/^jwplayer-/,v=function(e){if(e=r.getElementById(e.replace(d,"")))return e=t.data(e,"mediaelement"),"third"==e.isActive?e:null},m=function(e){return(e=t.data(e,"mediaelement"))&&"third"==e.isActive?e:null},g=function(t,n){n=e.Event(n);n.preventDefault();e.event.trigger(n,i,t)},y=s.playerPath||t.cfg.basePath+"jwplayer/"+(s.playerName||"player.swf"),b=s.pluginPath||t.cfg.basePath+"swf/jwwebshims.swf";t.extendUNDEFProp(s.params,{allowscriptaccess:"always",allowfullscreen:"true",wmode:"transparent"});t.extendUNDEFProp(s.vars,{screencolor:"ffffffff"});t.extendUNDEFProp(s.attrs,{bgcolor:"#000000"});var w=function(t,n){var r=t.duration;if(!(r&&0<t._durationCalcs)){try{if(t.duration=t.jwapi.getPlaylist()[0].duration,!t.duration||0>=t.duration||t.duration===t._lastDuration)t.duration=r}catch(i){}t.duration&&t.duration!=t._lastDuration?(g(t._elem,"durationchange"),("audio"==t._elemNodeName||t._callMeta)&&o.jwEvents.Model.META(e.extend({duration:t.duration},n),t),t._durationCalcs--):t._durationCalcs++}},E=function(e,t){3>e&&clearTimeout(t._canplaythroughTimer);3<=e&&3>t.readyState&&(t.readyState=e,g(t._elem,"canplay"),clearTimeout(t._canplaythroughTimer),t._canplaythroughTimer=setTimeout(function(){E(4,t)},4e3));4<=e&&4>t.readyState&&(t.readyState=e,g(t._elem,"canplaythrough"));t.readyState=e};e.extend(e.event.customEvent,{updatemediaelementdimensions:!0,flashblocker:!0,swfstageresize:!0,mediaelementapichange:!0});o.jwEvents={View:{PLAY:function(e){var t=v(e.id);if(t&&!t.stopPlayPause&&(t._ppFlag=!0,t.paused==e.state)){t.paused=!e.state;t.ended&&(t.ended=!1);g(t._elem,e.state?"play":"pause")}}},Model:{BUFFER:function(t){var n=v(t.id);if(n&&"percentage"in t&&n._bufferedEnd!=t.percentage){n.networkState=100==t.percentage?1:2;(isNaN(n.duration)||5<t.percentage&&25>t.percentage||100===t.percentage)&&w(n,t);n.ended&&(n.ended=!1);if(n.duration){2<t.percentage&&20>t.percentage?E(3,n):20<t.percentage&&E(4,n);n._bufferedEnd&&n._bufferedEnd>t.percentage&&(n._bufferedStart=n.currentTime||0);n._bufferedEnd=t.percentage;n.buffered.length=1;100==t.percentage&&(n.networkState=1,E(4,n));e.event.trigger("progress",i,n._elem,!0)}}},META:function(e,t){if(t=t&&t.networkState?t:v(e.id))if("duration"in e){if(!t._metadata||!!e.height&&t.videoHeight!=e.height||e.duration!==t.duration){t._metadata=!0;var n=t.duration;e.duration&&(t.duration=e.duration);t._lastDuration=t.duration;if(e.height||e.width)t.videoHeight=e.height||0,t.videoWidth=e.width||0;t.networkState||(t.networkState=2);1>t.readyState&&E(1,t);t.duration&&n!==t.duration&&g(t._elem,"durationchange");g(t._elem,"loadedmetadata")}}else t._callMeta=!0},TIME:function(e){var t=v(e.id);if(t&&t.currentTime!==e.position){t.currentTime=e.position;t.duration&&t.duration<t.currentTime&&w(t,e);2>t.readyState&&E(2,t);t.ended&&(t.ended=!1);g(t._elem,"timeupdate")}},STATE:function(e){var t=v(e.id);if(t)switch(e.newstate){case"BUFFERING":t.ended&&(t.ended=!1);E(1,t);g(t._elem,"waiting");break;case"PLAYING":t.paused=!1;t._ppFlag=!0;t.duration||w(t,e);3>t.readyState&&E(3,t);t.ended&&(t.ended=!1);g(t._elem,"playing");break;case"PAUSED":!t.paused&&!t.stopPlayPause&&(t.paused=!0,t._ppFlag=!0,g(t._elem,"pause"));break;case"COMPLETED":4>t.readyState&&E(4,t),t.ended=!0,g(t._elem,"ended")}}},Controller:{ERROR:function(e){var t=v(e.id);t&&o.setError(t._elem,e.message)},SEEK:function(e){var t=v(e.id);if(t){t.ended&&(t.ended=!1);if(t.paused)try{t.jwapi.sendEvent("play","false")}catch(n){}t.currentTime!=e.position&&(t.currentTime=e.position,g(t._elem,"timeupdate"))}},VOLUME:function(e){var t=v(e.id);t&&(e=e.percentage/100,t.volume!=e)&&(t.volume=e,g(t._elem,"volumechange"))},MUTE:function(e){if(!e.state){var t=v(e.id);t&&t.muted!=e.state&&(t.muted=e.state,g(t._elem,"volumechange"))}}}};var S=function(t){var n=!0;e.each(o.jwEvents,function(r,i){e.each(i,function(e){try{t.jwapi["add"+r+"Listener"](e,"jQuery.webshims.mediaelement.jwEvents."+r+"."+e)}catch(i){return n=!1}})});return n},x=function(e){var t=e.actionQueue.length,n=0,r;if(t&&"third"==e.isActive)for(;e.actionQueue.length&&t>n;)n++,r=e.actionQueue.shift(),e.jwapi[r.fn].apply(e.jwapi,r.args);e.actionQueue.length&&(e.actionQueue=[])},T=function(t){t&&(t._ppFlag===i&&e.prop(t._elem,"autoplay")||!t.paused)&&setTimeout(function(){if("third"==t.isActive&&(t._ppFlag===i||!t.paused))try{e(t._elem).play()}catch(n){}},1)};o.playerResize=function(t){t&&(t=r.getElementById(t.replace(d,"")))&&e(t).triggerHandler("swfstageresize")};e(r).on("emptied",function(e){e=m(e.target);T(e)});var N;o.jwPlayerReady=function(n){var r=v(n.id),i=0,s=function(){if(!(9<i))if(i++,S(r)){if(r.wasSwfReady)e(r._elem).mediaLoad();else{var o=parseFloat(n.version,10);(5.1>o||6<=o)&&t.warn("mediaelement-swf is only testet with jwplayer 5.6+")}r.wasSwfReady=!0;r.tryedReframeing=0;x(r);T(r)}else clearTimeout(r.reframeTimer),r.reframeTimer=setTimeout(s,9*i),2<i&&9>r.tryedReframeing&&(r.tryedReframeing++,r.shadowElem.css({overflow:"visible"}),setTimeout(function(){r.shadowElem.css({overflow:"hidden"})},16))};if(r&&r.jwapi){r.tryedReframeing||(r.tryedReframeing=0);clearTimeout(N);r.jwData=n;r.shadowElem.removeClass("flashblocker-assumed");e.prop(r._elem,"volume",r.volume);e.prop(r._elem,"muted",r.muted);s()}};var C=e.noop;if(a){var k={play:1,playing:1},L="play,pause,playing,canplay,progress,waiting,ended,loadedmetadata,durationchange,emptied".split(","),A=L.map(function(e){return e+".webshimspolyfill"}).join(" "),O=function(n){var r=t.data(n.target,"mediaelement");r&&(n.originalEvent&&n.originalEvent.type===n.type)==("third"==r.activating)&&(n.stopImmediatePropagation(),k[n.type]&&r.isActive!=r.activating&&e(n.target).pause())},C=function(n){e(n).off(A).on(A,O);L.forEach(function(e){t.moveToFirstEvent(n,e)})};C(r)}o.setActive=function(n,r,i){i||(i=t.data(n,"mediaelement"));if(i&&i.isActive!=r){"html5"!=r&&"third"!=r&&t.warn("wrong type for mediaelement activating: "+r);var s=t.data(n,"shadowData");i.activating=r;e(n).pause();i.isActive=r;"third"==r?(s.shadowElement=s.shadowFocusElement=i.shadowElem[0],e(n).addClass("swf-api-active nonnative-api-active").hide().getShadowElement().show()):(e(n).removeClass("swf-api-active nonnative-api-active").show().getShadowElement().hide(),s.shadowElement=s.shadowFocusElement=!1);e(n).trigger("mediaelementapichange")}};var M=function(){var e="_bufferedEnd,_bufferedStart,_metadata,_ppFlag,currentSrc,currentTime,duration,ended,networkState,paused,videoHeight,videoWidth,_callMeta,_durationCalcs".split(","),t=e.length;return function(n){if(n){var r=t,i=n.networkState;for(E(0,n);--r;)delete n[e[r]];n.actionQueue=[];n.buffered.length=0;i&&g(n._elem,"emptied")}}}(),_=function(t,n){var r=t._elem,i=t.shadowElem;e(r)[n?"addClass":"removeClass"]("webshims-controls");"audio"==t._elemNodeName&&!n?i.css({width:0,height:0}):i.css({width:r.style.width||e(r).width(),height:r.style.height||e(r).height()})};o.createSWF=function(n,r,i){if(f){1>l?l=1:l++;var c=e.extend({},s.vars,{image:e.prop(n,"poster")||"",file:r.srcProp}),h=e(n).data("vars")||{};i||(i=t.data(n,"mediaelement"));if(i&&i.swfCreated)o.setActive(n,"third",i),M(i),i.currentSrc=r.srcProp,e.extend(c,h),s.changeSWF(c,n,r,i,"load"),D(n,"sendEvent",["LOAD",c]);else{var d=e.prop(n,"controls"),v="jwplayer-"+t.getID(n),m=e.extend({},s.params,e(n).data("params")),g=n.nodeName.toLowerCase(),w=e.extend({},s.attrs,{name:v,id:v},e(n).data("attrs")),E=e('<div class="polyfill-'+g+' polyfill-mediaelement" id="wrapper-'+v+'"><div id="'+v+'"></div>').css({position:"relative",overflow:"hidden"}),i=t.data(n,"mediaelement",t.objectCreate(p,{actionQueue:{value:[]},shadowElem:{value:E},_elemNodeName:{value:g},_elem:{value:n},currentSrc:{value:r.srcProp},swfCreated:{value:!0},buffered:{value:{start:function(e){if(!(e>=i.buffered.length))return 0;t.error("buffered index size error")},end:function(e){if(!(e>=i.buffered.length))return(i.duration-i._bufferedStart)*i._bufferedEnd/100+i._bufferedStart;t.error("buffered index size error")},length:0}}}));_(i,d);E.insertBefore(n);a&&e.extend(i,{volume:e.prop(n,"volume"),muted:e.prop(n,"muted")});e.extend(c,{id:v,controlbar:d?s.vars.controlbar||("video"==g?"over":"bottom"):"video"==g?"none":"bottom",icons:""+(d&&"video"==g)},h,{playerready:"jQuery.webshims.mediaelement.jwPlayerReady"});c.plugins=c.plugins?c.plugins+(","+b):b;t.addShadowDom(n,E);C(n);o.setActive(n,"third",i);s.changeSWF(c,n,r,i,"embed");e(n).on("updatemediaelementdimensions updateshadowdom",function(){_(i,e.prop(n,"controls"))});u.embedSWF(y,v,"100%","100%","9.0.0",!1,c,m,w,function(r){r.success&&(i.jwapi=r.ref,d||e(r.ref).attr("tabindex","-1").css("outline","none"),setTimeout(function(){if(!r.ref.parentNode&&E[0].parentNode||"none"==r.ref.style.display)E.addClass("flashblocker-assumed"),e(n).trigger("flashblocker"),t.warn("flashblocker assumed");e(r.ref).css({minHeight:"2px",minWidth:"2px",display:"block"})},9),N||(clearTimeout(N),N=setTimeout(function(){var n=e(r.ref);1<n[0].offsetWidth&&1<n[0].offsetHeight&&0===location.protocol.indexOf("file:")?t.error("Add your local development-directory to the local-trusted security sandbox:  http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html"):(2>n[0].offsetWidth||2>n[0].offsetHeight)&&t.warn("JS-SWF connection can't be established on hidden or unconnected flash objects")},8e3)))})}}else setTimeout(function(){e(n).mediaLoad()},1)};var D=function(e,t,n,r){return(r=r||m(e))?(r.jwapi&&r.jwapi[t]?r.jwapi[t].apply(r.jwapi,n||[]):(r.actionQueue.push({fn:t,args:n}),10<r.actionQueue.length&&setTimeout(function(){5<r.actionQueue.length&&r.actionQueue.shift()},99)),r):!1};["audio","video"].forEach(function(n){var r={},i,s=function(e){"audio"==n&&("videoHeight"==e||"videoWidth"==e)||(r[e]={get:function(){var t=m(this);return t?t[e]:a&&i[e].prop._supget?i[e].prop._supget.apply(this):p[e]},writeable:!1})},o=function(e,t){s(e);delete r[e].writeable;r[e].set=t};o("volume",function(e){var n=m(this);if(n){if(e*=100,!isNaN(e)){var r=n.muted;(0>e||100<e)&&t.error("volume greater or less than allowed "+e/100);D(this,"sendEvent",["VOLUME",e],n);if(r)try{n.jwapi.sendEvent("mute","true")}catch(s){}e/=100;n.volume!=e&&"third"==n.isActive&&(n.volume=e,g(n._elem,"volumechange"))}}else if(i.volume.prop._supset)return i.volume.prop._supset.apply(this,arguments)});o("muted",function(e){var t=m(this);if(t){if(e=!!e,D(this,"sendEvent",["mute",""+e],t),t.muted!=e&&"third"==t.isActive)t.muted=e,g(t._elem,"volumechange")}else if(i.muted.prop._supset)return i.muted.prop._supset.apply(this,arguments)});o("currentTime",function(e){var t=m(this);if(t){if(e*=1,!isNaN(e)){t.paused&&(clearTimeout(t.stopPlayPause),t.stopPlayPause=setTimeout(function(){t.paused=!0;t.stopPlayPause=!1},50));D(this,"sendEvent",["SEEK",""+e],t);if(t.paused){0<t.readyState&&(t.currentTime=e,g(t._elem,"timeupdate"));try{t.jwapi.sendEvent("play","false")}catch(n){}}}}else if(i.currentTime.prop._supset)return i.currentTime.prop._supset.apply(this,arguments)});["play","pause"].forEach(function(e){r[e]={value:function(){var t=m(this);if(t)t.stopPlayPause&&clearTimeout(t.stopPlayPause),D(this,"sendEvent",["play","play"==e],t),setTimeout(function(){"third"==t.isActive&&(t._ppFlag=!0,t.paused!=("play"!=e))&&(t.paused="play"!=e,g(t._elem,e))},1);else if(i[e].prop._supvalue)return i[e].prop._supvalue.apply(this,arguments)}}});c.forEach(s);t.onNodeNamesPropertyModify(n,"controls",function(r,i){var s=m(this);e(this)[i?"addClass":"removeClass"]("webshims-controls");if(s){try{D(this,i?"showControls":"hideControls",[n],s)}catch(o){t.warn("you need to generate a crossdomain.xml")}"audio"==n&&_(s,i);e(s.jwapi).attr("tabindex",i?"0":"-1")}});i=t.defineNodeNameProperties(n,r,"prop")});if(f){var P=e.cleanData,H=e.browser.msie&&9>t.browserVersion,B={object:1,OBJECT:1};e.cleanData=function(e){var t,n,r;if(e&&(n=e.length)&&l)for(t=0;t<n;t++)if(B[e[t].nodeName]){if("sendEvent"in e[t]){l--;try{e[t].sendEvent("play",!1)}catch(i){}}if(H)try{for(r in e[t])"function"==typeof e[t][r]&&(e[t][r]=null)}catch(s){}}return P.apply(this,arguments)}}a||(["poster","src"].forEach(function(e){t.defineNodeNamesProperty("src"==e?["audio","video","source"]:["video"],e,{reflect:!0,propType:"src"})}),["autoplay","controls"].forEach(function(e){t.defineNodeNamesBooleanProperty(["audio","video"],e)}),t.defineNodeNamesProperties(["audio","video"],{HAVE_CURRENT_DATA:{value:2},HAVE_ENOUGH_DATA:{value:4},HAVE_FUTURE_DATA:{value:3},HAVE_METADATA:{value:1},HAVE_NOTHING:{value:0},NETWORK_EMPTY:{value:0},NETWORK_IDLE:{value:1},NETWORK_LOADING:{value:2},NETWORK_NO_SOURCE:{value:3}},"prop"))});