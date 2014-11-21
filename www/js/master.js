$(document).ready(function() {

    // Smooth Scroll
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 500);
                    return false;
                }
            }
        });
    });

    //ScrolSpy

    //Sliding Nav Active Highlight
    $('body').on('activate.bs.scrollspy', function(e) {
        var a = e.target.childNodes[0].hash;
        var ln = '.sidebar-offcanvas [href=' + a + ']';
        $('.sidebar-offcanvas a').each(function() {
            var $this = $(this);
            if (this.hash == a) {
                $this.addClass('active');
            } else {
                $this.removeClass('active');
            }
        });
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
    lastmod = document.lastModified; // get string of last modified date
    lastmoddate = Date.parse(lastmod); // convert modified string to date
    modMoment = moment.utc(lastmod, "MM-DD-YYYY HH:mm:ss").subtract('second', 70).fromNow();
    if (lastmoddate === 0) { // unknown date (or January 1, 1970 GMT)
        document.writeln("Last Modified: Unknown");
    } else {
        $('#momentupdate').html(modMoment);
    }

    // Resume Question Toggle
    var alerts = $('#resumePrompt .alert');
    $(alerts[1]).hide();
    $(alerts[2]).hide();
    $('#resumePrompt .alert-warning span').hide();
    $('#resumePrompt .alert.first').show();
    $('#resumePrompt .btn-warning').mouseover(function() {
        $(alerts).hide();
        $(alerts[1]).show();
    }).on('click', function() {
        $('#resumePrompt .alert-warning span').show('slow');
    });
    $('#resumePrompt .btn-primary').mousedown(function() {
        $(alerts).hide();
        $(alerts[2]).show();
        $('#resumePrompt .alert-warning span').hide();
    });

    $('#resumePrompt .btn-group').click(function() {
        $('#resumePrompt .btn-group .btn').toggleClass('disabled');
        $('.resumeHide').toggleClass('hidden');
    });


    $('#expPills a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $('#expSelect')
        .change(function() {
            $("select option:selected").each(function() {
                var str = "";
                var targ = $(this).attr('data-target');
                str = '#expPills a[href="' + targ + '"]';
                $(str).click();
            });
        })
        .trigger("change");

    // Tag Cloud
    $.fn.tagcloud.defaults = {
        size: {
            start: 0.9,
            end: 1.15,
            unit: 'em'
        },
        color: {
            start: '#AFC3D5',
            end: '#8299AB'
        }
    };

    $(function() {
        $('#skills #tagcloud a').tagcloud().css('padding-right', '5px');
    });

    // Fancybox
    var images = {
        1: [{
                href: 'img/me.png',
                title: 'I still think I look good here.'
            }, {
                href: 'img/cz_knit.jpg',
                title: 'Self Portrait. Sinister.'
            }, {
                href: 'img/cz_link.jpg',
                title: 'Hey Listen!'
            }, {
                href: 'img/cz_fire.jpg',
                title: "I'm a hot commodity."
            }, {
                href: 'img/cz_mom.jpg',
                title: 'Family commitment'
            }, {
                href: 'img/cz_apples.jpg',
                title: "I can't wait to be this happy to go to work."
            }
            /*, {
                        href: 'img/pants-rip.gif',
                        title: "I can't wait to be this happy to go to work."
                    }*/
        ],
        2: [{
            href: '/media/Corey_Zev_Holland-resume.pdf',
            title: 'Resume'
        }, {
            href: 'http://fancyapps.com/fancybox/demo/5_b.jpg',
            title: 'Gallery 2 - 2'
        }]
    };

    $("#profphoto").mouseup(function() {

        $.fancybox.open(images[1], {
            nextEffect: 'none',
            prevEffect: 'none',
            loop: false,
            nextClick: true,
            padding: 0,
            helpers: {
                thumbs: {
                    width: 50,
                    height: 50
                }
            }
        });

        return false;
    });

    $(".openPDF").fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        iframe: {
            preload: false
        },
        afterLoad: function() {
            this.title = '<a class="btn btn-success" href="' + this.href + '">Download &raquo;</a> ' + this.title;
        },
        wrapCSS: 'PDFviewer',
        fitToView: true,
        height: '100%',
        padding: 0
    });

    function mailto_ex(mailto, subject, body, client, form) {
        // init
        var email = {};

        // default parameters (system mail: Outlook, Thunderbird, etc.)
        email['url'] = 'mailto:' + mailto + '?subject=' + subject + '&body=' + body;
        email['width'] = 0;
        email['height'] = 0;
        email['scrollbars'] = 0;

        // constuct client-specific parameters
        switch (client) {
            case 'gmail':
                email['url'] = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&source=mailto&shva=1&to=' + mailto + '&su=' + subject + '&body=' + body;
                email['width'] = 700;
                email['height'] = 500;
                email['scrollbars'] = 1;
                break;
            case 'hotmail':
                email['url'] = 'http://mail.live.com/?rru=compose&to=' + mailto + '&subject=' + subject + '&body=' + body;
                email['width'] = 850;
                email['height'] = 550;
                email['scrollbars'] = 1;
                break;
            case 'yahoo':
                email['url'] = 'http://compose.mail.yahoo.com?to=' + mailto + '&subject=' + subject + '&body=' + body;
                email['width'] = 750;
                email['height'] = 625;
                email['scrollbars'] = 1;
                break;
        }

        // prep for popup
        var wdw_name = 'Send Corey Zev a message';
        var wdw_features = "scrollbars=" + email['scrollbars'] + ",status=0,toolbar=0,location=0,directories=0,menubar=0,resizable=1,width=";
        var url = email['url'];
        var width = email['width'];
        var height = email['height'];
        var scrollbars = email['scrollbars'];

        // determine if display should be a popup window
        if (email['width']) {
            window.open(url, 'wdw_name', wdw_features + width + ",height=" + height);
            return false;
        } else {
            document.location.href = url;
        }

    }

    $("#contact-form input, #contact-form textarea")
        .on("keyup", function(e) {
            var formField = e.target;
            if ($(formField).val() !== "") {
                $(formField).closest(".form-group").removeClass("has-error");
            }
        })
        .on("blur", function(e) {
            var formField = e.target;
            if ($(formField).val() === "") {
                $(formField).closest(".form-group").addClass("has-error");
            }
        });

    $("#contact-form .act-send").on("click", function(e) {

        e.preventDefault();
        var theForm = $(e.target).closest("form")[0];
        var elms = theForm.elements;

        var errorCt = 0;
        for (var i = 0; i < 4; i++) {
            if (!elms[i].value) {
                errorCt += 1;
                $(elms[i]).closest(".form-group").addClass("has-error");
            }
        }
        if (errorCt) {
            alert("Please complete all fields.");
            return false;
        }

        var cForm = {};
        cForm.subject = encodeURI(elms.subjectTitle.value + ' - from ' + elms.firstName.value + ' ' + elms.lastName.value);
        cForm.mailTo = 'czwolf@gmail.com';
        cForm.body = encodeURI(elms.message.value);

        if ($(e.target).hasClass("act-send-gmail")) {
            cForm.client = "gmail";
        } else if ($(e.target).hasClass("act-send-yahoo")) {
            cForm.client = "yahoo";
        } else if ($(e.target).hasClass("act-send-hotmail")) {
            cForm.client = "hotmail";
        } else {
            cForm.client = "default";
        }

        mailto_ex(cForm.mailTo, cForm.subject, cForm.body, cForm.client, theForm);

    });

});
