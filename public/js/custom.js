$(".get-button").on('click', function() {
  console.log("the jquery file has been acknowledge");
  $.post('/getbook/get-book', function(data) {
    console.log('Get book request is finished');
    $(".get-button").text('Book sponsored!');
  });
});
