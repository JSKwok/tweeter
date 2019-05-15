$(document).ready(function () {

  function dateCalculator (createdAt) {
    let postingDay = createdAt
    let today = new Date().getTime()
    let difference = today - postingDay
    let output = difference
    return output;
  }

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method : "GET",
      success: function (result) {
        $('.tweet-container').empty();
        renderTweets(result);
      }
    })
  }

  function renderTweets(tweetArray) {
    for (let i = 0; i < tweetArray.length; i++) {
      let $tweet = createTweetElement(tweetArray[i]);
      $('.tweet-container').prepend($tweet);
    }
  }

  function createTweetElement(tweetObject) {
    let $output =
      `<article class="tweet">
        <header>
          <div class = "header-wrap">
            <img src="${tweetObject['user']['avatars']['regular']}">
            <div class = "account-info">
              <h2> ${tweetObject['user']['name']} </h2>
              <p class = "twitter-handle"> ${tweetObject['user']['handle']} </p>
            </div>
          </div>
        </header>
        <p class="content"> ${tweetObject['content']['text']}</p>
        <footer>
          <p> ${dateCalculator(tweetObject['created_at'])} milliseconds ago </p>
          <div class="icons">
            <i class="fas fa-heart"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-flag"></i>
          </div>
        </footer>
      </article>`
    return $output;
  }

  loadTweets();

  // Using Ajax to make post request and re-rendering the tweets on the page.
  $(".container form").submit(function (event) {
    event.preventDefault();
    console.log($(".container textarea").val().length)
    if ($(".container textarea").val().length > 140) {
      alert("Tweet is too long.")
      return;
    } else if (!$(".container textarea").val().length) {
      alert("Tweet field is blank.")
      return;
    }
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize(),
      success: function () {
        $(".container form")[0].reset();
        $(".container .counter").text(140);
        loadTweets();
      }
    });
  });

});
