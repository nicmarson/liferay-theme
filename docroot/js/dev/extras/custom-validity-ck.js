(function(e,t,n,r){"use strict";if(!e.webshims){var i=navigator.browserLanguage||navigator.language||e("html").attr("lang")||"";e.webshims={addReady:function(t){e(function(){t(n,e([]))})},ready:function(e,t){t()},activeLang:function(){return i}}}var s=e.webshims,o={},u=!1,a,f,l=function(e){s.refreshCustomValidityRules(e.target)};s.customErrorMessages={};s.addCustomValidityRule=function(t,n,r){o[t]=n;if(!s.customErrorMessages[t]){s.customErrorMessages[t]=[];s.customErrorMessages[t][""]=r||t}e.isReady&&u&&e("input, select, textarea").each(function(){c(this)})};s.refreshCustomValidityRules=function(t){if(!t.form||!f&&!e.prop(t,"willValidate"))return;a=!0;var n=e.data(t,"customMismatchedRule"),r=e.prop(t,"validity")||{},i="";if(n||!r.customError){var u=e(t).val();e.each(o,function(r,o){i=o(t,u)||"";n=r;if(i){typeof i!="string"&&(i=e(t).data("errormessage")||t.getAttribute("x-moz-errormessage")||s.customErrorMessages[r][s.activeLang()]||s.customErrorMessages[r][""]);typeof i=="object"&&(i=i[r]||i.customError||i.defaultMessage);return!1}});i&&e.data(t,"customMismatchedRule",n);e(t).setCustomValidity(i)}a=!1};var c=s.refreshCustomValidityRules;s.ready("forms",function(){u=!0;var t=e.fn.setCustomValidity||function(e){return this.each(function(){this.setCustomValidity&&this.setCustomValidity(e)})};e.fn.setCustomValidity=function(e){a||this.data("customMismatchedRule","");return t.apply(this,arguments)};e(n).bind("change",l);s.addReady(function(t,n){f=!0;e("input, select, textarea",t).add(n.filter("input, select, textarea")).each(function(){c(this)});f=!1});e(n).bind("refreshCustomValidityRules",l)})})(jQuery,window,document);(function(e,t,r,i){"use strict";var s=e.webshims.addCustomValidityRule;s("partialPattern",function(t,n){if(!n||!t.getAttribute("data-partial-pattern"))return;var r=e(t).data("partial-pattern");if(!r)return;return!(new RegExp("("+r+")","i")).test(n)},"This format is not allowed here.");s("tooShort",function(t,n){if(!n||!t.getAttribute("data-minlength"))return;return e(t).data("minlength")>n.length},"Entered value is too short.");var o={};s("group-required",function(t,n){var i=t.name;if(!i||t.type!=="checkbox"||!e(t).hasClass("group-required"))return;var s=e(t.form&&t.form[i]||r.getElementsByName(i)),u=s.filter(":checked");o[i]&&clearTimeout(o[i]);o[i]=setTimeout(function(){s.unbind("click.groupRequired").bind("click.groupRequired",function(){s.filter(".group-required").each(function(){e.webshims.refreshCustomValidityRules(this)})})},9);return!u[0]},"Please check one of these checkboxes.");var u=/[^0-9-]+/;s("creditcard",function(t,r){if(!r||!e(t).hasClass("creditcard-input"))return;if(!u.test(r))return!0;var i=0,s=0,o=!1;r=r.replace(/\D/g,"");for(n=r.length-1;n>=0;n--){var a=r.charAt(n);s=parseInt(a,10);o&&(s*=2)>9&&(s-=9);i+=s;o=!o}return i%10!==0},"Please enter a valid credit card number");var a={prop:"value","from-prop":"value",toggle:!1},f=function(t){return e(t.form[t.name]).filter('[type="radio"]')};e.webshims.ready("form-core",function(){e.webshims.modules&&(f=e.webshims.modules["form-core"].getGroupElements||f)});s("dependent",function(t,n){if(!t.getAttribute("data-dependent-validation"))return;var i=e(t).data("dependentValidation"),s;if(!i)return;var o=function(n){var r=e.prop(i.masterElement,i["from-prop"]);s&&(r=e.inArray(r,s)!==-1);i.toggle&&(r=!r);e.prop(t,i.prop,r)};if(!i._init||!i.masterElement){typeof i=="string"&&(i={from:i});i.masterElement=r.getElementById(i.from)||r.getElementsByName(i.from||[])[0];if(!i.masterElement||!i.masterElement.form)return;if(/radio|checkbox/i.test(i.masterElement.type)){i["from-prop"]||(i["from-prop"]="checked");!i.prop&&i["from-prop"]=="checked"&&(i.prop="disabled")}else i["from-prop"]||(i["from-prop"]="value");if(i["from-prop"].indexOf("value:")===0){s=i["from-prop"].replace("value:","").split("||");i["from-prop"]="value"}i=e.data(t,"dependentValidation",e.extend({_init:!0},a,i));i.prop!=="value"||s?e(i.masterElement.type==="radio"&&f(i.masterElement)||i.masterElement).bind("change",o):e(i.masterElement).bind("change",function(){e.webshims.refreshCustomValidityRules(t);e(t).is(".user-error, .user-success")&&e(t).trigger("refreshvalidityui")})}if(i.prop=="value"&&!s)return e.prop(i.masterElement,"value")!=n;o();return""},"The value of this field does not repeat the value of the other field")})(jQuery,window,document);