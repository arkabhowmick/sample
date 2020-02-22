$(document).ready(function() {
    adjustCharacterWidth();
    adjustSpeechBubbleWidth();
    adjustSpeechBubblePosition();
    var bubbleMoveFlag = true;
    $('#home').find('.speech-bubble-container').on('click', function() {
        if(bubbleMoveFlag) {
            bubbleMoveFlag = false;
            $('#home').find('.speech-bubble').addClass('speech-bubble-animation');
            setTimeout(function() {
                bubbleMoveFlag = true;
                $('#home').find('.speech-bubble').removeClass('speech-bubble-animation');
            }, 1000);
        }


        // var oldNode = $('#home').find('.speech-bubble');
        // var newNode = $('#home').find('.speech-bubble').clone(true);
        // oldNode.replaceWith(newNode);
        // newNode.addClass('speech-bubble-animation');
    });
    $(window).resize(function() {
        adjustCharacterWidth();
        adjustSpeechBubbleWidth();
        adjustSpeechBubblePosition();
    });

    function adjustCharacterWidth() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        if(windowHeight < windowWidth) {
            $('.character-container').width(windowHeight);
        }
        else {
            $('.character-container').width(windowWidth);
        }
    }

    function adjustSpeechBubbleWidth() {
        var characterWidth = $('.character-container').width();
        $('.speech-bubble-container').width((characterWidth*(2/3)) + 'px');
    }

    function adjustSpeechBubblePosition() {
        var speechBubbleWidth = $('.speech-bubble-container').width();
        console.log('Width : ', speechBubbleWidth);
        $('.speech-bubble-container').css('left', '-' + (speechBubbleWidth/2) + 'px');
    }
}); 