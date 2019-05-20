$(document).ready(function () {

  function dateCalculator (createdAt) {
    let output;
    let difference = Date.now() - createdAt
    if (difference >= 31557600000) {
      output = "Over a year ago"
      return output;
    } else if (difference >= 2592000000 && difference < 31557600000) {
      output = Math.floor(difference/1000/60/60/24/30)
      return output + (output > 1? " months ago" : " month ago")
    } else if (difference >= 86400000 && difference < 2592000000) {
      output = Math.floor(difference/1000/60/60/24)
      return output + (output > 1? " days ago" : " day ago")
    } else if (difference >= 3600000 && difference < 864000000) {
      output = Math.floor(difference/1000/60/60)
      return output + (output > 1? " hours ago" : " hour ago")
    } else if (difference >= 60000 && difference < 3600000) {
      output = Math.floor(difference/1000/60)
      return output + (output > 1? " minutes ago" : " minute ago")
      output = Math.floor(difference/1000)
      return output + (output > 1? " seconds ago" : " second ago")
    } else {
      return "Just now"
    }
  }

  // Prevents the program from reading client input in the textbox as script
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Creates the structure of a tweet using provided user informaiton
  function createTweetElement(tweetObject) {
    let $output =
      $(`<article class="tweet">
        <header>
          <div class = "header-wrap">
            <img src="${tweetObject['user']['avatars']['regular']}">
            <div class = "account-info">
              <h2> ${tweetObject['user']['name']} </h2>
              <p class = "twitter-handle"> ${tweetObject['user']['handle']} </p>
            </div>
          </div>
        </header>
        <p class="content"> ${escape(tweetObject['content']['text'])}</p>
        <footer>
          <p> ${dateCalculator(tweetObject['created_at'])} </p>
          <p class="likes-count"> ${tweetObject['likes']}</p>
          <div class="icons">
            <i class="fas fa-heart likebutton" data-objectid="${tweetObject['_id']}"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-flag"></i>
          </div>
        </footer>
      </article>`)
    return $output;
  }

  // Loops through array of tweets from database and loads each tweet in front-end.
  function renderTweets(tweetArray) {
    for (let i = 0; i < tweetArray.length; i++) {
      let $tweet = createTweetElement(tweetArray[i]);
      $('.tweet-container').prepend($tweet)

      // Implements like button functionality on each tweet
      $tweet.find('.likebutton').click(function (event) {
        event.preventDefault();

        // Passes tweet object identifer to routes via endpoint. Updates like count
        // of the object on success.
        $.ajax({
          url: `/tweets/likes/${$(this).data("objectid")}`,
          method: "POST",
          success: function (result) {
            $tweet.find('.likes-count').html(result)
          }

        })
      })
    }
  }

  // Routing to lodge tweets on page load
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

  // Function call to load tweets on page
  loadTweets();

  // Displays error messages for empty tweets and tweets over word limit
  $(".error .length").hide();
  $(".error .null").hide();
  $(".container form").submit(function (event) {
    event.preventDefault();
    if (!$(".error .length").is("hidden")) {
      $(".error .length").slideUp();
    }
    if (!$(".error .null").is("hidden")) {
      $(".error .null").slideUp();
    }
    if ($(".container textarea").val().length > 140) {
      $(".error .length").slideDown();
      return;
    } else if (!$(".container textarea").val()) {
      $(".error .null").slideDown();
      return;
    }

    // Routing to post a new tweet
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

  // Hide the compose tweet panel by default, slide down when compose is clicked
  $(".new-tweet").hide();
  $("#nav-bar .compose").click(function (event) {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown();
      $(".new-tweet textarea").focus();
      $(".new-tweet textarea").select();
    } else {
      $(".new-tweet").slideUp();
    }
  })

});
