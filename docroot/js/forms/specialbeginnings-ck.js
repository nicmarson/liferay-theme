/*######################################################################
#	JAVASCRIPT for special beginnings form.
#
#
#	@Table of Contents:
#		Element Bindings
#		SYSTEM FUNCTIONS
#		UTILITY FUNCTIONS
#		FORMS BINDINGS
#
######################################################################*/function cloneElement(e){function t(e){var t=e.split("_");$('[clone-number="'+t[1]+'"]').remove()}$(".cloneClose").click(function(e){e.preventDefault();t("#"+$(this).attr("id"))});$(e.id).click(function(){var n=$(e.id).attr("data-clone");if($(".cloneElement").length==0)var r=0;else var r=$(".cloneElement").length;var i=$('[data-clone-target="'+n+'"]').clone().addClass("cloneElement").attr("clone-number",r).removeAttr("data-clone-target","");$("[name]",i).attr("name",function(){var e=$(this).attr("name")+"_"+$(".cloneElement").length;return e});$("button.cloneClose",i).attr("id",function(){var e="cloneClose_"+$(".cloneElement").length;return e}).click(function(e){e.preventDefault();t("#"+$(this).attr("id"))}).removeClass("hide");$("[name]",i).attr("id",function(){var e=$(this).attr("id")+"_"+$(".cloneElement").length;return e});r==0?i.insertAfter('[data-clone-target="'+n+'"]'):i.insertAfter(".cloneElement:last")})}function multipartFormSetup(e){function h(e){if($(t+" > .frame").length>0){u.unbind();a.unbind();$(t+" > .frame").hide().appendTo("#framesContainer")}$("#frame_"+e).show().insertAfter(i);u.html("Continue");u.click(function(){p(e,"forward")});a.html("Back");a.click(function(){p(e,"back")});switch(e){case 0:a.hide();break;case c:u.html("Submit");break;default:a.show()}$("html, body").animate({scrollTop:$(t).offset().top},"slow")}function p(e,i){setTimeout(function(){if($(t+" .form-ui-invalid").length==0){r.data("frameData_"+e,$(t).serializeArray());if(e==c&&i=="forward")d(r.data());else{if(i=="forward"){h(e+1);$("#"+n+"_step_"+parseInt(e)).removeClass("active");$("#"+n+"_step_"+parseInt(e)).addClass("visited");$("#"+n+"_step_"+parseInt(e+1)).removeClass("visited");$("#"+n+"_step_"+parseInt(e+1)).addClass("active")}if(i=="back"){h(e-1);$("#"+n+"_step_"+parseInt(e)).removeClass("active");$("#"+n+"_step_"+parseInt(e-1)).removeClass("visited");$("#"+n+"_step_"+parseInt(e-1)).addClass("active")}}}},200)}function d(e){var t=new Array,n=0;$.each(e,function(e,r){$.each(r,function(e,r){t[n]=r;n++})});var r='<img src="../images/forms/polyfill-loader.gif" border="0" style="height:100%;width:100%">';u.html(r);$.post("/forms/send/",t).success(function(){$(".form-body").html("");$.ajax({url:"/messages/getmessage/key/emailFormSubmitted/",success:function(e){u.remove();a.remove();var t=$("<div>",{"class":"form-body well well-large"}).html(e);$("#frame_"+c+" .form-body").html(t)}})}).error(function(){$(".form-body").html("");$.ajax({url:"/messages/getmessage/key/emailFormError/",success:function(e){$("<div>",{"class":"well well-large"}).html(e).appendTo(".form-body");$(".email-form :input").removeAttr("disabled")}})})}var t=e.id,n=e.form_key;$(t).submit(function(e){e.preventDefault()});var r=$("<div>",{id:n+"_data"}).prependTo(t),i=$("<div>",{"class":"steps progress form-progress"}).insertAfter(r),s=$("<ul>",{"class":"nav"}).appendTo(i),o=$("<div>",{id:"button_multiform_container","class":"clearfix"}).appendTo(t),u=$("<button>",{id:"right_multiform_button","class":"multipartFormButton btn btn-large btn-link pull-right",style:"clear:both;"}).appendTo(o),a=$("<div>",{id:"left_multiform_button","class":"multipartFormButton btn btn-large btn-link"}).appendTo(o),f=$(".frame").length,l=100/f,c=$(".frame").length-1;$(".frame").each(function(e){activeClass="";e==0&&(activeClass="active");$("<li>",{id:n+"_step_"+e,"class":activeClass,style:"width:"+l+"%"}).html($(this).attr("title")).appendTo(s);$(this).attr("id","frame_"+e).hide()});h(0)}$(function(){$(".multi_part_form").multipartform();$("#cloneElement").cloneElement()});$.fn.cloneElement=function(e){if(typeof e=="undefined")var e=new Object;e.id="#"+$(this).attr("id");e.form_key=$(this).attr("id");cloneElement(e)};$.fn.multipartform=function(e){if(typeof e=="undefined")var e=new Object;e.id="#"+$(this).attr("id");e.form_key=$(this).attr("id");multipartFormSetup(e)};