//DOM-Extension helper
jQuery.webshims.register("dom-extend",function(e,t,n,r,i){"use strict";var s=t.modules,o=/\s*,\s*/,u={},a={},f={},l={},c={},h=e.fn.val,p=function(t,n,r,i,s){return s?h.call(e(t)):h.call(e(t),r)};e.fn.val=function(t){var n=this[0];arguments.length&&t==null&&(t="");if(!arguments.length)return!n||n.nodeType!==1?h.call(this):e.prop(n,"value",t,"val",!0);if(e.isArray(t))return h.apply(this,arguments);var r=e.isFunction(t);return this.each(function(s){n=this;if(n.nodeType===1)if(r){var o=t.call(n,s,e.prop(n,"value",i,"val",!0));o==null&&(o="");e.prop(n,"value",o,"val")}else e.prop(n,"value",t,"val")})};var d="_webshimsLib"+Math.round(Math.random()*1e3),v=function(t,n,r){t=t.jquery?t[0]:t;if(!t)return r||{};var s=e.data(t,d);if(r!==i){s||(s=e.data(t,d,{}));n&&(s[n]=r)}return n?s&&s[n]:s};[{name:"getNativeElement",prop:"nativeElement"},{name:"getShadowElement",prop:"shadowElement"},{name:"getShadowFocusElement",prop:"shadowFocusElement"}].forEach(function(t){e.fn[t.name]=function(){return this.map(function(){var e=v(this,"shadowData");return e&&e[t.prop]||this})}});["removeAttr","prop","attr"].forEach(function(n){u[n]=e[n];e[n]=function(t,r,s,o,l){var h=o=="val",d=h?p:u[n];if(!t||!a[r]||t.nodeType!==1||!h&&o&&n=="attr"&&e.attrFn[r])return d(t,r,s,o,l);var v=(t.nodeName||"").toLowerCase(),m=f[v],g=n!="attr"||s!==!1&&s!==null?n:"removeAttr",y,b,w;m||(m=f["*"]);m&&(m=m[r]);m&&(y=m[g]);if(y){if(r=="value"){b=y.isVal;y.isVal=h}if(g==="removeAttr")return y.value.call(t);if(s===i)return y.get?y.get.call(t):y.value;if(y.set){n=="attr"&&s===!0&&(s=r);w=y.set.call(t,s)}r=="value"&&(y.isVal=b)}else w=d(t,r,s,o,l);if((s!==i||g==="removeAttr")&&c[v]&&c[v][r]){var E;g=="removeAttr"?E=!1:g=="prop"?E=!!s:E=!0;c[v][r].forEach(function(e){(!e.only||(e.only=n=="prop")||e.only=="attr"&&n!="prop")&&e.call(t,s,E,h?"val":g,n)})}return w};l[n]=function(r,s,o){f[r]||(f[r]={});f[r][s]||(f[r][s]={});var a=f[r][s][n],l=function(e,t,r){return t&&t[e]?t[e]:r&&r[e]?r[e]:n=="prop"&&s=="value"?function(e){var t=this;return o.isVal?p(t,s,e,!1,arguments.length===0):u[n](t,s,e)}:n=="prop"&&e=="value"&&o.value.apply?function(e){var t=u[n](this,s);t&&t.apply&&(t=t.apply(this,arguments));return t}:function(e){return u[n](this,s,e)}};f[r][s][n]=o;if(o.value===i){o.set||(o.set=o.writeable?l("set",o,a):t.cfg.useStrict&&s=="prop"?function(){throw s+" is readonly on "+r}:e.noop);o.get||(o.get=l("get",o,a))}["value","get","set"].forEach(function(e){o[e]&&(o["_sup"+e]=l(e,a))})}});var m=!e.browser.msie||parseInt(e.browser.version,10)>8,g=function(){var e=t.getPrototypeOf(r.createElement("foobar")),n=Object.prototype.hasOwnProperty;return function(i,s,o){var u=r.createElement(i),a=t.getPrototypeOf(u);if(m&&a&&e!==a&&(!u[s]||!n.call(u,s))){var f=u[s];o._supvalue=function(){return f&&f.apply?f.apply(this,arguments):f};a[s]=o.value}else{o._supvalue=function(){var e=v(this,"propValue");return e&&e[s]&&e[s].apply?e[s].apply(this,arguments):e&&e[s]};y.extendValue(i,s,o.value)}o.value._supvalue=o._supvalue}}(),y=function(){var n={};t.addReady(function(r,i){var s={},o=function(t){if(!s[t]){s[t]=e(r.getElementsByTagName(t));i[0]&&e.nodeName(i[0],t)&&(s[t]=s[t].add(i))}};e.each(n,function(e,n){o(e);if(!n||!n.forEach){t.warn("Error: with "+e+"-property. methods: "+n);return}n.forEach(function(t){s[e].each(t)})});s=null});var i,s=e([]),o=function(t,s){n[t]?n[t].push(s):n[t]=[s];e.isDOMReady&&(i||e(r.getElementsByTagName(t))).each(s)},u={};return{createTmpCache:function(t){e.isDOMReady&&(i=i||e(r.getElementsByTagName(t)));return i||s},flushTmpCache:function(){i=null},content:function(t,n){o(t,function(){var t=e.attr(this,n);t!=null&&e.attr(this,n,t)})},createElement:function(e,t){o(e,t)},extendValue:function(t,n,r){o(t,function(){e(this).each(function(){var e=v(this,"propValue",{});e[n]=this[n];this[n]=r})})}}}(),b=function(e,t){e.defaultValue===i&&(e.defaultValue="");e.removeAttr||(e.removeAttr={value:function(){e[t||"prop"].set.call(this,e.defaultValue);e.removeAttr._supvalue.call(this)}});e.attr||(e.attr={})};e.extend(t,{getID:function(){var t=(new Date).getTime();return function(n){n=e(n);var r=n.attr("id");if(!r){t++;r="ID-"+t;n.attr("id",r)}return r}}(),extendUNDEFProp:function(t,n){e.each(n,function(e,n){e in t||(t[e]=n)})},createPropDefault:b,data:v,moveToFirstEvent:function(){var t=e._data?"_data":"data";return function(n,r,i){var s=(e[t](n,"events")||{})[r],o;if(s&&s.length>1){o=s.pop();i||(i="bind");i=="bind"&&s.delegateCount?s.splice(s.delegateCount,0,o):s.unshift(o)}n=null}}(),addShadowDom:function(){var i,s,o,u={init:!1,runs:0,test:function(){var e=u.getHeight(),t=u.getWidth();if(e!=u.height||t!=u.width){u.height=e;u.width=t;u.handler({type:"docresize"});u.runs++;u.runs<30&&setTimeout(u.test,30)}else u.runs=0},handler:function(t){clearTimeout(i);i=setTimeout(function(){if(t.type=="resize"){var r=e(n).width(),i=e(n).width();if(i==s&&r==o)return;s=i;o=r;u.height=u.getHeight();u.width=u.getWidth()}e.event.trigger("updateshadowdom")},t.type=="resize"?50:9)},_create:function(){e.each({Height:"getHeight",Width:"getWidth"},function(e,t){var n=r.body,i=r.documentElement;u[t]=function(){return Math.max(n["scroll"+e],i["scroll"+e],n["offset"+e],i["offset"+e],i["client"+e])}})},start:function(){if(!this.init&&r.body){this.init=!0;this._create();this.height=u.getHeight();this.width=u.getWidth();setInterval(this.test,400);e(this.test);e(n).bind("load",this.test);e(n).bind("resize",this.handler);(function(){var t=e.fn.animate,n;e.fn.animate=function(){clearTimeout(n);n=setTimeout(function(){u.test();u.handler({type:"animationstart"})},19);return t.apply(this,arguments)}})()}}};e.event.customEvent.updateshadowdom=!0;t.docObserve=function(){t.ready("DOM",function(){u.start()})};return function(n,r,i){i=i||{};n.jquery&&(n=n[0]);r.jquery&&(r=r[0]);var s=e.data(n,d)||e.data(n,d,{}),o=e.data(r,d)||e.data(r,d,{}),u={};if(!i.shadowFocusElement)i.shadowFocusElement=r;else if(i.shadowFocusElement){i.shadowFocusElement.jquery&&(i.shadowFocusElement=i.shadowFocusElement[0]);u=e.data(i.shadowFocusElement,d)||e.data(i.shadowFocusElement,d,u)}s.hasShadow=r;u.nativeElement=o.nativeElement=n;u.shadowData=o.shadowData=s.shadowData={nativeElement:n,shadowElement:r,shadowFocusElement:i.shadowFocusElement};i.shadowChilds&&i.shadowChilds.each(function(){v(this,"shadowData",o.shadowData)});i.data&&(u.shadowData.data=o.shadowData.data=s.shadowData.data=i.data);i=null;t.docObserve()}}(),propTypes:{standard:function(e,t){b(e);if(e.prop)return;e.prop={set:function(t){e.attr.set.call(this,""+t)},get:function(){return e.attr.get.call(this)||e.defaultValue}}},"boolean":function(e,t){b(e);if(e.prop)return;e.prop={set:function(t){t?e.attr.set.call(this,""):e.removeAttr.value.call(this)},get:function(){return e.attr.get.call(this)!=null}}},src:function(){var t=r.createElement("a");t.style.display="none";return function(n,r){b(n);if(n.prop)return;n.prop={set:function(e){n.attr.set.call(this,e)},get:function(){var n=this.getAttribute(r),i;if(n==null)return"";t.setAttribute("href",n+"");if(!e.support.hrefNormalized){try{e(t).insertAfter(this);i=t.getAttribute("href",4)}catch(s){i=t.getAttribute("href",4)}e(t).detach()}return i||t.href}}}}(),enumarated:function(e,t){b(e);if(e.prop)return;e.prop={set:function(t){e.attr.set.call(this,t)},get:function(){var t=(e.attr.get.call(this)||"").toLowerCase();if(!t||e.limitedTo.indexOf(t)==-1)t=e.defaultValue;return t}}}},reflectProperties:function(n,r){typeof r=="string"&&(r=r.split(o));r.forEach(function(r){t.defineNodeNamesProperty(n,r,{prop:{set:function(t){e.attr(this,r,t)},get:function(){return e.attr(this,r)||""}}})})},defineNodeNameProperty:function(n,r,i){a[r]=!0;i.reflect&&t.propTypes[i.propType||"standard"](i,r);["prop","attr","removeAttr"].forEach(function(s){var o=i[s];if(o){s==="prop"?o=e.extend({writeable:!0},o):o=e.extend({},o,{writeable:!0});l[s](n,r,o);n!="*"&&t.cfg.extendNative&&s=="prop"&&o.value&&e.isFunction(o.value)&&g(n,r,o);i[s]=o}});i.initAttr&&y.content(n,r);return i},defineNodeNameProperties:function(e,n,r,i){var s;for(var o in n){!i&&n[o].initAttr&&y.createTmpCache(e);if(r&&!n[o][r]){n[o][r]={};["value","set","get"].forEach(function(e){if(e in n[o]){n[o][r][e]=n[o][e];delete n[o][e]}})}n[o]=t.defineNodeNameProperty(e,o,n[o])}i||y.flushTmpCache();return n},createElement:function(n,r,i){var s;e.isFunction(r)&&(r={after:r});y.createTmpCache(n);r.before&&y.createElement(n,r.before);i&&(s=t.defineNodeNameProperties(n,i,!1,!0));r.after&&y.createElement(n,r.after);y.flushTmpCache();return s},onNodeNamesPropertyModify:function(t,n,r,i){typeof t=="string"&&(t=t.split(o));e.isFunction(r)&&(r={set:r});t.forEach(function(e){c[e]||(c[e]={});typeof n=="string"&&(n=n.split(o));r.initAttr&&y.createTmpCache(e);n.forEach(function(t){if(!c[e][t]){c[e][t]=[];a[t]=!0}if(r.set){i&&(r.set.only=i);c[e][t].push(r.set)}r.initAttr&&y.content(e,t)});y.flushTmpCache()})},defineNodeNamesBooleanProperty:function(n,r,s){s||(s={});e.isFunction(s)&&(s.set=s);t.defineNodeNamesProperty(n,r,{attr:{set:function(e){this.setAttribute(r,e);s.set&&s.set.call(this,!0)},get:function(){var e=this.getAttribute(r);return e==null?i:r}},removeAttr:{value:function(){this.removeAttribute(r);s.set&&s.set.call(this,!1)}},reflect:!0,propType:"boolean",initAttr:s.initAttr||!1})},contentAttr:function(e,t,n){if(!e.nodeName)return;var r;if(n===i){r=e.attributes[t]||{};n=r.specified?r.value:null;return n==null?i:n}typeof n=="boolean"?n?e.setAttribute(t,t):e.removeAttribute(t):e.setAttribute(t,n)},activeLang:function(){var n=[],r={},i,o,u=/:\/\/|^\.*\//,a=function(n,r,i){var s;if(r&&i&&e.inArray(r,i.availabeLangs||[])!==-1){n.loading=!0;s=i.langSrc;u.test(s)||(s=t.cfg.basePath+s);t.loader.loadScript(s+r+".js",function(){if(n.langObj[r]){n.loading=!1;l(n,!0)}else e(function(){n.langObj[r]&&l(n,!0);n.loading=!1})});return!0}return!1},f=function(e){r[e]&&r[e].forEach(function(e){e.callback()})},l=function(e,t){if(e.activeLang!=i&&e.activeLang!==o){var n=s[e.module].options;if(e.langObj[i]||o&&e.langObj[o]){e.activeLang=i;e.callback(e.langObj[i]||e.langObj[o],i);f(e.module)}else if(!t&&!a(e,i,n)&&!a(e,o,n)&&e.langObj[""]&&e.activeLang!==""){e.activeLang="";e.callback(e.langObj[""],i);f(e.module)}}},c=function(t){if(typeof t=="string"&&t!==i){i=t;o=i.split("-")[0];i==o&&(o=!1);e.each(n,function(e,t){l(t)})}else if(typeof t=="object")if(t.register){r[t.register]||(r[t.register]=[]);r[t.register].push(t);t.callback()}else{t.activeLang||(t.activeLang="");n.push(t);l(t)}return i};return c}()});e.each({defineNodeNamesProperty:"defineNodeNameProperty",defineNodeNamesProperties:"defineNodeNameProperties",createElements:"createElement"},function(e,n){t[e]=function(e,r,i,s){typeof e=="string"&&(e=e.split(o));var u={};e.forEach(function(e){u[e]=t[n](e,r,i,s)});return u}});t.isReady("webshimLocalization",!0)});(function(e,t){var n=e.webshims.browserVersion;if(e.browser.mozilla&&n>5)return;if(!e.browser.msie||n<12&&n>7){var r={article:"article",aside:"complementary",section:"region",nav:"navigation",address:"contentinfo"},i=function(e,t){var n=e.getAttribute("role");n||e.setAttribute("role",t)};e.webshims.addReady(function(n,s){e.each(r,function(t,r){var o=e(t,n).add(s.filter(t));for(var u=0,a=o.length;u<a;u++)i(o[u],r)});if(n===t){var o=t.getElementsByTagName("header")[0],u=t.getElementsByTagName("footer"),a=u.length;o&&!e(o).closest("section, article")[0]&&i(o,"banner");if(!a)return;var f=u[a-1];e(f).closest("section, article")[0]||i(f,"contentinfo")}})}})(jQuery,document);(function(e,t,n){"use strict";var r=t.audio&&t.video,i=!1,s=n.cfg.mediaelement,o=n.bugs,u=s.player=="jwplayer"?"mediaelement-swf":"mediaelement-jaris",a=function(){n.ready(u,function(){if(!n.mediaelement.createSWF){n.mediaelement.loadSwf=!0;n.reTest([u],r)}})},f;if(r){var l=document.createElement("video");t.videoBuffered="buffered"in l;i="loop"in l;n.capturingEvents(["play","playing","waiting","paused","ended","durationchange","loadedmetadata","canplay","volumechange"]);if(!t.videoBuffered){n.addPolyfill("mediaelement-native-fix",{f:"mediaelement",test:t.videoBuffered,d:["dom-support"]});n.reTest("mediaelement-native-fix")}}if(r&&!s.preferFlash){var c=function(t){var r=t.target.parentNode;!s.preferFlash&&(e(t.target).is("audio, video")||r&&e("source:last",r)[0]==t.target)&&n.ready("DOM mediaelement",function(){f&&a();n.ready("WINDOWLOAD "+u,function(){setTimeout(function(){if(f&&!s.preferFlash&&n.mediaelement.createSWF&&!e(t.target).closest("audio, video").is(".nonnative-api-active")){s.preferFlash=!0;document.removeEventListener("error",c,!0);e("audio, video").mediaLoad();n.info("switching mediaelements option to 'preferFlash', due to an error with native player: "+t.target.src)}else f||document.removeEventListener("error",c,!0)},20)})})};document.addEventListener("error",c,!0);e("audio, video").each(function(){this.error&&c({target:this})})}o.track=!1;t.track&&function(){o.track||(o.track=typeof e("<track />")[0].readyState!="number");if(!o.track)try{new TextTrackCue(2,3,"")}catch(t){o.track=!0}var r=n.cfg.track,i=function(t){e(t.target).filter("track").each(s)},s=function(){if(o.track||!r.override&&e.prop(this,"readyState")==3){r.override=!0;n.reTest("track");document.removeEventListener("error",i,!0);this&&e.nodeName(this,"track")?n.error("track support was overwritten. Please check your vtt including your vtt mime-type"):n.info("track support was overwritten. due to bad browser support")}},u=function(){document.addEventListener("error",i,!0);o.track?s():e("track").each(s)};r.override||(n.isReady("track")?u():e(u))}();n.register("mediaelement-core",function(e,n,l,c,h){f=swfobject.hasFlashPlayerVersion("9.0.115");var p=n.mediaelement,d=function(t,n){t=e(t);var r={src:t.attr("src")||"",elem:t,srcProp:t.prop("src")};if(!r.src)return r;var i=t.attr("type");if(i){r.type=i;r.container=e.trim(i.split(";")[0])}else{if(!n){n=t[0].nodeName.toLowerCase();n=="source"&&(n=(t.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())}i=p.getTypeForSrc(r.src,n);if(i){r.type=i;r.container=i}}i=t.attr("media");i&&(r.media=i);return r},v=!f&&"postMessage"in l&&r,m=function(){var t;return function(){if(t||!v)return;t=!0;n.loader.loadScript("https://www.youtube.com/player_api");e(function(){n.polyfill("mediaelement-yt")})}}(),g=function(){f?a():m()};n.addPolyfill("mediaelement-yt",{test:!v,d:["dom-support"]});p.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],'audio/ogg;codecs="opus"':"opus","audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":["mp4","mpg4","m4r","m4a","m4p","m4b","aac"],"audio/wav":["wav"],"audio/3gpp":["3gp","3gpp"],"audio/webm":["webm"],"audio/fla":["flv","f4a","fla"],"application/x-mpegURL":["m3u8","m3u"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg","mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"],"application/x-mpegURL":["m3u8","m3u"],"video/MP2T":["ts"]}};p.mimeTypes.source=e.extend({},p.mimeTypes.audio,p.mimeTypes.video);p.getTypeForSrc=function(t,n){if(t.indexOf("youtube.com/watch?")!=-1||t.indexOf("youtube.com/v/")!=-1)return"video/youtube";t=t.split("?")[0].split(".");t=t[t.length-1];var r;e.each(p.mimeTypes[n],function(e,n){if(n.indexOf(t)!==-1){r=e;return!1}});return r};p.srces=function(t,n){t=e(t);if(!n){n=[];var r=t[0].nodeName.toLowerCase(),i=d(t,r);i.src?n.push(i):e("source",t).each(function(){i=d(this,r);i.src&&n.push(i)});return n}t.removeAttr("src").removeAttr("type").find("source").remove();e.isArray(n)||(n=[n]);n.forEach(function(e){var n=c.createElement("source");typeof e=="string"&&(e={src:e});n.setAttribute("src",e.src);e.type&&n.setAttribute("type",e.type);e.media&&n.setAttribute("media",e.media);t.append(n)})};e.fn.loadMediaSrc=function(t,n){return this.each(function(){if(n!==h){e(this).removeAttr("poster");n&&e.attr(this,"poster",n)}p.srces(this,t);e(this).mediaLoad()})};p.swfMimeTypes=["video/3gpp","video/x-msvideo","video/quicktime","video/x-m4v","video/mp4","video/m4p","video/x-flv","video/flv","audio/mpeg","audio/aac","audio/mp4","audio/x-m4a","audio/m4a","audio/mp3","audio/x-fla","audio/fla","youtube/flv","jwplayer/jwplayer","video/youtube"];p.canThirdPlaySrces=function(t,n){var r="";if(f||v){t=e(t);n=n||p.srces(t);e.each(n,function(e,t){if(t.container&&t.src&&(f&&p.swfMimeTypes.indexOf(t.container)!=-1||v&&t.container=="video/youtube")){r=t;return!1}})}return r};var y={};p.canNativePlaySrces=function(t,n){var i="";if(r){t=e(t);var s=(t[0].nodeName||"").toLowerCase();if(!y[s])return i;n=n||p.srces(t);e.each(n,function(e,n){if(n.type&&y[s].prop._supvalue.call(t[0],n.type)){i=n;return!1}})}return i};p.setError=function(t,r){r||(r="can't play sources");e(t).pause().data("mediaerror",r);n.warn("mediaelementError: "+r);setTimeout(function(){e(t).data("mediaerror")&&e(t).trigger("mediaerror")},1)};var b=function(){var e;return function(t,r,i){n.ready(f?u:"mediaelement-yt",function(){if(p.createSWF)p.createSWF(t,r,i);else if(!e){e=!0;g();b(t,r,i)}});!e&&v&&!p.createSWF&&m()}}(),w=function(e,t,n,r,i){var s;if(n||n!==!1&&t&&t.isActive=="third"){s=p.canThirdPlaySrces(e,r);s?b(e,s,t):i?p.setError(e,!1):w(e,t,!1,r,!0)}else{s=p.canNativePlaySrces(e,r);if(!s)if(i){p.setError(e,!1);t&&t.isActive=="third"&&p.setActive(e,"html5",t)}else w(e,t,!0,r,!0);else t&&t.isActive=="third"&&p.setActive(e,"html5",t)}},E=/^(?:embed|object|datalist)$/i,S=function(t,r){var i=n.data(t,"mediaelementBase")||n.data(t,"mediaelementBase",{}),o=p.srces(t),u=t.parentNode;clearTimeout(i.loadTimer);e.data(t,"mediaerror",!1);if(!o.length||!u||u.nodeType!=1||E.test(u.nodeName||""))return;r=r||n.data(t,"mediaelement");w(t,r,s.preferFlash||h,o)};e(c).on("ended",function(t){var r=n.data(t.target,"mediaelement");if(i&&(!r||r.isActive=="html5")&&!e.prop(t.target,"loop"))return;setTimeout(function(){if(e.prop(t.target,"paused")||!e.prop(t.target,"loop"))return;e(t.target).prop("currentTime",0).play()},1)});i||n.defineNodeNamesBooleanProperty(["audio","video"],"loop");["audio","video"].forEach(function(t){var i=n.defineNodeNameProperty(t,"load",{prop:{value:function(){var e=n.data(this,"mediaelement");S(this,e);r&&(!e||e.isActive=="html5")&&i.prop._supvalue&&i.prop._supvalue.apply(this,arguments)}}});y[t]=n.defineNodeNameProperty(t,"canPlayType",{prop:{value:function(n){var i="";if(r&&y[t].prop._supvalue){i=y[t].prop._supvalue.call(this,n);i=="no"&&(i="")}if(!i&&f){n=e.trim((n||"").split(";")[0]);p.swfMimeTypes.indexOf(n)!=-1&&(i="maybe")}return i}}})});n.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var e=this,t=n.data(e,"mediaelementBase")||n.data(e,"mediaelementBase",{});clearTimeout(t.loadTimer);t.loadTimer=setTimeout(function(){S(e);e=null},9)}});var x=function(){n.addReady(function(t,i){e("video, audio",t).add(i.filter("video, audio")).each(function(){e.browser.msie&&n.browserVersion>8&&e.prop(this,"paused")&&!e.prop(this,"readyState")&&e(this).is('audio[preload="none"][controls]:not([autoplay])')?e(this).prop("preload","metadata").mediaLoad():S(this);if(r){var t,i,s=this,o=function(){var t=e.prop(s,"buffered");if(!t)return;var n="";for(var r=0,i=t.length;r<i;r++)n+=t.end(r);return n},u=function(){var t=o();if(t!=i){i=t;e(s).triggerHandler("progress")}};e(this).on({"play loadstart progress":function(e){e.type=="progress"&&(i=o());clearTimeout(t);t=setTimeout(u,999)},"emptied stalled mediaerror abort suspend":function(e){e.type=="emptied"&&(i=!1);clearTimeout(t)}})}})})};t.track&&!o.track&&n.defineProperty(TextTrack.prototype,"shimActiveCues",{get:function(){return this._shimActiveCues||this.activeCues}});if(r){n.isReady("mediaelement-core",!0);x();n.ready("WINDOWLOAD mediaelement",g)}else n.ready(u,x);e(function(){n.loader.loadList(["track-ui"])})})})(jQuery,Modernizr,jQuery.webshims);jQuery.webshims.register("track",function(e,t,n,r,i){"use strict";var s=t.mediaelement,o=(new Date).getTime(),u={subtitles:1,captions:1,descriptions:1},a=function(){t.error("not implemented yet")},f=e("<track />"),l=Modernizr.ES5&&Modernizr.objectAccessor,c=function(e){var n={};e.addEventListener=function(e,r){n[e]&&t.error("always use $.on to the shimed event: "+e+" already bound fn was: "+n[e]+" your fn was: "+r);n[e]=r};e.removeEventListener=function(e,r){n[e]&&n[e]!=r&&t.error("always use $.on/$.off to the shimed event: "+e+" already bound fn was: "+n[e]+" your fn was: "+r);n[e]&&delete n[e]};return e},h={getCueById:function(e){var t=null;for(var n=0,r=this.length;n<r;n++)if(this[n].id===e){t=this[n];break}return t}},p={0:"disabled",1:"hidden",2:"showing"},d={shimActiveCues:null,_shimActiveCues:null,activeCues:null,cues:null,kind:"subtitles",label:"",language:"",mode:"disabled",readyState:0,oncuechange:null,toString:function(){return"[object TextTrack]"},addCue:function(e){if(!this.cues)this.cues=s.createCueList();else{var n=this.cues[this.cues.length-1];n&&n.startTime>e.startTime&&t.error("cue startTime higher than previous cue's startTime")}e.track&&e.track.removeCue&&e.track.removeCue(e);e.track=this;this.cues.push(e)},removeCue:function(e){var n=this.cues||[],r=0,i=n.length;if(e.track!=this){t.error("cue not part of track");return}for(;r<i;r++)if(n[r]===e){n.splice(r,1);e.track=null;break}if(e.track){t.error("cue not part of track");return}},DISABLED:"disabled",OFF:"disabled",HIDDEN:"hidden",SHOWING:"showing",ERROR:3,LOADED:2,LOADING:1,NONE:0},v=["kind","label","srclang"],m={srclang:"language"},g=Function.prototype.call.bind(Object.prototype.hasOwnProperty),y=function(n,r){var i=[],s=[],o=[],u,a;n||(n=t.data(this,"mediaelementBase")||t.data(this,"mediaelementBase",{}));if(!r){n.blockTrackListUpdate=!0;r=e.prop(this,"textTracks");n.blockTrackListUpdate=!1}clearTimeout(n.updateTrackListTimer);e("track",this).each(function(){var t=e.prop(this,"track");o.push(t);r.indexOf(t)==-1&&s.push(t)});if(n.scriptedTextTracks)for(u=0,a=n.scriptedTextTracks.length;u<a;u++){o.push(n.scriptedTextTracks[u]);r.indexOf(n.scriptedTextTracks[u])==-1&&s.push(n.scriptedTextTracks[u])}for(u=0,a=r.length;u<a;u++)o.indexOf(r[u])==-1&&i.push(r[u]);if(i.length||s.length){r.splice(0);for(u=0,a=o.length;u<a;u++)r.push(o[u]);for(u=0,a=i.length;u<a;u++)e([r]).triggerHandler(e.Event({type:"removetrack",track:i[u]}));for(u=0,a=s.length;u<a;u++)e([r]).triggerHandler(e.Event({type:"addtrack",track:s[u]}));(n.scriptedTextTracks||i.length)&&e(this).triggerHandler("updatetrackdisplay")}},b=function(n,r){r||(r=t.data(n,"trackData"));if(r&&!r.isTriggering){r.isTriggering=!0;setTimeout(function(){(r.track||{}).readyState?e(n).closest("audio, video").triggerHandler("updatetrackdisplay"):e(n).triggerHandler("checktrackmode");r.isTriggering=!1},1)}},w=e("<div />")[0];n.TextTrackCue=function(e,n,r){arguments.length!=3&&t.error("wrong arguments.length for TextTrackCue.constructor");this.startTime=e;this.endTime=n;this.text=r;this.id="";this.pauseOnExit=!1;c(this)};n.TextTrackCue.prototype={onenter:null,onexit:null,pauseOnExit:!1,getCueAsHTML:function(){var e="",t="",n=r.createDocumentFragment(),i;g(this,"getCueAsHTML")||(i=this.getCueAsHTML=function(){var r,i;if(e!=this.text){e=this.text;t=s.parseCueTextToHTML(e);w.innerHTML=t;for(r=0,i=w.childNodes.length;r<i;r++)n.appendChild(w.childNodes[r].cloneNode(!0))}return n.cloneNode(!0)});return i?i.apply(this,arguments):n.cloneNode(!0)},track:null,id:""};s.createCueList=function(){return e.extend([],h)};s.parseCueTextToHTML=function(){var e=/(<\/?[^>]+>)/ig,t=/^(?:c|v|ruby|rt|b|i|u)/,n=/\<\s*\//,r=function(e,t,r,i){var s;if(n.test(i))s="</"+e+">";else{r.splice(0,1);s="<"+e+" "+t+'="'+r.join(" ").replace(/\"/g,"&#34;")+'">'}return s},i=function(e){var n=e.replace(/[<\/>]+/ig,"").split(/[\s\.]+/);if(n[0]){n[0]=n[0].toLowerCase();t.test(n[0])?n[0]=="c"?e=r("span","class",n,e):n[0]=="v"&&(e=r("q","title",n,e)):e=""}return e};return function(t){return t.replace(e,i)}}();s.loadTextTrack=function(n,r,i,o){var a="play playing timeupdate updatetrackdisplay",f=i.track,l=function(){var i=e.prop(r,"src"),o,u;if(f.mode!="disabled"&&i&&e.attr(r,"src")){e(n).unbind(a,l);e(r).unbind("checktrackmode",l);if(!f.readyState){o=function(){f.readyState=3;f.cues=null;f.activeCues=f.shimActiveCues=f._shimActiveCues=null;e(r).triggerHandler("error")};f.readyState=1;try{f.cues=s.createCueList();f.activeCues=f.shimActiveCues=f._shimActiveCues=s.createCueList();u=e.ajax({dataType:"text",url:i,success:function(i){u.getResponseHeader("content-type")!="text/vtt"&&t.error("set the mime-type of your WebVTT files to text/vtt. see: http://dev.w3.org/html5/webvtt/#text/vtt");s.parseCaptions(i,f,function(t){if(t&&"length"in t){f.readyState=2;e(r).triggerHandler("load");e(n).triggerHandler("updatetrackdisplay")}else o()})},error:o})}catch(c){o();t.warn(c)}}}};f.readyState=0;f.shimActiveCues=null;f._shimActiveCues=null;f.activeCues=null;f.cues=null;e(n).unbind(a,l);e(r).unbind("checktrackmode",l);e(n).on(a,l);e(r).on("checktrackmode",l);if(o){f.mode=u[f.kind]?"showing":"hidden";l()}};s.createTextTrack=function(n,r){var i,o;if(r.nodeName){o=t.data(r,"trackData");if(o){b(r,o);i=o.track}}if(!i){i=c(t.objectCreate(d));l||v.forEach(function(t){var n=e.prop(r,t);n&&(i[m[t]||t]=n)});if(r.nodeName){l&&v.forEach(function(n){t.defineProperty(i,m[n]||n,{get:function(){return e.prop(r,n)}})});o=t.data(r,"trackData",{track:i});s.loadTextTrack(n,r,o,e.prop(r,"default")&&e(r).siblings("track[default]").andSelf()[0]==r)}else{l&&v.forEach(function(e){t.defineProperty(i,m[e]||e,{value:r[e],writeable:!1})});i.cues=s.createCueList();i.activeCues=i._shimActiveCues=i.shimActiveCues=s.createCueList();i.mode="hidden";i.readyState=2}}return i};s.parseCaptionChunk=function(){var e=/^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/,n=/^([\d\.]+)\s+\+([\d\.]+)\s*(.*)/,r=/^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g,i=/^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g,s=/^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g;return function(n,o){var u=[],a,f,l,c,h,p,d="",v,m,g,y;if(m=r.exec(n))return null;if(m=i.exec(n))return null;if(m=s.exec(n))return null;a=n.split(/\n/g);while(!a[0].replace(/\s+/ig,"").length&&a.length>0)a.shift();a[0].match(/^\s*[a-z0-9-\_]+\s*$/ig)&&(v=String(a.shift().replace(/\s*/ig,"")));for(p=0;p<a.length;p++){var b=a[p];if(g=e.exec(b)){h=g.slice(1);f=parseInt((h[0]||0)*60*60,10)+parseInt((h[1]||0)*60,10)+parseInt(h[2]||0,10)+parseFloat("0."+(h[3]||0));l=parseInt((h[4]||0)*60*60,10)+parseInt((h[5]||0)*60,10)+parseInt(h[6]||0,10)+parseFloat("0."+(h[7]||0))}a=a.slice(0,p).concat(a.slice(p+1));break}if(!f&&!l){t.warn("couldn't extract time information: "+[f,l,a.join("\n"),v].join(" ; "));return null}c=a.join("\n");y=new TextTrackCue(f,l,c);v&&(y.id=v);return y}}();s.parseCaptions=function(e,n,r){var i=s.createCueList(),o,u,a,f,l;if(e){a=/^WEBVTT(\s*FILE)?/ig;u=function(i,c){for(;i<c;i++){o=e[i];if(a.test(o))l=!0;else if(o.replace(/\s*/ig,"").length){if(!l){t.error("please use WebVTT format. This is the standard");r(null);break}o=s.parseCaptionChunk(o,i);o&&n.addCue(o)}if(f<(new Date).getTime()-30){i++;setTimeout(function(){f=(new Date).getTime();u(i,c)},90);break}}if(i>=c){l||t.error("please use WebVTT format. This is the standard");r(n.cues)}};e=e.replace(/\r\n/g,"\n");setTimeout(function(){e=e.replace(/\r/g,"\n");setTimeout(function(){f=(new Date).getTime();e=e.split(/\n\n+/g);u(0,e.length)},9)},9)}else t.error("Required parameter captionData not supplied.")};s.createTrackList=function(e,n){n=n||t.data(e,"mediaelementBase")||t.data(e,"mediaelementBase",{});if(!n.textTracks){n.textTracks=[];t.defineProperties(n.textTracks,{onaddtrack:{value:null},onremovetrack:{value:null}});c(n.textTracks)}return n.textTracks};if(!Modernizr.track){t.defineNodeNamesBooleanProperty(["track"],"default");t.reflectProperties(["track"],["srclang","label"]);t.defineNodeNameProperties("track",{src:{reflect:!0,propType:"src"}})}t.defineNodeNameProperties("track",{kind:{attr:Modernizr.track?{set:function(e){var n=t.data(this,"trackData");this.setAttribute("data-kind",e);n&&(n.attrKind=e)},get:function(){var e=t.data(this,"trackData");return e&&"attrKind"in e?e.attrKind:this.getAttribute("kind")}}:{},reflect:!0,propType:"enumarated",defaultValue:"subtitles",limitedTo:["subtitles","captions","descriptions","chapters","metadata"]}});e.each(v,function(n,r){var i=m[r]||r;t.onNodeNamesPropertyModify("track",r,function(){var n=t.data(this,"trackData"),s=this;if(n){r=="kind"&&b(this,n);l||(n.track[i]=e.prop(this,r));clearTimeout(n.changedTrackPropTimer);n.changedTrackPropTimer=setTimeout(function(){e(s).trigger("updatesubtitlestate")},1)}})});t.onNodeNamesPropertyModify("track","src",function(n){if(n){var r=t.data(this,"trackData"),i;if(r){i=e(this).closest("video, audio");i[0]&&s.loadTextTrack(i,this,r)}}});t.defineNodeNamesProperties(["track"],{ERROR:{value:3},LOADED:{value:2},LOADING:{value:1},NONE:{value:0},readyState:{get:function(){return(e.prop(this,"track")||{readyState:0}).readyState},writeable:!1},track:{get:function(){return s.createTextTrack(e(this).closest("audio, video")[0],this)},writeable:!1}},"prop");t.defineNodeNamesProperties(["audio","video"],{textTracks:{get:function(){var e=this,n=t.data(e,"mediaelementBase")||t.data(e,"mediaelementBase",{}),r=s.createTrackList(e,n);n.blockTrackListUpdate||y.call(e,n,r);return r},writeable:!1},addTextTrack:{value:function(e,n,r){var i=s.createTextTrack(this,{kind:f.prop("kind",e||"").prop("kind"),label:n||"",srclang:r||""}),o=t.data(this,"mediaelementBase")||t.data(this,"mediaelementBase",{});o.scriptedTextTracks||(o.scriptedTextTracks=[]);o.scriptedTextTracks.push(i);y.call(this);return i}}},"prop");e(r).on("emptied ended updatetracklist",function(n){if(e(n.target).is("audio, video")){var r=t.data(n.target,"mediaelementBase");if(r){clearTimeout(r.updateTrackListTimer);r.updateTrackListTimer=setTimeout(function(){y.call(n.target,r)},0)}}});var E=function(e,t){return t.readyState||e.readyState};t.addReady(function(n,r){var i=r.filter("video, audio, track").closest("audio, video");e("video, audio",n).add(i).each(function(){y.call(this)}).each(function(){if(Modernizr.track){var n=e.prop(this,"textTracks"),r=this.textTracks;n.length!=r.length&&t.error("textTracks couldn't be copied");e("track",this).each(function(){var t=e.prop(this,"track"),n=this.track,r,i;if(n){r=e.prop(this,"kind");i=E(this,n);if(n.mode||i)t.mode=p[n.mode]||n.mode;if(r!="descriptions"){n.mode=typeof n.mode=="string"?"disabled":0;this.kind="metadata";e(this).attr({kind:r})}}}).on("load error",function(e){e.originalEvent&&e.stopImmediatePropagation()})}});i.each(function(){var e=this,n=t.data(e,"mediaelementBase");if(n){clearTimeout(n.updateTrackListTimer);n.updateTrackListTimer=setTimeout(function(){y.call(e,n)},9)}})});Modernizr.track&&e("video, audio").trigger("trackapichange")});