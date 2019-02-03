$(document).ready(function() {
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
}); 