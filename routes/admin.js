var express = require('express'),
    db = require('../models'),
    bodyParser = require('body-parser'),
    router = express.Router();


// var requireSponsor = (req, res, next) => {
//   if (req.path === '/sponsor') {
//     return next();
//   }
//   if (req.session.sponsor) {
//     next();
//   } else {
//     res.redirect('/login-sponsor');
//   }
// };
//
// router.use(requireSponsor);
//
// var requireUser = (req, res, next) => {
//   if (req.path === '/reader') {
//     return next();
//   }
//   if (req.session.reader) {
//     next();
//   } else {
//     res.redirect('/login-reader');
//   }
// };
//
// router.use(requireReader);




router.get('/', (req, res) => {
  res.redirect('/books');
});


router.use(bodyParser.urlencoded({ extended: false}));

//gets home page
router.get('/', (req, res) => {
  db.Book.findAll({ order: [['createdAt', 'DESC']] }).then((books) => {
    res.render('books/index', { books: books, sponsor: req.session.sponsor });
  }).catch((error) => {
    throw error;
  });
});

//gets userPosts

//if statement to find only logged-in user posts

router.get('/my-posts', (req, res) => {
  // db.Post.findUserPosts({ order: [['createdAt', 'DESC']] }).then((userPosts) => {
    res.render('books/user-posts')
  // }).catch((error) => {
  //   throw error;
  // });
});


//gets new page
router.get('/books/new', (req, res) => {
  res.render('books/new');
});

//get register page
router.get('/users/new', (req, res) => {
  res.render('users/new');
});


router.get('/users/sponsor', (req, res) => {
  res.render('users/sponsor');
});

router.get('/users/reader', (req, res) => {
  res.render('users/reader');
});

router.post('/sponsors', (req, res) => {
  db.Sponsor.create(req.body).then((sponsor) => {
    res.redirect('/');
  }).catch(() => {
    res.redirect('/users/sponsor');
  });
});

router.post('/readers', (req, res) => {
  db.Reader.create(req.body).then((reader) => {
    res.redirect('/');
  }).catch(() => {
    res.redirect('/users/reader');
  });
});


//get login page
router.get('/login-reader', (req, res) => {
  res.render('login-reader');
});

router.get('/login-sponsor', (req, res) => {
  res.render('login-sponsor');
});

router.post('/login-sponsor', (req, res) => {
  db.Sponsor.findOne({
    where: {
      email: req.body.email
    }
  }).then((sponsorInDB) => {
    if (sponsorInDB.password === req.body.password) {
      req.session.sponsor = sponsorInDB;
      res.redirect('/admin/books');
    } else {
      res.redirect('/login-sponsor');
    }
  }).catch(() => {
    res.redirect('/login-sponsor');
  });
});

router.post('/login-reader', (req, res) => {
  db.Reader.findOne({
    where: {
      email: req.body.email
    }
  }).then((readerInDB) => {
    if (readerInDB.password === req.body.password) {
      req.session.user = readerInDB;
      res.redirect('/admin/books');
    } else {
      res.redirect('/login-reader');
    }
  }).catch(() => {
    res.redirect('/login-reader');
  });
});


router.get('/sponsor', (req, res) => {
  if (req.session.user) {
    res.redirect('/admin/books');
  }
  res.render('users/sponsor');
});

router.get('/reader', (req, res) => {
  if (req.session.user) {
    res.redirect('/admin/books');
  }
  res.render('users/reader');
});

//gets edit pg
router.get('/books/:id/edit', (req, res) => {
  db.Post.findOne({
    where: {
      id: req.params.id
    }
  }).then((post) => {
    res.render('books/edit', { post: post });
  });
});

//posts book data to db
router.post('/books', (req, res) => {
  db.Book.create(req.body).then((book) => {
    res.redirect('/' + book.slug);
  });
});

//posts comment
router.post('/books/:id/comments', (req, res) => {
  console.log(req.params.content);
  console.log(db.comment);
  db.Post.findById(req.params.id).then((post) => {
    var comment = req.body;
    comment.BookId = book.id;

    db.Comment.create(comment).then(() => {
      res.redirect('/' + book.slug);
    });
  });
});

// puts edits post to db
router.put('/posts/:id', (req, res) => {
  db.Post.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/admin/books');
  });
});


//deletes  blog data in db
router.delete('/books/:id', (req, res) => {
  db.Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/admin/books');
  });
});

module.exports = router;
