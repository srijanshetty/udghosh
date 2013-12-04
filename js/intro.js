(function ($, window, document, undefined) {
    "use strict";

    // variable declaration
    var $text = $('#text'),
        $logo = $('#logo'),
        $container = $('#logo-container'),
        $currentTab = $('#home'),
        currentTab = 'home',
        $header = $('#header'),
        $footer = $('#footer'),
        $home = $('#home'),
        $sideNav = $('#side-navigation'),
        $iframe = $('#event-iframe'),
        $eventName = $('#event-names-content'),
        $specialTab = false;

    // starting the siteUp
    function startSite() {
        $('body').css({
            'background': 'url("images/DSC_0044.JPG") no-repeat',
            'background-size': 'cover'
        });
        $logo.fadeOut(1500, function () {
            $container.hide();
            $header.addClass('visible');
            $footer.addClass('visible');
            $sideNav.css('visibility', 'visible');
            $home.show();
        });
    }

    // The animation for the logo in the introduction
    function logoFade() {
        $text.fadeIn(1500).delay(700).fadeOut(300, function () {
            $text.text('live.');
        })
            .fadeIn(1000).delay(700).fadeOut(300, function () {
                $text.text('play.');
            })
                .fadeIn(1000).delay(700).fadeOut(300, function () {
                    $text.text('enter');
                })
                    .fadeIn(1000);
    }

    $logo.fadeIn(1000);
    $(document).ready(function () {
        // Show the animation for brethe. live. play.
        if(sessionStorage.getItem('loaded')){
            startSite();
        } else {
            logoFade();
            // Display the main content of the website on click of the text
            $text.on('click', function () {
                if ($(this).text() === 'enter') {
                    $text.hide();
                    startSite();
                }
            });
        }
        sessionStorage.setItem('loaded', true);
    });

    // Events
    // Display the contents of the section container on click of the anchor tags
    $('.jump').on('click', function () {
        $currentTab.hide();
         if ($specialTab) {
            $specialTab.getNiceScroll().remove();
            $specialTab = false;
        }
        $('#' + currentTab + '-content').getNiceScroll().remove();
        var id = $(this).data('id');
        currentTab = id;
        $currentTab = $('#' + id).fadeIn(700);
        if (id === 'events') {
            $eventName.niceScroll({
                cursorwidth: '5px',
                autohidemode: false,
                cursoropacitymin: 1,
                cursoropacitymax: 1,
            });
            $specialTab = $eventName;
        } else {
            $specialTab = false;
        }

        $('#' + id + '-content').niceScroll({
            cursorwidth: '5px',
            autohidemode: false,
            cursoropacitymin: 1,
            cursoropacitymax: 1,
        });
    });

    $('.iframe-jump').on('click', function () {
        $iframe.attr('src', $(this).data('location'));
    });

    $('.close').on('click', function () {
        if ($specialTab) {
            $specialTab.getNiceScroll().remove();
            $specialTab = false;
        }
        $currentTab.hide();
        $('#' + currentTab + '-content').getNiceScroll().remove();
        $currentTab = $home.fadeIn(700);
        currentTab = 'home';
    });

}(jQuery, window, document));

function newTab (element) {
    window.open($(element).data('location'));
}
