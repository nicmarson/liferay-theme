jQuery.webshims.register("mediaelement-jaris",function(e,t,n,r,i,s){var o=t.mediaelement,u=n.swfobject,a=Modernizr.audio&&Modernizr.video,f=u.hasFlashPlayerVersion("9.0.115"),l=0,n={paused:!0,ended:!1,currentSrc:"",duration:n.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:{start:function(e){if(!e)return 0;t.error("buffered index size error")},end:function(e){if(!e)return 0;t.error("buffered index size error")},length:0}},c=Object.keys(n),h={currentTime:0,volume:1,muted:!1};Object.keys(h);var p=e.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_bufferedEnd:0,_bufferedStart:0,currentTime:0,_ppFlag:i,_calledMeta:!1,lastDuration:0},n,h),d=function(e){return(e=t.data(e,"mediaelement"))&&"third"==e.isActive?e:null},v=function(t,n){n=e.Event(n);n.preventDefault();e.event.trigger(n,i,t)},m=s.playerPath||t.cfg.basePath+"swf/"+(s.playerName||"JarisFLVPlayer.swf");t.extendUNDEFProp(s.params,{allowscriptaccess:"always",allowfullscreen:"true",wmode:"transparent",allowNetworking:"all"});t.extendUNDEFProp(s.vars,{controltype:"1",jsapi:"1"});t.extendUNDEFProp(s.attrs,{bgcolor:"#000000"});var g=function(e,t){3>e&&clearTimeout(t._canplaythroughTimer);3<=e&&3>t.readyState&&(t.readyState=e,v(t._elem,"canplay"),t.paused||v(t._elem,"playing"),clearTimeout(t._canplaythroughTimer),t._canplaythroughTimer=setTimeout(function(){g(4,t)},4e3));4<=e&&4>t.readyState&&(t.readyState=e,v(t._elem,"canplaythrough"));t.readyState=e};e.extend(e.event.customEvent,{updatemediaelementdimensions:!0,flashblocker:!0,swfstageresize:!0,mediaelementapichange:!0});o.jarisEvent={};var y,b={onPlayPause:function(e,t,n){var r;if(null==n)try{r=t.api.api_get("isPlaying")}catch(i){}else r=n;r==t.paused&&(t.paused=!r,e=t.paused?"pause":"play",t._ppFlag=!0,v(t._elem,e),3>t.readyState&&g(3,t),t.paused||v(t._elem,"playing"))},onNotBuffering:function(e,t){g(3,t)},onDataInitialized:function(e,t){var n=t.duration;t.duration=e.duration;if(!(n==t.duration||isNaN(t.duration)||t._calledMeta&&10>Math.abs(t.lastDuration-t.duration))){t.lastDuration=t.duration;t.videoHeight=e.height;t.videoWidth=e.width;t.networkState||(t.networkState=2);1>t.readyState&&g(1,t);t.duration&&v(t._elem,"durationchange");t._calledMeta||v(t._elem,"loadedmetadata");t._calledMeta=!0}},onBuffering:function(e,t){t.ended&&(t.ended=!1);g(1,t);v(t._elem,"waiting")},onTimeUpdate:function(e,t){t.ended&&(t.ended=!1);3>t.readyState&&(g(3,t),v(t._elem,"playing"));v(t._elem,"timeupdate")},onProgress:function(t,n){n.ended&&(n.ended=!1);if(n.duration&&!isNaN(n.duration)){var r=t.loaded/t.total;if(.02<r&&.2>r)g(3,n);else if(.2<r){.99<r&&(n.networkState=1);g(4,n)}n._bufferedEnd&&n._bufferedEnd>r&&(n._bufferedStart=n.currentTime||0);n._bufferedEnd=r;n.buffered.length=1;e.event.trigger("progress",i,n._elem,!0)}},onPlaybackFinished:function(e,t){4>t.readyState&&g(4,t);t.ended=!0;v(t._elem,"ended")},onVolumeChange:function(e,t){if(t.volume!=e.volume||t.muted!=e.mute)t.volume=e.volume,t.muted=e.mute,v(t._elem,"volumechange")},ready:function(){var n=function(e){var t=!0;try{e.api.api_get("volume")}catch(n){t=!1}return t};return function(r,i){var s=0,o=function(){9<s?i.tryedReframeing=0:(s++,i.tryedReframeing++,n(i)?(i.wasSwfReady=!0,i.tryedReframeing=0,w(i),E(i)):6>i.tryedReframeing?3>i.tryedReframeing?(i.reframeTimer=setTimeout(o,9),i.shadowElem.css({overflow:"visible"}),setTimeout(function(){i.shadowElem.css({overflow:"hidden"})},1)):(i.shadowElem.css({overflow:"hidden"}),e(i._elem).mediaLoad()):(clearTimeout(i.reframeTimer),t.error("reframing error")))};if(i&&i.api){i.tryedReframeing||(i.tryedReframeing=0);clearTimeout(y);clearTimeout(i.reframeTimer);i.shadowElem.removeClass("flashblocker-assumed");s?i.reframeTimer=setTimeout(o,9):o()}}}()};b.onMute=b.onVolumeChange;var w=function(e){var n=e.actionQueue.length,r=0,i;if(n&&"third"==e.isActive)for(;e.actionQueue.length&&n>r;){r++;i=e.actionQueue.shift();try{e.api[i.fn].apply(e.api,i.args)}catch(s){t.warn(s)}}e.actionQueue.length&&(e.actionQueue=[])},E=function(t){t&&(t._ppFlag===i&&e.prop(t._elem,"autoplay")||!t.paused)&&setTimeout(function(){if("third"==t.isActive&&(t._ppFlag===i||!t.paused))try{e(t._elem).play(),t._ppFlag=!0}catch(n){}},1)},S=e.noop;if(a){var x={play:1,playing:1},T="play,pause,playing,canplay,progress,waiting,ended,loadedmetadata,durationchange,emptied".split(","),N=T.map(function(e){return e+".webshimspolyfill"}).join(" "),C=function(n){var r=t.data(n.target,"mediaelement");r&&(n.originalEvent&&n.originalEvent.type===n.type)==("third"==r.activating)&&(n.stopImmediatePropagation(),x[n.type]&&r.isActive!=r.activating&&e(n.target).pause())},S=function(n){e(n).off(N).on(N,C);T.forEach(function(e){t.moveToFirstEvent(n,e)})};S(r)}o.setActive=function(n,r,i){i||(i=t.data(n,"mediaelement"));if(i&&i.isActive!=r){"html5"!=r&&"third"!=r&&t.warn("wrong type for mediaelement activating: "+r);var s=t.data(n,"shadowData");i.activating=r;e(n).pause();i.isActive=r;"third"==r?(s.shadowElement=s.shadowFocusElement=i.shadowElem[0],e(n).addClass("swf-api-active nonnative-api-active").hide().getShadowElement().show()):(e(n).removeClass("swf-api-active nonnative-api-active").show().getShadowElement().hide(),s.shadowElement=s.shadowFocusElement=!1);e(n).trigger("mediaelementapichange")}};var k=function(){var e="_calledMeta,lastDuration,_bufferedEnd,_bufferedStart,_ppFlag,currentSrc,currentTime,duration,ended,networkState,paused,videoHeight,videoWidth".split(","),t=e.length;return function(n){if(n){var r=t,i=n.networkState;for(g(0,n);-1<--r;)delete n[e[r]];n.actionQueue=[];n.buffered.length=0;i&&v(n._elem,"emptied")}}}(),L=function(t,n){var r=t._elem,i=t.shadowElem;e(r)[n?"addClass":"removeClass"]("webshims-controls");"audio"==t._elemNodeName&&!n?i.css({width:0,height:0}):i.css({width:r.style.width||e(r).width(),height:r.style.height||e(r).height()})};o.createSWF=function(n,r,i){if(f){1>l?l=1:l++;var c=e.extend({},s.vars,{poster:e.prop(n,"poster")||"",source:r.srcProp}),h=e(n).data("vars")||{};i||(i=t.data(n,"mediaelement"));var d=e.prop(n,"controls"),v="jarisplayer-"+t.getID(n),g=e.extend({},s.params,e(n).data("params")),w=n.nodeName.toLowerCase(),E=e.extend({},s.attrs,{name:v,id:v},e(n).data("attrs")),x;i&&i.swfCreated?(clearInterval(i.readyInterval),o.setActive(n,"third",i),i.currentSrc=r.srcProp,i.shadowElem.html('<div id="'+v+'">'),i.api=!1,i.actionQueue=[],x=i.shadowElem,k(i)):(x=e('<div class="polyfill-'+w+' polyfill-mediaelement" id="wrapper-'+v+'"><div id="'+v+'"></div>').css({position:"relative",overflow:"hidden"}),i=t.data(n,"mediaelement",t.objectCreate(p,{actionQueue:{value:[]},shadowElem:{value:x},_elemNodeName:{value:w},_elem:{value:n},currentSrc:{value:r.srcProp},swfCreated:{value:!0},id:{value:v.replace(/-/g,"")},buffered:{value:{start:function(e){if(!(e>=i.buffered.length))return 0;t.error("buffered index size error")},end:function(e){if(!(e>=i.buffered.length))return(i.duration-i._bufferedStart)*i._bufferedEnd+i._bufferedStart;t.error("buffered index size error")},length:0}}})),L(i,d),x.insertBefore(n),a&&e.extend(i,{volume:e.prop(n,"volume"),muted:e.prop(n,"muted")}),t.addShadowDom(n,x),S(n),o.setActive(n,"third",i),e(n).on("updatemediaelementdimensions updateshadowdom",function(){L(i,e.prop(n,"controls"))}));o.jarisEvent[i.id]||(o.jarisEvent[i.id]=function(e){if("ready"==e.type)b[e.type](e,i);else{i.currentTime=e.position;!i._calledMeta&&isNaN(e.duration)&&i.duration!=e.duration&&isNaN(i.duration)&&b.onDataInitialized(e,i);!i._ppFlag&&"onPlayPause"!=e.type&&b.onPlayPause(e,i);b[e.type]&&b[e.type](e,i);i.duration=e.duration}});e(function(){clearInterval(i.readyInterval);clearInterval(i.flashBlock);i.readyInterval=setTimeout(function(){e.extend(c,{id:v,evtId:i.id,controls:""+d,autostart:"false"},h);"audio/mpeg"==r.type||"audio/mp3"==r.type?(c.type="audio",c.streamtype="file"):"video/youtube"==r.type&&(c.streamtype="youtube");s.changeSWF(c,n,r,i,"embed");u.embedSWF(m,v,"100%","100%","9.0.0",!1,c,g,E,function(r){r.success&&(i.api=r.ref,d||e(r.ref).attr("tabindex","-1").css("outline","none"),i.flashBlock=setTimeout(function(){if(!r.ref.parentNode&&x[0].parentNode||"none"==r.ref.style.display)x.addClass("flashblocker-assumed"),e(n).trigger("flashblocker"),t.warn("flashblocker assumed");e(r.ref).css({minHeight:"2px",minWidth:"2px",display:"block"})},9),y||(clearTimeout(y),y=setTimeout(function(){var n=e(r.ref);1<n[0].offsetWidth&&1<n[0].offsetHeight&&0===location.protocol.indexOf("file:")?t.error("Add your local development-directory to the local-trusted security sandbox:  http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html"):(2>n[0].offsetWidth||2>n[0].offsetHeight)&&t.warn("JS-SWF connection can't be established on hidden or unconnected flash objects")},8e3)))})},9)})}else setTimeout(function(){e(n).mediaLoad()},1)};var A=function(e,t,n,r){return(r=r||d(e))?(r.api&&r.api[t]?r.api[t].apply(r.api,n||[]):(r.actionQueue.push({fn:t,args:n}),10<r.actionQueue.length&&setTimeout(function(){5<r.actionQueue.length&&r.actionQueue.shift()},99)),r):!1};["audio","video"].forEach(function(n){var r={},i,s=function(e){"audio"==n&&("videoHeight"==e||"videoWidth"==e)||(r[e]={get:function(){var t=d(this);return t?t[e]:a&&i[e].prop._supget?i[e].prop._supget.apply(this):p[e]},writeable:!1})},o=function(e,t){s(e);delete r[e].writeable;r[e].set=t};o("volume",function(e){var n=d(this);if(n){if(e*=1,!isNaN(e)&&((0>e||1<e)&&t.error("volume greater or less than allowed "+e/100),A(this,"api_volume",[e],n),n.volume!=e))n.volume=e,v(n._elem,"volumechange")}else if(i.volume.prop._supset)return i.volume.prop._supset.apply(this,arguments)});o("muted",function(e){var t=d(this);if(t){if(e=!!e,A(this,"api_volume",[e?0:t.volume||1],t),t.muted!=e)t.muted=e,v(t._elem,"volumechange")}else if(i.muted.prop._supset)return i.muted.prop._supset.apply(this,arguments)});o("currentTime",function(e){var t=d(this);if(t)e*=1,isNaN(e)||A(this,"api_seek",[e],t);else if(i.currentTime.prop._supset)return i.currentTime.prop._supset.apply(this,arguments)});["play","pause"].forEach(function(e){r[e]={value:function(){var t=d(this);if(t){if(t.stopPlayPause&&clearTimeout(t.stopPlayPause),A(this,"play"==e?"api_play":"api_pause",[],t),t._ppFlag=!0,t.paused!=("play"!=e))t.paused="play"!=e,v(t._elem,e)}else if(i[e].prop._supvalue)return i[e].prop._supvalue.apply(this,arguments)}}});c.forEach(s);t.onNodeNamesPropertyModify(n,"controls",function(r,i){var s=d(this);e(this)[i?"addClass":"removeClass"]("webshims-controls");s&&(t.warn("changing controls currently not fully supported with jaris player"),"audio"==n&&L(s,i),s.api&&e(this).mediaLoad())});i=t.defineNodeNameProperties(n,r,"prop")});if(f){var O=e.cleanData,M=e.browser.msie&&9>t.browserVersion,_={object:1,OBJECT:1};e.cleanData=function(e){var t,n,r;if(e&&(n=e.length)&&l)for(t=0;t<n;t++)if(_[e[t].nodeName]){if("api_pause"in e[t]){l--;try{e[t].api_pause()}catch(i){}}if(M)try{for(r in e[t])"function"==typeof e[t][r]&&(e[t][r]=null)}catch(s){}}return O.apply(this,arguments)}}a||(["poster","src"].forEach(function(e){t.defineNodeNamesProperty("src"==e?["audio","video","source"]:["video"],e,{reflect:!0,propType:"src"})}),["autoplay","controls"].forEach(function(e){t.defineNodeNamesBooleanProperty(["audio","video"],e)}),t.defineNodeNamesProperties(["audio","video"],{HAVE_CURRENT_DATA:{value:2},HAVE_ENOUGH_DATA:{value:4},HAVE_FUTURE_DATA:{value:3},HAVE_METADATA:{value:1},HAVE_NOTHING:{value:0},NETWORK_EMPTY:{value:0},NETWORK_IDLE:{value:1},NETWORK_LOADING:{value:2},NETWORK_NO_SOURCE:{value:3}},"prop"))});