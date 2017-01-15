const express = require('express'),
     db = require('../models'),
     router = express.Router(),
     bodyParser = require('body-parser');


router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: false}));


//post get book data

//add get to db

router.post('/get-book', (req, res) => {
  db.Gotbook.create(req.body).then((gotbook) => {
    req.body.book = gotbook;
  }).then((gotbook) => {
      res.redirect('/books/'+ req.body.bookSlug);
    console.log("data posted");
  }).catch((error, gotbook) => {
    console.log("error happened");
    res.redirect('/books/'+ req.body.bookSlug);
  });
});



module.exports = router;
