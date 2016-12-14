const express = require('express'),
     db = require('../models'),
     router = express.Router(),
     bodyParser = require('body-parser');


router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: false}));


//post get book data

//add get to db

console.log('is anyone even listening to this route?');

router.post('/get-book', (req, res) => {

  db.Gotbook.create(req.body).then((Gotbook) => {
    where: {
      BookId: req.body.BookId
      ReaderId: req.body.ReaderId
    }
  }).then((book) => {
    db.Book.findOne({
      where: {
        BookId: book.id
      }
    })
  }).then((gotbook) => {
      res.render('books/show', { reader: req.session.reader, gotbook: gotbook });
    console.log("data posted");
  }).catch((error, book) => {
    console.log("error happened");
    res.render('books/show', { reader: req.session.reader, book: book });
  });
});

module.exports = router;
