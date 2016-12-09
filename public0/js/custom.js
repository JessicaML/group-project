$(".like-button").on('click', function() {
  $.post('/like', function(data) {
    console.log('POST request is finished');
    $(".like-button").text('LIKE COUNT: ' + JSON.parse(data).likes);
  });
});
