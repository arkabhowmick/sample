$(document).ready(function() {
    adjustCharacterWidth();
    setTimeout(function () {
        adjustSpeechBubbleWidthAndPosition();
    },200);
    // adjustSpeechBubbleWidth();
    // adjustSpeechBubblePosition();
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
        // adjustSpeechBubbleWidth();
        // adjustSpeechBubblePosition();
        adjustSpeechBubbleWidthAndPosition();
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

    function adjustSpeechBubbleWidthAndPosition() {
        var character = $('#character-home');
        var speechBubble = $('.speech-bubble-container');
        var characterWidth = character.width();
        var standardSpeechBubbleWidth = characterWidth * 2 / 3;
        var spaceLeft = character.offset().left + 0.4 * characterWidth;
        var spaceTop = character.offset().top;
        console.log('SPacee Left : ', spaceLeft);
        console.log('standardSpeechBubbleWidth : ', standardSpeechBubbleWidth);
        console.log('SPace Top : ', spaceTop);
        // /* If Space is there to accomodate speech bubble on the left */
        if(spaceLeft >= standardSpeechBubbleWidth){
            console.log('1');
            speechBubble.width(standardSpeechBubbleWidth + 'px');
            speechBubble.height(speechBubble.find('.speech-bubble-2').height() || speechBubble.find('.speech-bubble-3').height());
            speechBubble.css('top', '70px');
            speechBubble.css('left', '-' + (speechBubble.width() - characterWidth*0.4) + 'px');
        }
        // /* Else if space is not there on the left but space is there on the top */
        else if(spaceLeft < standardSpeechBubbleWidth && spaceTop > character.height() / 2) {
            console.log('2');
            speechBubble.width(characterWidth/2 + 'px');
            speechBubble.height(speechBubble.find('.speech-bubble-2').height() || speechBubble.find('.speech-bubble-3').height());
            speechBubble.css('left', '0px');
            speechBubble.css('top', $(window).height() - character.height() - speechBubble.height() + 'px');
        }
        // /* Else if neither space is available on the left not space is available on the top */
        else {
            console.log('3');
            speechBubble.width(spaceLeft + 'px');
            speechBubble.height(speechBubble.find('.speech-bubble-2').height() || speechBubble.find('.speech-bubble-3').height());
            speechBubble.css('left', '-' + Math.round(speechBubble.width() - (characterWidth * 0.4)) + 'px');
            speechBubble.css('top', '70px');
        }
    }

    function adjustSpeechBubbleWidth() {
        var characterWidth = $('#character-home').width();
        var speechBubbleWidth = (characterWidth*2/3);
        var position = $('#character-home').offset();
        if(position.left + (characterWidth/2) < speechBubbleWidth) {
            speechBubbleWidth = position.left + (characterWidth/2);
        }
        $('.speech-bubble-container').width(speechBubbleWidth + 'px');
    }

    function adjustSpeechBubblePosition() {
        var speechBubbleWidth = $('.speech-bubble-container').width();
        var position = $('#character-home').offset();
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var characterHeight = $('#character-home').height();
        var speechBubblePositionX = $('.speech-bubble-container').offset().left;

        if(windowWidth > 1024) {
            $('.speech-bubble-container').css('left', '-' + (speechBubbleWidth/3) + 'px');
        }
        else {
            $('.speech-bubble-container').css('left', '0px');
        }
        if(windowHeight - characterHeight > characterHeight/2) {
            $('.speech-bubble-container').css('bottom', characterHeight + 'px');
            $('.speech-bubble-container').css('top', 'auto'); 
        }
        else {
            $('.speech-bubble-container').css('top', '70px'); 
            $('.speech-bubble-container').css('bottom', 'auto'); 
        }
        if(speechBubblePositionX < 1) {
            $('.speech-bubble-container').css('left', '30px');
        }
    }
}); 