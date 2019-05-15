/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

$(document).ready(function () {

  function createTweetElement(tweetObject) {
    let $output = $("<article>").addClass("tweet");
    $output.append(
      $("<header>").append(
        $("<div>", {class: "header-wrap"}).append(
          $("<img src = https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png>"
          ),
          $("<div>", {class: "account-info"}).append(
            $("<h2>").text(
              "Spongebob Squarepants"),
            $("<p>", {class: "twitter-handle"}).text(
              "@TheRealSponge")
          )
        )
      ),
      $("<p>", {class: "content"}).text(
        "If I have seen further it is by standing on the shoulders of giants"
      ),
      $("<footer>").append(
        $("<p>").text(
          " 10 days ago "
        ),
        $("<div>", {class: "icons"}).append(
          $("<i>", {class: "fas fa-retweet"}),
          $("<i>", {class: "fas fa-retweet"}),
          $("<i>", {class: "fas fa-retweet"})
        )
      )
    )
    // console.log($output[0])\
    return $output[0];
  }

var $tweet = createTweetElement(tweetData);
console.log($tweet)
$('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
console.log($('.tweet-container'))

});


// <section class ="tweet-container">
//   <article class="tweet">
//     <header>
//       <div class = "header-wrap">
//         <img src="https://vignette.wikia.nocookie.net/spongebob/images/2/2a/SpongeBob_SquarePants%28copy%290.png/">
//         <div class = "account-info">
//           <h2> Spongebob Squarepants </h2>
//           <p class = "twitter-handle"> @TheRealSponge </p>
//         </div>
//       </div>
//     </header>
//     <p class="content"> This is a fake tweet. Filler text used to fill space. I'm not using an H1. Dan is not 39. </p>
//     <footer>
//       <p> 10 days ago </p>
//       <div class="icons">
//         <i class="fas fa-retweet"></i>
//         <i class="fas fa-flag"></i>
//         <i class="fas fa-heart"></i>
//       </div>
//     </footer>
//   </article>
// </section>







// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like