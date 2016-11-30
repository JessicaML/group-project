var express = require('express'),
    db = require('../models'),
    bodyParser = require('body-parser'),
    router = express.Router();

    router.use(bodyParser.urlencoded({ extended: false}));



//post sponsor login

router.post('/login-sponsor', (req, res) => {
  console.log("does this bit work??");
  db.Sponsor.findOne({
    where: {
      email: req.body.email
    }
  }).then((sponsorInDB) => {
    if (sponsorInDB.password === req.body.password) {
      req.session.sponsor = sponsorInDB;
      res.redirect('/');
    } else {
      res.redirect('/login-sponsor');
    }
  }).catch(() => {
    res.redirect('/login-sponsor');
  });
});

//post reader login


router.post('/login-reader', (req, res) => {
  console.log("does this bit work??");

  db.Reader.findOne({
    where: {
      email: req.body.email
    }
  }).then((readerInDB) => {
    if (readerInDB.password === req.body.password) {
      req.session.user = readerInDB;
      res.redirect('/admin');
    } else {
      res.redirect('/login-reader');
    }
  }).catch(() => {
    res.redirect('/login-reader');
  });
});


//log out

router.get('/logout', (req, res) => {
  req.session.sponsor = undefined;
  req.session.reader = undefined;
  res.redirect('/');
});

module.exports = router;
