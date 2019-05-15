$(document).ready(function () {
  // console.log($("article.tweet")[0]);
  $("article.tweet").hover(
    function () {
    $(this).css("opacity", 1.0)
    $(".icons").css("opacity", 1.0)
    }, function () {
    $(this).css("opacity", 0.5)
    $(".icons").css("opacity", 0)
    }
  );
});