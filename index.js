const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      pug = require('pug'),
      logger = require('morgan'),
      session = require('express-session');

var db = require('./models');

var app = express();

var adminRouter = require('./routes/admin');
var authenticationRouter = require('./routes/authentication');


app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(session({
   secret: 'our secret key',
   resave: true,
   saveUninitialized: true
 }));

app.use(bodyParser.urlencoded({ extended: false}));

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
//get book show page
app.get('/:slug', (req, res) => {
  db.Book.findOne({
    where: {
      slug: req.params.slug
    }
  }).then((post) => {
    return book.getComments().then((comments) => {
      res.render('books/show', { book: book, comments: comments, sponsor: req.session.sponsor });
    });
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

// hack for delete
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Web server started at port 3000!');
  });
});
