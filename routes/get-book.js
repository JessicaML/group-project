const express = require('express'),
     db = require('../models'),
     router = express.Router();




//post get book data

app.post('/get-book', (request, response) => {
  likeCount = likeCount + 1;

  var likeCountJSONString = JSON.stringify({ likes: likeCount });

  response.json(likeCountJSONString);

  fs.writeFile('likes.json', likeCountJSONString , function() {
    console.log('new likes data written to likes.json');
  });
});

module.exports = router;
