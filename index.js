const express = require('express'),
      methodOverride = require('method-override'),
      pug = require('pug'),
      logger = require('morgan'),
      bcrypt = require('bcrypt'),
      session = require('express-session');

var db = require('./models');

var app = express();

var adminRouter = require('./routes/admin');
var authenticationRouter = require('./routes/authentication');


app.set('view engine', 'pug');

// hack for delete
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(logger('dev'));

app.use(session({
   secret: 'our secret key',
   resave: true,
   saveUninitialized: true
 }));


app.use('/admin', adminRouter);
app.use('/authentication', authenticationRouter);



//gets home page
app.get('/', (req, res) => {
  db.Book.findAll({ order: [['createdAt', 'DESC']] }).then((books) => {
    res.render('index', { books: books, sponsor: req.session.sponsor, reader: req.session.reader});
  }).catch((error) => {
    throw error;
  });
});



//login as sponsor

app.get('/login-sponsor', (req, res) => {
  res.render('login-sponsor');
});

//login as reader

app.get('/login-reader', (req, res) => {
  res.render('login-reader');
});

// get page to register new sponsor
app.get('/sponsor', (req, res) => {
  if (req.session.sponsor) {
    res.redirect('/admin/books');
  }
  res.render('users/sponsor');
});

// get page to register new reader
app.get('/reader', (req, res) => {
  if (req.session.reader) {
    res.redirect('/admin/books');
  }
  res.render('users/reader');
});

//posts data to create sponsor-user
app.post('/sponsors', (req, res) => {
  console.log("Is this happening?");
  console.log(req.body);

  db.Sponsor.create(req.body).then((sponsor) => {
    req.session.sponsor = sponsor;

    console.log("2 - Is this?");
    console.log(req.body);

    res.redirect('/');
  }).catch(() => {
    res.redirect('/users/sponsor');
  });
});

//posts data to create reader-user
app.post('/readers', (req, res) => {
  console.log("Is this happening?");
  console.log(req.body);
  db.Reader.create(req.body).then((reader) => {
    req.session.reader = reader;

    console.log("2 - Is this?");
    console.log(req.body);

    res.redirect('/');
  }).catch(() => {
    res.redirect('/users/reader');
  });
});


//get book show page
app.get('/books/:slug', (req, res) => {
  db.Book.findOne({
    where: {
      slug: req.params.slug
    }
  }).then((book) => {
    return book
  }).then((book) => {
      res.render('books/show', { book: book });
    }).catch((error) => {
    res.status(404).end();
  });
});


// comment posted to db
app.post('/books/:id/comments', (req, res) => {
  db.Book.findById(req.params.id).then((post) => {
    var comment = req.body;
    comment.BookId = book.id;
    db.Comment.create(comment).then(() => {
      res.redirect('/' + book.slug);
        });
  });
});



db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Web server started at port 3000!');
  });
});
