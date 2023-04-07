//responsible for character counter of tweet input form
$(document).ready(function() {
  //used keydown to better track counter without having to lift key
  $('#tweet-text').on('input', function() {

    //establish max/min & current count/remaining characters
    const maxCount = 140;
    const minCount = 0;
    const currentCount = $(this).val().length;
    const remainingLetters = maxCount - currentCount;

    //Connect to the elements child with the counter
    const counterElement = $(this).parent().children('.tweet-submit-counter').children('.counter');
    
    //Make the counter red for negative numbers
    counterElement.text(remainingLetters);
    if (remainingLetters < minCount) {
      counterElement.css('color', 'red');
    } else {
      counterElement.css('color', 'black');
      //error slide up
      $('div.error')
        .text('')
        .slideUp();
    }
  });
});