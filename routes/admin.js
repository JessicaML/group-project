var express = require('express'),
    db = require('../models'),
    bodyParser = require('body-parser'),
    router = express.Router();

    router.use(bodyParser.urlencoded({ extended: false}));


var requireUser = (req, res, next) => {
  if (req.path === '/admin' || '/getbook') {
    return next();
  }
  if (req.session.sponsor || req.session.reader) {
    next();
  } else {
    res.redirect('/');
  }
};

router.use(requireUser);





// gets give-list page after login
router.get('/books', (req, res) => {
  db.Book.findAll({ order: [['createdAt', 'DESC']] }).then((books) => {
    res.render('books/index', { books: books, sponsor: req.session.sponsor, reader: req.session.reader });
  }).catch((error) => {
    throw error;
  });
});



//gets my profile page for sponsor
router.get('/books/my-profile', (req, res) => {
  db.Sponsor.findOne().then((sponsor, reader) => {
    res.render('books/my-profile', {sponsor: req.session.sponsor, reader: req.session.reader } );
  });
});


//gets create new book page

router.get('/books/new', (req, res) => {
  db.Sponsor.findOne().then((sponsor, reader) => {
    res.render('books/new', {sponsor: req.session.sponsor, reader: req.session.reader} );
  });
});


//get register page for sponsors

router.get('/users/sponsor', (req, res) => {
  res.render('users/sponsor');
});

//get register page for readers

router.get('/users/reader', (req, res) => {
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
    res.redirect('/books/' + book.slug);
  });
});

//posts comment
router.post('/books/:id/comments', (req, res) => {
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
