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
######################################################################*/

$(function() {
	$('.multi_part_form').multipartform();
	
	$('#cloneElement').cloneElement();

});


// Set the chainfunction
$.fn.cloneElement = function(params) {
	if (typeof(params) == 'undefined'){
		var params = new Object;
	}
	
	params.id = '#'+$(this).attr('id')
	params.form_key = $(this).attr('id');
	cloneElement(params);
}

function cloneElement(params){
	//alert(params.id);
	$('.cloneClose').click(function(e){
		e.preventDefault();
		closeClone('#'+$(this).attr('id'));
	});
	$(params.id).click(function(){
		var elementToClone = $(params.id).attr('data-clone');
		if ($('.cloneElement').length == 0)
		{	
			var cloneElementCount = 0;
		}else{
			var cloneElementCount = $('.cloneElement').length;
		}
		var clonedElement = $('[data-clone-target="'+elementToClone+'"]')
			.clone()
			.addClass('cloneElement')
			.attr('clone-number',cloneElementCount)
			.removeAttr('data-clone-target','');
		$("[name]", clonedElement).attr('name',function(){
			var newName = $(this).attr('name') + '_' + $('.cloneElement').length
			return newName;
		});
		$("button.cloneClose", clonedElement).attr('id',function(){
			var newId = 'cloneClose' + '_' + $('.cloneElement').length
			return newId;
		}).click(function(e){
			e.preventDefault();
			closeClone('#'+$(this).attr('id'));
		}).removeClass('hide');
		$("[name]", clonedElement).attr('id',function(){
			var newId = $(this).attr('id') + '_' + $('.cloneElement').length
			return newId;
		});
		if (cloneElementCount == 0)
		{
			clonedElement.insertAfter('[data-clone-target="'+elementToClone+'"]');
		}else{
			clonedElement.insertAfter('.cloneElement:last');
		}
	});
	function closeClone(closeClicked){
		var closeClickedArr = closeClicked.split('_');
		
		$('[clone-number="'+closeClickedArr[1]+'"]').remove();
		//elementToClose.destroy();
	}
}

// Set the chainfunction
$.fn.multipartform = function(params) {
	if (typeof(params) == 'undefined'){
		var params = new Object;
	}
	
	params.id = '#'+$(this).attr('id')
	params.form_key = $(this).attr('id');
	multipartFormSetup(params);
}

function multipartFormSetup(params){
	var form_id = params.id;
	var form_key = params.form_key
	//print_r(params);
	$(form_id).submit(function(e){
		e.preventDefault();
	});
	
	// DOM Elements
	var dataDiv 		= $('<div>',{'id': form_key+'_data'}).prependTo(form_id);
	var stepsDiv		= $('<div>',{'class':'steps progress form-progress'}).insertAfter(dataDiv);
	var stepsUl 		= $('<ul>',{'class':'nav'}).appendTo(stepsDiv);
	var buttonContainer	= $('<div>',{'id': 'button_multiform_container', 'class':'clearfix'}).appendTo(form_id);
	var rightButton		= $('<button>',{'id': 'right_multiform_button', 'class':'multipartFormButton btn btn-large btn-link pull-right', 'style':'clear:both;'}).appendTo(buttonContainer);
	var leftButton		= $('<div>',{'id': 'left_multiform_button', 'class':'multipartFormButton btn btn-large btn-link'}).appendTo(buttonContainer);
	
	// Use Variables
	var numberOfFrames	= $('.frame').length;
	var stepsSize		= 100 / numberOfFrames;
	var lastFrame		= ($('.frame').length - 1);
	
	
	$('.frame').each(function(i){
		activeClass = '';
		if (i == 0){
			activeClass = 'active';
		}
		$('<li>',{'id': form_key+'_step_'+i, 'class':activeClass, 'style':'width:'+stepsSize+'%'}).html($(this).attr('title')).appendTo(stepsUl);
		$(this).attr('id','frame_'+i).hide();
	});
	
	insertStep(0);

	function insertStep(frame_id){
		
		if ($(form_id + ' > .frame').length > 0)
		{
			rightButton.unbind();
			leftButton.unbind();
			$(form_id + ' > .frame').hide().appendTo('#framesContainer');
		}
		$('#frame_'+frame_id).show().insertAfter(stepsDiv);
		rightButton.html('Continue');
		rightButton.click(function(){
			processStep(frame_id, 'forward');
		});
		leftButton.html('Back');
		leftButton.click(function(){
			processStep(frame_id, 'back');
		});
		switch(frame_id)
		{
 			case 0:
 				leftButton.hide();
 				break;
 			case lastFrame:
 				rightButton.html('Submit');
 				break;
 			default:
 				leftButton.show();
 				break;
 		}
 		
 		$("html, body").animate({ scrollTop: $(form_id).offset().top}, "slow");
	}
	
	function processStep(frame_id, direction){
		setTimeout(function(){
			//alert($(form_id + ' .form-ui-invalid').length);
			if ($(form_id + ' .form-ui-invalid').length == 0)
			{
				dataDiv.data('frameData_'+frame_id, $(form_id).serializeArray());
				if ((frame_id == lastFrame) && (direction == 'forward'))
				{
					submitSteps(dataDiv.data());
				}else{
					if (direction == 'forward')
					{
						insertStep(frame_id + 1);
						$('#'+form_key + '_step_' + parseInt(frame_id)).removeClass('active');
						$('#'+form_key + '_step_' + parseInt(frame_id)).addClass('visited');
						$('#'+form_key + '_step_' + parseInt(frame_id+1)).removeClass('visited');
						$('#'+form_key + '_step_' + parseInt(frame_id+1)).addClass('active');
					}
					if (direction == 'back')
					{
						insertStep(frame_id - 1);
						$('#'+form_key + '_step_' + parseInt(frame_id)).removeClass('active');
						$('#'+form_key + '_step_' + parseInt(frame_id-1)).removeClass('visited');
						$('#'+form_key + '_step_' + parseInt(frame_id-1)).addClass('active');
					}
				}
			}
		},200);
	}
	
	function submitSteps(values){
		var submitArray = new Array();
		var i = 0;
		$.each(values, function(k, v){
			$.each(v, function(kInternal, vInternal){
				submitArray[i] = vInternal;
				i++;
			});
		});
		var throbber = '<img src="/assets/img/forms/polyfill-loader.gif" border="0" style="height:100%;width:100%">'
		rightButton.html(throbber);
		$.post('/forms/send/', submitArray)
		.success(function() {
			$('.form-body').html('');
			$.ajax({
				url: '/messages/getmessage/key/emailFormSubmitted/',
				success: function (data) {
					rightButton.remove();
					leftButton.remove();
					var responseWell = $('<div>',{'class':'form-body well well-large'}).html(data);
					$('#frame_'+lastFrame +' .form-body').html(responseWell);
				}
			});
		})
		.error(function() {
			$('.form-body').html('');
			$.ajax({
				url: '/messages/getmessage/key/emailFormError/',
				success: function (data) {
					$('<div>',{'class':'well well-large'}).html(data).appendTo('.form-body');
					$(".email-form :input").removeAttr('disabled');
				}
			});
		});
	}
}