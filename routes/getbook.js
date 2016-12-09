const express = require('express'),
     db = require('../models'),
     router = express.Router(),
     bodyParser = require('body-parser');


router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: false}));


router.post('/get-book', (req, res) => {
  db.Gotbook.create(req.body).then((Gotbook) => {
    req.session.reader.id = Gotbook.ReaderId;
    req.body.BookId = Gotbook.BookId;
    res.render('/books/show', { reader: req.session.reader, book: book });
  }).catch((error) => {
    res.redirect('/books/:slug', { reader: req.session.reader, book: book });
  });
});

module.exports = router;
