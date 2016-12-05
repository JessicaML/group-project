$(".get-button").on('click', function() {
  $.post('/get-book', function(data) {
    console.log('Get book request is finished');
    $(".get-button").text('Sponsor count: ' + db.Book.gets);
  });
});
