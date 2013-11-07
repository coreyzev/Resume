$(document).ready(function() {

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
  });

});