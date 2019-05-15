$(document).ready(function () {

  function dateCalculator (createdAt) {
    let postingDay = createdAt
    let today = new Date().getTime()
    let difference = today - postingDay
    let output = difference
    return output;
  }

  function renderTweets() {
    $('.tweet-container').empty();
    $.ajax({
      type: "GET",
      url: "/tweets"
    }).done(function(tweetArray) {
      for (let i = 0; i < tweetArray.length; i++) {
        let $tweet = createTweetElement(tweetArray[i]);
        $('.tweet-container').prepend($tweet);
      }
    })
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

  renderTweets();

  // Using Ajax to make post request and re-rendering the tweets on the page.
  $(".container form").submit(function (event) {
    event.preventDefault();
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize(),
    })
    .then(function () {
      renderTweets();
    });
  });

});
