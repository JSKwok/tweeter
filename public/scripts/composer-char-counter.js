$(document).ready(function() {
  $('textarea').on("input", function() {
    const charsLeft = 140 - $(this).val().length;
    $(this).siblings().text(charsLeft);
    if (charsLeft < 0) {
      $(this).siblings(".counter").css("color", "#ff0000")
    } else {
      $(this).siblings(".counter").css("color", "")
    }
  });
});