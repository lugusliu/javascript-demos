;$(function() {
    'use strict';

    var sidebar = $('#sidebar'),
        mask = $('.mask'),
        sidebar_trigger = $('.sidebar-trigger'),
        backButton = $('.back-to-top');

    function showSideBar() {
        mask.fadeIn();
        sidebar.css('right', 0);
    }

    function hideSideBar() {
        mask.fadeOut();
        sidebar.css('right', -sidebar.width());
    }

    function backToTop () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    }

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > $(window).height())
            backButton.fadeIn();
        else
            backButton.fadeOut();
    });

    $(window).trigger('scroll');

    sidebar_trigger.on('click', showSideBar);
    mask.on('click', hideSideBar);
    backButton.on('click', backToTop);
})