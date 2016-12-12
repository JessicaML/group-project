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
    console.log("create book beginning");
    console.log("reader id");
    console.log(req.body);
    console.log("book id");
    console.log(req.body.BookId);
    where: {
      BookId: req.body.BookId
      ReaderId: req.body.ReaderId
    }
    res.redirect('/');
    console.log("data posted");
  }).catch((error) => {
    res.redirect('/');
  });
});

module.exports = router;
