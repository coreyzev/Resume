$(document).ready(function() {

  // Smooth Scroll
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });

  // Initialize Tooltips
  $('[data-toggle=tooltip]').tooltip();

  // Sliding Navigation
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
    $('#overlay').toggleClass('active');
    $('[data-toggle=offcanvas]').blur();
  });

  $('.sidebar-offcanvas a, #overlay').click(function() {
    $('.row-offcanvas').removeClass('active');
    $('#overlay').toggleClass('active');
  });

  // Updated Time
  lastmod = document.lastModified;     // get string of last modified date
  lastmoddate = Date.parse(lastmod);   // convert modified string to date
  modMoment = moment.utc(lastmod, "MM-DD-YYYY HH:mm:ss").subtract('second',70).fromNow();
  if (lastmoddate == 0) {               // unknown date (or January 1, 1970 GMT)
    document.writeln("Last Modified: Unknown")
  } else {
     $('#momentupdate').html(modMoment);
  };

  // Resume Question Toggle
  var alerts = $('#resumePrompt .alert');
  $(alerts[1]).hide();
  $(alerts[2]).hide();
  $('#resumePrompt .alert-warning span').hide();
  $('#resumePrompt .alert.first').show();
  $('#resumePrompt .btn-warning').mouseover(function() {
    $(alerts).hide();
    $(alerts[1]).show();
  }).on('click', function(){
    $('#resumePrompt .alert-warning span').show('slow');
  });
  $('#resumePrompt .btn-primary').mousedown(function() {
    $(alerts).hide();
    $(alerts[2]).show();
    $('#resumePrompt .alert-warning span').hide();
  });

  $('#resumePrompt .btn-group').click(function(){
    $('#resumePrompt .btn-group .btn').toggleClass('disabled');
    $('.resumeHide').toggleClass('hidden');
  });


  $('#expPills a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  });

  $( '#expSelect' )
    .change(function() {
      $( "select option:selected" ).each(function() {
        var str = "";
        var targ = $(this).attr('data-target');
        str = '#expPills a[href="' + targ + '"]'
        $(str).click();
      });
    })
    .trigger( "change" );

  // Tag Cloud
  $.fn.tagcloud.defaults = {
    size: {start: 10, end: 14, unit: 'px'},
    color: {start: '#CDDFEE', end: '#8299AB'}
  };

  $(function () {
    $('#skills #tagcloud a').tagcloud().css('padding-right', '5px');;
  });


});