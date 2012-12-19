/*######################################################################
#	JAVASCRIPT/JQUERY Shared Library
#
#
#	@Table of Contents:
#		Element Bindings
#		SYSTEM FUNCTIONS
#		UTILITY FUNCTIONS
#		FORMS BINDINGS
#		NOTIFICATION WIDGET BINDINGS AND FUNCTIONS
#
######################################################################*/

/*######################################################################
#	ELEMENT BINDINGS START
#
#	@CONTENTS
#		docReady() - Well not really but essentially;
#			heroDropdowns
#			carousel
#			accordian
#			pullquote
#			image Handling
#
######################################################################*/
$(function() {

	// Existing Bindings, Evaluate for Depricate
	var heroDropdowns = $('#js-hero-dropdowns');
	var	shopBoxButton = $('a#js-shopping-toggle');
	var	searchBoxButton = $('a#js-search-toggle');
	var	heroDropdownsHeight = heroDropdowns.height();

	// Set current height so that the heights don't toggle
	heroDropdowns.css({'height':heroDropdownsHeight});
	$(window).on('resize', function() {
		heroDropdowns.css('height','auto');
		heroDropdownsHeight = heroDropdowns.height();
		heroDropdowns.css({'height':heroDropdownsHeight});
	});


	// Shopping Toggle
	shopBoxButton.on('click', function(){
		shopBoxButton.toggleHero({
			'show':'shopBox'
		});
	});

	searchBoxButton.on('click', function(){
		searchBoxButton.toggleHero({
			'show':'searchBox'
		});
	});


	//  Hero Ajax Triggers
	$("#dropdown-personalize > li").click(function(){
		var audienceArray = $(this).attr('id').split('_');
		var toggleOption = audienceArray[0] + '_toggle';
		$("#personalization_audience_dropdown").text($(this).text());
		$("#personalization_audience_dropdown").attr('selected_id', toggleOption);
		$("#personalization_audience_dropdown").addClass('changed');
		$("#personalization_audience_dropdown").parent().removeClass('open');
	});


	// Give the carousel pagination
	var carousel = $('div.carousel');
	carousel.carousel({
		interval : 8000
	}).on('click', '[data-to]', function(q){
		$this = $(this);
		var targetSlide = $this.attr('data-to')-1; // grabs the slide number
		carousel.carousel(targetSlide).find('[data-to]').removeClass('active'); // gives the slide number to the carousel and removes class 'active' from the nav item
		$this.addClass('active');
		q.preventDefault(); // keep the hash call out of the URL
	}).bind('slid', function(){
		var slideIndex = $('div.carousel div.active').index('div.carousel div.item')+1; // gets current slide index
		carousel.find('[data-to]').removeClass('active'); // remove .active from nav links
		$('[data-to='+slideIndex+']').addClass('active'); // add .active to current nav link
	});

	// Add active class to accordion title
	$('div.accordion').on('show', function (e) {
		$(e.target).prev('div.accordion-heading').find('a.accordion-toggle').addClass('active');
	}).on('hide', function (e) {
		$(this).find('a.accordion-toggle').not($(e.target)).removeClass('active');
	});

	// Pull quotes from a paragraph and add them at the end as a blockquote
	$('span.pullquote').each(function() {
		var $parentParagraph = $(this).parent('p');
		var $quoteContent = $(this).text();
		var $quoteParagraph = $('<p>').text($quoteContent);
		$parentParagraph.css('position', 'relative');
		$('<blockquote class="pull-right">').html($quoteParagraph).prependTo($parentParagraph);
	});

	// Images with height and width set increase loading time
	// This overrides their setting so that they resize based on the window
	$('.image img').height('auto').width('100%');

	// Anystretch Plugin for Responsive Images
	// This takes a background image and resizes it based on window size
	// * USE background-image: NOT background: *
	$('div.image-responsive').each(function() {
		var $resDiv = $('div.image-responsive');
		var resUrl = $resDiv.css("background-image").replace(/"/g,"").replace(/url\(|\)$/ig, "");
		if ($(this).hasClass('focus-center')) {
			$resDiv.anystretch(resUrl);
		}
		if ($(this).hasClass('focus-left')) {
			$resDiv.anystretch(resUrl, {positionX: 'left'});
		}
		if ($(this).hasClass('focus-right')) {
			$resDiv.anystretch(resUrl, {positionX: 'right'});
		}
	});
	// This takes an inline image and resizes it based on window size
	$('img.image-responsive').each(function() {
		var $resImg = $('img.image-responsive');
		var resSrc = $resImg.hide().attr('src');
		if ($(this).hasClass('focus-center')) {
			$resImg.parent().anystretch(resSrc);
		}
		if ($(this).hasClass('focus-left')) {
			$resImg.parent().anystretch(resSrc, {positionX: 'left'});
		}
		if ($(this).hasClass('focus-right')) {
			$resImg.parent().anystretch(resSrc, {positionX: 'right'});
		}
	});

	// Open external links in a new window
	$('a.external').on('click', function(){
		window.open(this.href, '_blank');
		return false;
	}).append('&nbsp;<span class="icon-external" aria-hidden="true"></span>');

	// Reveal hidden content on preview RV
	$('a.toggle-reveal').on('click', function(){
		var parent = $(this).closest('.preview-container');
		$(parent).find('.reveal').toggleClass('hide');
		return false;
	});

	// Activate Tooltips
	$('.tooltip-container').tooltip({
		selector: "[rel=tooltip]"
	});
	
	$(".injected_form").each(function(){
		$(this).buildInjectedForm();
	});
	
	if ($('.null_state_block').length !== 0){
		$('#personalization_message').html("<h1>Relax.</h1><p>We'll only ask you once to tell us what kind of information you're looking for and where you are.</p>");
	}
	
});


/*######################################################################
#	ELEMENT BINDINGS END
######################################################################*/

/*######################################################################
#	SYSTEM FUNCTIONS
#
#	@CONTENTS
#		docReady() - Well not really but essentially;
#			toggleHero
#			setPersonalization
#			setDemographics
#
######################################################################*/

// Set the chainfunction
function toggleHero(params){
	var shopBox				= $('div#js-shopping-dropdown');
	var	searchBox			= $('div#js-search-dropdown');
	var	heroDropdowns		= $('#js-hero-dropdowns');
	var	shopBoxButton		= $('a#js-shopping-toggle');
	var	searchBoxButton		= $('a#js-search-toggle');


	if ($(heroDropdowns).hasClass('show')) {
		switch ( params.show ) {
			case 'shopBox':
				if ($(searchBox).hasClass('show')) {
					searchBoxButton.parent().removeClass('active');
					searchBox.css('position','absolute').fadeOut('fast',function(){
						$(searchBox).removeClass('show');
						$(searchBox).addClass('hide');
						$(searchBox).removeAttr("style");
						shopBoxButton.parent().addClass('active');
						shopBox.fadeIn('fast',function(){
							$(shopBox).removeClass('hide');
							$(shopBox).addClass('show');
							$(shopBox).removeAttr("style");
						});
					});
				}else if ($(shopBox).hasClass('show')){
					shopBoxButton.parent().removeClass('active');
					searchBoxButton.parent().removeClass('active');
					heroDropdowns.fadeOut('slow', function(){
						heroDropdowns.removeClass('show');
						heroDropdowns.addClass('hide');
					});
				}
			break;

			case 'searchBox':
				if ($(shopBox).hasClass('show')) {
					shopBoxButton.parent().removeClass('active');
					shopBox.fadeOut('fast',function(){
						$(shopBox).removeClass('show');
						$(shopBox).addClass('hide');
						$(shopBox).removeAttr("style");
						searchBoxButton.parent().addClass('active');
						searchBox.fadeIn('fast', function(){
							$(this).css('position','relative');
							$(searchBox).removeClass('hide');
							$(searchBox).addClass('show');
							$(searchBox).removeAttr("style");
						});
					});
				}else if ($(searchBox).hasClass('show')){
					shopBoxButton.parent().removeClass('active');
					searchBoxButton.parent().removeClass('active');
					heroDropdowns.fadeOut('slow', function(){
						heroDropdowns.removeClass('show');
						heroDropdowns.addClass('hide');
					});
				}
			break;
		}
	} else {
			switch ( params.show ) {
			case 'shopBox':
				if ($(searchBox).hasClass('show')) {
					$(searchBox).removeClass('show');
					searchBox.css('position','absolute').addClass('hide');
					$(shopBox).removeClass('hide');
					$(shopBox).addClass('show');
					shopBoxButton.parent().addClass('active');
				}
				shopBoxButton.parent().addClass('active');
			break;

			case 'searchBox':
				if ($(shopBox).hasClass('show')) {
					$(shopBox).removeClass('show');
					shopBox.addClass('hide');
					searchBox.css('position','relative').addClass('show');
					$(searchBox).removeClass('hide');
				}
				searchBoxButton.parent().addClass('active');
			break;
		}
		heroDropdowns.fadeIn('slow', function(){
			heroDropdowns.removeClass('hide');
			heroDropdowns.addClass('show');
		});
	}
}

// Set the chainfunction
$.fn.toggleHero = function(params) {
	if (typeof(params) === 'undefined'){
		var params = new Object;
	}
	
	params.thisElement = '#'+$(this).attr('id');
	params.tKey = $(this).attr('id');
	toggleHero(params);
};

// Set the chainfunction
$.fn.buildInjectedForm = function(params) {
	if (typeof(params) === 'undefined'){
		var params = new Object;
	}

	params.trigger_id = '#'+$(this).attr('trigger_id');
	params.trigger_key = $(this).attr('trigger_id');
	params.form_url = $(this).attr('form_url');
	params.injectable = $(this).html();
	buildInjectedForm(params);
};

function setDemographics(zipcode){
	if (typeof(zipcode) !== 'null'){
		$.ajax({
			url: '/user/setdemographics/zipcode/' + zipcode,
			success: function (data) {
				if (typeof(zipcode) !== 'null'){
					$.ajax({
						url: '/user/setregion/region/OR',
						success: function (data) {
							//print_r(data);
						},
						error: function (xhr, textStatus, errorThrown) {
							// todo: fails
						}
					});
				}
			},
			error: function (xhr, textStatus, errorThrown) {
				// todo: fails
			}
		});
	}
}

/*######################################################################
#	SYSTEM FUNCTIONS END
######################################################################*/

/*######################################################################
#	UTILITY FUNCTIONS START
#
#	@CONTENTS
#		print_r();
#		validateRequired();
#
######################################################################*/

/************************************************************************
* Form validation function.
* @author Tara Grieb
* @created 7/19/11
* Function for detecting fields labeled required in the class property.
* Needs to be extended. Has a callback.
* Useage:
	If class required exists will check for data
	If compare attribute set will compare against the value of the field named in the attribute.
************************************************************************/
function validateRequired(scope,callbackFnk){
	if(typeof(scope) === 'function'){
		callbackFnk = scope;
		scope = "";
	}else{
		scope = '#' + scope;
	}

	var validForm = true;
	// If scope defined restrict, otherwise go thru every element in Dom
	$(scope+' .required').each(function(index){
		//$('.required').val();
		// Check Filled
		if($(this).val() === ""){
			validForm = false;
			$(this).addClass('alertInvalid');
			if ($(this).hasClass('fancySelect')){
				$(this).prev('div .fancySelect').addClass('alertInvalid');
			}
		}else{
			// If the above passed go thru conditionals
			if ($(this).hasClass('alertInvalid')){
				$(this).removeClass('alertInvalid');
				if ($(this).hasClass('fancySelect')){
					$(this).prev('div .fancySelect').removeClass('alertInvalid');
				}
			}
			// verify prepop
			if($(this).attr('prepop')){
				if ($(this).attr('prepop') === $(this).val()){
					validForm = false;
					$(this).addClass('alertInvalid');
				}
			}
			// verify Minlegth
			if($(this).attr('minLength')){
				if ($('.lengthNote').length < 1){
					$(this).after('<div class="lengthNote validationAlert"><div>');
				}else{
					$('.lengthNote').html('');
				}
				if ($(this).attr('minLength') > $(this).val().length){
					//alert($('#'+$(this).attr('compare')).val() + ' !== ' + $(this).val());
					validForm = false;
					$(this).addClass('alertInvalid');
					$('.lengthNote').html('The value must be at least ' + $(this).attr('minLength') + ' characters long');
				}else{
					$('.lengthNote').html('');
				}
			}
			// verify Compare two values
			if($(this).attr('compare')){
				if ($('.compareNote').length < 1){
					$(this).after('<div class="compareNote validationAlert"><div>');
				}else{
					$('.compareNote').html('');
				}
				if ($('#'+$(this).attr('compare')).val() !== $(this).val()){
					//alert($('#'+$(this).attr('compare')).val() + ' !== ' + $(this).val());
					validForm = false;
					$(this).addClass('alertInvalid');
					$('.compareNote').html('The values must match');
				}
			}
			// verify Email
			if($(this).attr('emailField')){
					if ($('.emailNote').length < 1){
						$(this).after('<div class="emailNote validationAlert"><div>');
				}else{
					$('.emailNote').html('');
					}
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if (!emailReg.test($(this).val())){
					validForm = false;
					$(this).addClass('alertInvalid');
					$('.emailNote').html('The value must be an email address');
				}
			}
			// verify Numeric
			if($(this).attr('numericField')){
				if ($('.numericNote').length < 1){
					$(this).after('<div class="numericNote validationAlert"><div>');
				}else{
					$('.numericNote').html('');
				}
				var numberReg = /^-{0,1}\d*\.{0,1}\d+$/;
				if (!numberReg.test($(this).val())){
					validForm = false;
					$(this).addClass('alertInvalid');
					$('.numericNote').html('The value must be a number');
				}
			}
			// verify Dollar Feidls
			if($(this).attr('dollarField')){
				if ($('.dollarNote').length < 1){
					$(this).after('<div class="dollarNote validationAlert"><div>');
				}else{
					$('.dollarNote').html('');
				}
				var numberReg = /^\d*\.{0,1}\d+$/;
				if (!numberReg.test($(this).val()) || $(this).val() < 0.01){
					validForm = false;
					$(this).addClass('alertInvalid');
					$('.dollarNote').html('The value must be a dollar amount');
				}
			}
		}
	});
	if(typeof callbackFnk === 'function'){
		callbackFnk.call(this, validForm);
	}

	return validForm;
}

function getRegionFromZip(zipcodeValue, callbackFnk){
	//testCodes = ['99201','98629','97109','97231','97396','97101','97378','97009','97011','97013','97015','97022','97024','97027','97030','97034','97035','97036','97042','97045','97055','97068','97070','97080','97086','97089','97201','97202','97203','97204','97205','97206','97207','97208','97209','97210','97211','97212','97213','97214','97215','97216','97217','97218','97219','97220','97221','97222','97227','97228','97230','97232','97233','97236','97238','97239','97240','97242','97256','97258','97266','97267','97268','97269','97280','97282','97283','97286','97290','97292','97293','97294','97296','97005','97006','97007','97008','97075','97076','97077','97106','97111','97113','97114','97115','97116','97117','97119','97123','97124','97125','97127','97128','97132','97133','97144','97223','97224','97225','97229','97281','97291','97298','97378','97004','97010','97017','97019','97023','97028','97038','97049','97060','97062','97067','97140','97148'];
	//$.each(testCodes,function(i, zipcodeValue){
	$.ajax({
		url: '/user/getdemographics/zipcode/' + zipcodeValue,
		dataType: 'JSON',
		success: function (data) {
			switch(data.value)
			{
				case 'ERROR':
					switch(data.error)
					{
						case 'COUNTY_CHALLENGE':
							var response = {
								'event'		:	'refine',
								'data'		:	'data.counties'
							};
							break;
						case 'OUT_OF_AREA_ERROR':
							var response = {
								'event'		:	'error',
								'data'		:	'region_issue'
							};
							break;
						case 'WRONG_BRAND':
							var response = {
								'event'		:	'error',
								'data'		:	'wrong_brand'
							};
							break;
						default:
							var response = {
								'event'		:	'error',
								'data'		:	'region_issue'
							};
					}
					break;
				default:
					switch(data.area)
					{
						case 'clark_co':
							var response = {
								'event'		:	'success',
								'data'		:	'CC'
							};
							break;
						case 'wa':
							var response = {
								'event'		:	'success',
								'data'		:	'WW'
							};
							break;
						case 'asuris':
							var response = {
								'event'		:	'success',
								'data'		:	'EW'
							};
							break;
						default:
							var response = {
								'event'		:	'success',
								'data'		:	data.value
							};
					}
			}

			if(typeof callbackFnk === 'function'){
				callbackFnk.call(this, response);
			}

		}
	});
//	});
	return false;
}


/************************************************************************
* Print_R function.
* @author Tara Grieb
* @created 7/19/11
* Used for posting to the console. WILL THROW ERRORS IN IE. REMOVE FROM CODE IF USED!
************************************************************************/
// I spent weeks trying to make this more robust in my free time. In the end this is what it is.
function print_r(theObj, tabIteration){
		if (!tabIteration){
			var	tabIteration = ' ';
		}else{
			tabIteration += '   ';
		}
		$.each(theObj, function(key, value) {
			console.log(tabIteration + "["+key+"] => " + value + " {" + typeof(theObj) + "}");
			if (value){
				if(typeof(theObj[key]) === 'array' || typeof(theObj[key]) === 'object'){
					print_r(theObj[key], tabIteration);
				}
		}
	});
}

/*######################################################################
#	UTILITY FUNCTIONS END
######################################################################*/

/*######################################################################
#	NOTIFICATION WIDGET BINDINGS AND FUNCTIONS START
#
#	@CONTENTS
#		notification_closeAndCookie();
#
#
######################################################################*/

function notification_closeAndCookie(params){
	$.ajax({
		url: '/user/hidenotification/id/' + params.notification_id,
		success: function (data) {
			
		},
		error: function (xhr, textStatus, errorThrown) {
			// todo: fails
		}
	});
}
$('.notification_widget_close').on('click',function(){
	//alert($(this).parent().attr('id'));
	params = {
		'notification_id' : $(this).parent().attr('id')
	};
	notification_closeAndCookie(params);
});

/*######################################################################
#	NOTIFICATION WIDGET BINDINGS AND FUNCTIONS END
######################################################################*/

/*######################################################################
#	FORM BINDINGS AND FUNCTIONS START
#
#	@CONTENTS
#		print_r();
#		validateRequired();
#
######################################################################*/

$(function() {

	$("#form-personalize").submit(function(e){
		e.preventDefault();
		if ($('#zip-personalize').val() !== ''){

			resizeHero('contract');

			audienceArray = $("#personalization_audience_dropdown").attr('selected_id').split('_');
			params = {
				'zipcode'		: $('#zip-personalize').val(),
				'audience'		: audienceArray[0],
				'redirectPage'	: false
			};
			if (
				($("#personalization_audience_dropdown").hasClass('changed') && $('#personalization_message').hasClass('returning')) ||
				($('#personalization_message').hasClass('new'))
			){
				params.redirectPage = 'true';
			}
			setPersonalization(params);
		}else{
			resizeHero('expand', 'invalid');
		}
	});


	//form-search
	$("#form-search").submit(function(e){
		e.preventDefault();
		if ($('#search-query').val() !== ''){
			if ($('#search-query').hasClass('error')){
				$('#search-query').removeClass('error');
			}
			alert('Search for Value: ' + $('#search-query').val());
		}else{
			$('#search-query').addClass('error');
		}
	});

	$(document).on('submit', '.email-form', function(e){
		e.preventDefault();
		var existingSubmitText = $('.email-form button[type="submit"]').html();
		var throbber = '<img src="/assets/img/forms/polyfill-loader.gif" border="0" style="height:100%;width:100%">';
		$('.email-form button[type="submit"]').html(throbber);
		$(".email-form :input").attr('disabled','');
		$.post('/forms/send/', $(this).serialize())
		.success(function() {
			$('.form-body').html('');
			$.ajax({
				url: '/messages/getmessage/key/emailFormSubmitted/',
				success: function (data) {
					$('<div>',{'class':'well well-large'}).html(data).appendTo('.form-body');
					$(".email-form :input").removeAttr('disabled');
					if ($('.email-form').hasClass('modal_form')){
						$('.modal_submit').addClass('hide');
						$('.modal_cancel').html('Close');
					}
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
					if ($('.email-form').hasClass('modal_form')){
						$('#' + $('.email-form').parent().parent().parent().attr('id')).modal('toggle');
					}
				}
			});
		});
	});
	
	$(document).on('change', '.anonymous', function(){
		
		if ($(this).attr("checked")){
			$('.anonymous_block').addClass('show');
			$('.anonymous_block').removeClass('hide');
		}else{
			$('.anonymous_block').addClass('hide');
			$('.anonymous_block').removeClass('show');
		}
	});

	$(document).on('change', '#quality_concerns_consent', function(){
		if ($(this).val() === 'Yes'){
			$('#consent_block').addClass('show');
			$('#consent_block').removeClass('hide');
		}else{
			$('#consent_block').addClass('hide');
			$('#consent_block').removeClass('show');
		}
	});

	$(document).on('submit', '#providerSearch', function(e){
		e.preventDefault();
		window.location.href = 'http://www.regence.com/public/psearch/quickSearch.do?eventTarget=quickSearch&eventArgument=&selectedResultsPerPage=-1&sortArgument=default&selectedSpecialtyTypeId=&selectedSpecialtyId=&stcd=OR&nwk=&searchType=quickSearch&name='+$('#providerSearch #clinicName').val()+'&location='+$('#providerSearch #clinicLocation').val()+'&specialty='+$('#providerSearch #clinicSpecialty').val()+'&searchSubmit=Search';
	});

});



function buildInjectedForm(params){
	var trigger_id = params.trigger_id;
	var trigger_key = params.trigger_key;
	var injectable = params.injectable;
	var form_url = params.form_url;
	
	if ($(trigger_id).length !== 0){
		$(trigger_id).load(form_url+"?modal=true");
	}
	return false;
}

function setPersonalization(params){
	zipcodeValue		= params['zipcode'];
	audienceValue		= params['audience'];
	redirectPageValue	= params['redirectPage'];
	if (typeof(zipcodeValue) !== 'null'){
	// Call Function to get Region from Zip
		getRegionFromZip(zipcodeValue, function(region){
			if (region['event'] === 'success'){
				$.ajax({
					url: '/user/setdemographics/zipcode/' + zipcodeValue,
					success: function (data) {
						resizeHero('contract');
						$.ajax({
							url: '/user/setregion/region/' + region['data'],
							success: function (data) {
								if (typeof(audienceValue) !== 'null'){
									$.ajax({
										url: '/user/setaudience/audience/' + audienceValue,
										success: function (data) {
											if (redirectPageValue){
												window.location.href = '/' + audienceValue + '/';
											}else{
												window.location.reload();
											}
										},
										error: function (xhr, textStatus, errorThrown) {
											// todo: fails
										}
									});
								}
							},
							error: function (xhr, textStatus, errorThrown) {
								// todo: fails
							}
						});
					},
					error: function (xhr, textStatus, errorThrown) {
						// todo: fails
					}
				});
			}else if(region['event'] === 'refine'){
				alert('County Challenge');
			}else{
				if (region['data'] === 'region_issue'){
					resizeHero('expand', 'region_issue');
				}
				if (region['data'] === 'wrong_brand'){
					resizeHero('expand', 'wrong_brand');
				}
			}
		});
	}
}

function resizeHero(type, message){
	if (typeof(message) !== 'undefined'){
		switch (message) {
			case 'invalid':
				var htmlInject = '<span><h4>Error!</h4>You must enter a zipcode to use this form.</span>';
				break;
			case 'region_issue':
				var htmlInject = '<span>We do not offer health insurance plans to residents of the zip code you entered. You can find a Blue Cross and Blue Shield company near you at <a href="http://www.bcbs.com"><span class="alert-error">www.bcbs.com</span></a></span>';
				break;
			case 'wrong_brand':
				var htmlInject = '<span>We do not offer health insurance plans to residents of the zip code you entered. You can find a Blue Cross and Blue Shield company near you at <a href="http://www.bcbs.com"><span class="alert-error">www.bcbs.com</span></a></span>';
				break;
		}
	}
	if (type === 'expand'){
		if (!$('#zip-personalize').hasClass('invalid')){
			$('#zip-personalize').addClass('invalid');
			$('#audience_dropdown_alert').html('<div class="alert alert-error right article" id="hero_error"><span class="fs1" aria-hidden="true" data-icon="2" style="float:left;margin-right:20px;"></span><button type="button" class="close" data-dismiss="alert">&#215;</button>'+ htmlInject);
			$('#hero_error .close').click(function(e){
				resizeHero('contract');
			});
			$('#js-hero-dropdowns').height($('#js-hero-dropdowns').height() + 76);
		}
	}else{
		if ($('#zip-personalize').hasClass('invalid')){
			$('#zip-personalize').removeClass('invalid');
			$('#audience_dropdown_alert').html('');
			$('#js-hero-dropdowns').height($('#js-hero-dropdowns').height() - 76);
		}
	}
}

/*######################################################################
#	Temporary FUNCTIONS END
######################################################################*/


/*######################################################################
#	Temporary FUNCTIONS START
#
#	@CONTENTS
#		print_r();
#		validateRequired();
#
######################################################################*/



/*######################################################################
#	Temporary FUNCTIONS END
######################################################################*/
