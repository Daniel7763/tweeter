// Fake data taken from initial-tweets.json
$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  $("#submit-tweet").submit(function(event) {
    event.preventDefault();

    //error cases
    if ($('#tweet-text').val() === '' || null) {
      return $('.error')
        .text('🙈 Nothing entered in text box. 🙈')
        .slideDown("fast","linear");
    }
    if ($('#tweet-text').val().length > 140) {
      return $('.error')
        .text('🙉 Too many characters. 🙉')
        .slideDown();
    }

    //serialize form data
    const data = $(this).serialize();
    //error slide up
    $('div.error')
      .text('')
      .slideUp();
    //send data to backend
    $.ajax({
      url:"/tweets",
      method:"POST",
      data: data,
      success:function() {
        loadTweets();
        console.log("success");
        //code to clear tweet-text field after submitting a successful tweet
        $('#tweet-text').val('');
      },
      error: function() {
        console.log("error");
      }
    });
  });

  //-----RENDER TWEETS-----
  const renderTweets = function(tweets) {
    const $container = $('#tweet-timeline');
    $container.empty();
    tweets.forEach((tweet) => {
      const tweetNode = createTweetElement(tweet);
      $container.prepend(tweetNode);
    });
  };

  //-----LOAD TWEETS-------
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log("load tweets data successfully");
        renderTweets(data);
      },
      error: function() {
        console.log("error");
      }
    });
  };

  //-----Create Tweet Element-----
  const createTweetElement = function(tweetObj) {
  
    const $tweet = $(`<article class="tweet">
  <header>
    <section class="content-header">
      <p class="avatar/handle">
        <img class="content-user-pic" src="${tweetObj.user.avatars}"/> ${tweetObj.user.name}
      </p>
      <p class="handle">
        ${tweetObj.user.handle}
      </p>
    </section>
  </header>

  <div class="content-body">
    ${escape(tweetObj.content.text)}
  </div>

  <footer>
    <section class="content-footer">
      <p class="timestamp">
        ${timeago.format(tweetObj.created_at)}
      </p>
      <p class="Options">
        <i class="icon fa-solid fa-flag"></i>
        <i class="icon fa-solid fa-retweet"></i>
        <i class="icon fa-solid fa-heart"></i>
      </p>
    </section>
  </footer>

  </article>`);

    return $tweet;
  };

  // renderTweets(data);
  loadTweets();

});