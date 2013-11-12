$(document).ready(function() {

  // Smooth Scroll
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
       $('html,body').animate({
         scrollTop: target.offset().top
       }, 500);
       return false;
     }
   }
 })
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

  // Fancybox
  var images = {
    1: [
    {
      href : 'img/me.png',                
      title : 'I still think I look good here.'
    },
    {
      href : 'img/cz_knit.jpg',                
      title : 'Self Portrait. Sinister.'
    },
    {
      href : 'img/cz_link.jpg',                
      title : 'Hey Listen!'
    },
    {
      href : 'img/cz_fire.jpg',                
      title : "I'm a hot commodity."
    },
    {
      href : 'img/cz_mom.jpg',                
      title : 'Family commitment'
    },
    {
      href : 'img/cz_apples.jpg',                
      title : "I can't wait to be this happy to go to work."
    },
    {
      href : 'img/pants-rip.gif',                
      title : "I can't wait to be this happy to go to work."
    }
    ],
    2: [
    {
      href : 'http://www.zevdesigns.com/content/Corey_Zev_Holland-resume.pdf',                
      title : 'Resume'
    },
    {
      href : 'http://fancyapps.com/fancybox/demo/5_b.jpg',                
      title : 'Gallery 2 - 2'
    }
    ]
  };

  $("#profphoto").click(function() {

    $.fancybox.open(images[1], {
      nextEffect : 'none',
      prevEffect : 'none',
      loop       : false,
      nextClick  : true,
      padding    : 0,
      helpers    : {
        thumbs : {
          width  : 50,
          height : 50
        }
      }
    });

    return false;
  });

  $(".openPDF").fancybox({
    openEffect  : 'none',
    closeEffect : 'none',
    iframe : {
        preload: false
    },
    afterLoad: function() {
        this.title = '<a class="btn btn-success" href="' + this.href + '">Download &raquo;</a> ' + this.title;
    },
    wrapCSS : 'PDFviewer',
    fitToView : true,
    height : '100%',
    padding : 0
});

});