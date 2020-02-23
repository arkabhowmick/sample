$(document).ready(function() {
    new fullpage('#fullpage', {
        autoScrolling:false,
        // scrollHorizontally: true
    });
    // new Glider(document.querySelector('.glider'), {
    //     slidesToShow: 1,
    //     dots: '#dots',
    //     draggable: true,
    //     arrows: {
    //       prev: '.glider-prev',
    //       next: '.glider-next'
    //     }
    // });
    // $('#intro-texts').tinycarousel();
    // //methods
    // fullpage_api.setAllowScrolling(false);
    $('#intro-texts').slick({
        arrows : false,
        dots : false,
        // focusOnSelect: false,
        infinite : true,
        autoplay: true,
        autoplaySpeed: 2000,
        // dots: true,
        // infinite: true,
        // speed: 300,
        // slidesToShow: 1
    });
});