(function(){$.webshims.setOptions({waitReady:!1,loadStyles:!1});$.webshims.setOptions("forms",{customMessages:!0});$.webshims.polyfill("forms");$(function(){$("input[required], select[required], textarea[required]").bind("focusout",function(e){var t=$(e.target);t.prop("willValidate")&&!t.prop("validity").valid&&$.webshims.validityAlert.showFor(t,t.prop("validationMessage"),!0)}).bind("changedvalid",function(e){$(e.target).parent().addClass("valid").removeClass("invalid")}).bind("changedinvalid",function(e){$(e.target).parent().addClass("invalid").removeClass("valid")}).bind("firstinvalid",function(e){$.webshims.validityAlert.showFor(e.target);return!1});$("form").bind("focusout invalid",function(e){var t=$(e.target);t.attr("willValidate")&&t.attr("type")!=="submit"&&(e.type!=="invalid"&&t.is(":valid-element")?t.closest(".form-element, fieldset").addClass("valid").removeClass("invalid"):t.closest(".form-element, fieldset").addClass("invalid").removeClass("valid"))})})})();