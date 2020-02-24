$(document).ready(function() {
    $('.about-carousel').slick({
        infinite: true,
        slidesToShow: 1,
        dots:true,
        autoplay:true,
        arrows:true
    });

    setInterval(function() {
        adjustContentHeight();
    }, 1000);

    $(window).resize(function() {
        adjustContentHeight();
    });

    function adjustContentHeight() {
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        var height = $('#about').height();
        var content = $('.about-carousel').find('.content');
        var item = $('.about-carousel').find('.item');
        if(windowHeight > windowWidth) {
            item.css('flex-direction', 'column');
            content.height(height/2);
            item.height(height);
        }
        else {
            item.css('flex-direction', 'row');
            content.height(height);
        }
    }
});