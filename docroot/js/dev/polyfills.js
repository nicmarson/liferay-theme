(function() {

  // Don't suspend the DOM
  // Don't load shim.css
  $.webshims.setOptions({
    waitReady: false,
    loadStyles: false
  });

  // Allow custom messages on forms
  $.webshims.setOptions('forms', {
    customMessages: true
  });

  // load only forms polyfills
  $.webshims.polyfill('forms');

  $(function() {

    // Show error messages per input
    // rather than on submit
    $('input[required], select[required], textarea[required]').bind('focusout', function(e) {
        var jElem = $(e.target);
        if (jElem.prop('willValidate') && !jElem.prop('validity').valid) {
            $.webshims.validityAlert.showFor(jElem, jElem.prop('validationMessage'), true);
        }
    }).bind('changedvalid', function(e) {
        $(e.target).parent().addClass('valid').removeClass('invalid');
    }).bind('changedinvalid', function(e) {
        $(e.target).parent().addClass('invalid').removeClass('valid');
    }).bind('firstinvalid', function(e) {
        $.webshims.validityAlert.showFor(e.target);
        return false;
    });

    // Add class valid/invalid to parent container
    $('form').bind('focusout invalid', function(e){
      // get target element
      var $elem = $(e.target);
      //if the element is a candidate for constraint
      if($elem.attr('willValidate') && $elem.attr('type') !== 'submit'){
        //test whether it is valid and set/remove the classes
        if(e.type !== 'invalid' && $elem.is(':valid-element')){
          $elem.closest('.form-element, fieldset').addClass('valid').removeClass('invalid');
        } else {
          $elem .closest('.form-element, fieldset').addClass('invalid').removeClass('valid');
        }
      }
    });

  });

})();
