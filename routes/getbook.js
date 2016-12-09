const express = require('express'),
     db = require('../models'),
     router = express.Router();


router.use(express.static('public'));

//post get book data

//add get to db

console.log('is anyone even listening to this route?');

router.post('/get-book', (req, res) => {
  console.log('did get-book post happen?');
  console.log(req.session.reader.id);
  console.log(req.params);
  console.log(req.params[0]);

  db.Gotbook.create(req.body).then((Gotbook) => {
    req.session.reader.id = Gotbook.ReaderId;
    req.params.id = Gotbook.BookId;
    res.redirect('/books/my-profile');
    console.log('posted that sweet book honey');
  }).catch((error) => {
    res.redirect('/');
  });
});

module.exports = router;
