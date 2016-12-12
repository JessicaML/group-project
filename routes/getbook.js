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
    req.session.reader.id = Gotbook.ReaderId;
    req.body.BookId = Gotbook.BookId;
    res.redirect('/');
  }).catch((error) => {
    res.redirect('/');
  });
});

module.exports = router;
