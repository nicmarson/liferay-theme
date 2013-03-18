$(function() {
  
  // Add visual toggle icons
  // $('[data-toggle="dropdown"]').append(' <b class="caret"></b>');
  // $('[data-toggle="collapse"]').append(' <b class="caret"></b>');
  $('.navbar-fixed-top div.container').prepend('<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">'+
    '<span class="icon-bar"></span>'+
    '<span class="icon-bar"></span>'+
    '<span class="icon-bar"></span>'+
  '</a>');

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
  }).append('&nbsp;<span class="glyph-external" aria-hidden="true"></span>');


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

  // Activate Tooltips
  $('.tooltip-container').tooltip({
    selector: "[rel=tooltip]"
  });

  // Reveal hidden content on preview RV
  $('a.toggle-reveal').on('click', function(){
    var parent = $(this).closest('.preview-container');
    $(parent).find('.reveal').toggleClass('hide');
    return false;
  });

  // NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
  // IT'S ALL JUST JUNK FOR OUR DOCS!
  // ++++++++++++++++++++++++++++++++++++++++++

  var $window = $(window)

  // Disable certain links in docs
  $('section [href^=#]').click(function (e) {
    e.preventDefault()
  })

  // side bar
  setTimeout(function () {
    $('.bs-docs-sidenav').affix({
      offset: {
        top: function () { return $window.width() <= 980 ? 290 : 260 }
      , bottom: 270
      }
    })
  }, 100)

  // make code pretty
  window.prettyPrint && prettyPrint()

  // add-ons
  $('.add-on :checkbox').on('click', function () {
    var $this = $(this)
      , method = $this.attr('checked') ? 'addClass' : 'removeClass'
    $(this).parents('.add-on')[method]('active')
  })

  // add tipsies to grid for scaffolding
  if ($('#gridSystem').length) {
    $('#gridSystem').tooltip({
        selector: '.show-grid > [class*="span"]'
      , title: function () { return $(this).width() + 'px' }
    })
  }

  // tooltip demo
  $('.tooltip-demo').tooltip({
    selector: "a[data-toggle=tooltip]"
  })

  $('.tooltip-test').tooltip()
  $('.popover-test').popover()

  // popover demo
  $("a[data-toggle=popover]")
    .popover()
    .click(function(e) {
      e.preventDefault()
    })

  // button state demo
  $('#fat-btn')
    .click(function () {
      var btn = $(this)
      btn.button('loading')
      setTimeout(function () {
        btn.button('reset')
      }, 3000)
    })

  // carousel demo
  $('#myCarousel').carousel()

  // javascript build logic
  var inputsComponent = $("#components.download input")
    , inputsPlugin = $("#plugins.download input")
    , inputsVariables = $("#variables.download input")

  // toggle all plugin checkboxes
  $('#components.download .toggle-all').on('click', function (e) {
    e.preventDefault()
    inputsComponent.attr('checked', !inputsComponent.is(':checked'))
  })

  $('#plugins.download .toggle-all').on('click', function (e) {
    e.preventDefault()
    inputsPlugin.attr('checked', !inputsPlugin.is(':checked'))
  })

  $('#variables.download .toggle-all').on('click', function (e) {
    e.preventDefault()
    inputsVariables.val('')
  })

  // request built javascript
  $('.download-btn .btn').on('click', function () {

    var css = $("#components.download input:checked")
          .map(function () { return this.value })
          .toArray()
      , js = $("#plugins.download input:checked")
          .map(function () { return this.value })
          .toArray()
      , vars = {}
      , img = ['glyphicons-halflings.png', 'glyphicons-halflings-white.png']

  $("#variables.download input")
    .each(function () {
      $(this).val() && (vars[ $(this).prev().text() ] = $(this).val())
    })

    $.ajax({
      type: 'POST'
    , url: /\?dev/.test(window.location) ? 'http://localhost:3000' : 'http://bootstrap.herokuapp.com'
    , dataType: 'jsonpi'
    , params: {
        js: js
      , css: css
      , vars: vars
      , img: img
    }
    })
  })

});

// Modified from the original jsonpi https://github.com/benvinegar/jquery-jsonpi
$.ajaxTransport('jsonpi', function(opts, originalOptions, jqXHR) {
  var url = opts.url;

  return {
    send: function(_, completeCallback) {
      var name = 'jQuery_iframe_' + jQuery.now()
        , iframe, form

      iframe = $('<iframe>')
        .attr('name', name)
        .appendTo('head')

      form = $('<form>')
        .attr('method', opts.type) // GET or POST
        .attr('action', url)
        .attr('target', name)

      $.each(opts.params, function(k, v) {

        $('<input>')
          .attr('type', 'hidden')
          .attr('name', k)
          .attr('value', typeof v == 'string' ? v : JSON.stringify(v))
          .appendTo(form)
      })

      form.appendTo('body').submit()
    }
  }
})
