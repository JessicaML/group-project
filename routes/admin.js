var express = require('express'),
    db = require('../models'),
    bodyParser = require('body-parser'),
    router = express.Router();

    router.use(bodyParser.urlencoded({ extended: false}));


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




// gets give-list page after login
router.get('/admin/books', (req, res) => {
  db.Book.findAll({ order: [['createdAt', 'DESC']] }).then((books) => {
    res.render('books/index', { books: books, sponsor: req.session.sponsor, reader: req.session.reader });
  }).catch((error) => {
    throw error;
  });
});



//gets my profile page
router.get('/my-profile', (req, res) => {
    res.render('books/my-profile');
  });


//gets create new book page
router.get('/books/new', (req, res) => {
  res.render('books/new');
});



//get register page for sponsors

router.get('/users/sponsor', (req, res) => {
  res.render('users/sponsor');
});

//get register page for readers

router.get('/users/reader', (req, res) => {
  res.render('users/reader');
});


// get page to register new sponsor
router.get('/sponsor', (req, res) => {
  if (req.session.user) {
    res.redirect('/admin/books');
  }
  res.render('users/sponsor');
});

// get page to register new reader
router.get('/reader', (req, res) => {
  if (req.session.user) {
    res.redirect('/admin/books');
  }
  res.render('users/reader');
});

//posts data to create sponsor-user
router.post('/sponsors', (req, res) => {
  db.Sponsor.create(req.body).then((sponsor) => {
    res.redirect('/');
  }).catch(() => {
    res.redirect('/users/sponsor');
  });
});

//posts data to create reader-user
router.post('/readers', (req, res) => {
  db.Reader.create(req.body).then((reader) => {
    res.redirect('/');
  }).catch(() => {
    res.redirect('/users/reader');
  });
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
