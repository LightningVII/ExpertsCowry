$(function() {
    $('#fullpage').fullpage({
        verticalCentered: false,

        //to avoid problems with css3 transforms and fixed elements in Chrome, as detailed here: https://github.com/alvarotrigo/fullPage.js/issues/208
        css3: false,
        navigation: true,
        navigationPosition: 'right',

        'afterLoad': function(anchorLink, index) {
            if (index == 2) {
                $('#slide1 h1').removeClass('moveUp').addClass('active');
            }
            if (index == 3) {
                //alert(index);
                $('.section').eq(index - 1).removeClass('moveDown').addClass('moveUp');
            }
        },

        'onLeave': function(index, nextIndex, direction) {
            if (index == 3 && direction == 'down') {
                $('.section').eq(index - 1).removeClass('moveUp').addClass('moveDown');
            } else if (index == 3 && direction == 'up') {
                $('.section').eq(index - 1).removeClass('moveUp').addClass('moveDown');
            }
/*
            $('#staticImg').toggleClass('active', (index == 2 && direction == 'down') || (index == 4 && direction == 'up'));
            $('#staticImg').toggleClass('moveDown', nextIndex == 4);
            $('#staticImg').toggleClass('moveUp', index == 4 && direction == 'up');*/
        }
    });
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
});
