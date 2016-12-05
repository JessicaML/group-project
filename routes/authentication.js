const express = require('express'),
     db = require('../models'),
     bodyParser = require('body-parser'),
     router = express.Router(),
     bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({ extended: false}));



//post sponsor login

router.post('/login-sponsor', (req, res) => {
  db.Sponsor.findOne({
    where: {
      email: req.body.email
    }
  }).then((userInDB) => {
    bcrypt.compare(req.body.password, userInDB.passwordDigest, (error, result) => {
      if (result) {
        req.session.sponsor = userInDB;
        res.redirect('/');
      } else {
        res.render('login');
      }
    });
  }).catch((error) => {
    res.render('login');
  });
});

//post reader login

router.post('/login-reader', (req, res) => {
  db.Reader.findOne({
    where: {
      email: req.body.email
    }
  }).then((userInDB) => {
    bcrypt.compare(req.body.password, userInDB.passwordDigest, (error, result) => {
      if (result) {
        req.session.reader = userInDB;
        res.redirect('/');
      } else {
        res.render('login');
      }
    });
  }).catch((error) => {
    res.render('login');
  });
});



//posts data to create sponsor-user
router.post('/sponsors', (req, res) => {
  db.Sponsor.create(req.body).then((sponsor) => {
    req.session.sponsor = sponsor;
    res.redirect('/');
  }).catch(() => {
    res.redirect('/users/sponsor');
  });
});

//posts data to create reader-user
router.post('/readers', (req, res) => {
  db.Reader.create(req.body).then((reader) => {
    req.session.reader = reader;
    res.redirect('/');
  }).catch(() => {
    res.redirect('/users/reader');
  });
});

//log out

router.get('/logout', (req, res) => {
  req.session.sponsor = undefined;
  req.session.reader = undefined;
  res.redirect('/');
});

module.exports = router;
