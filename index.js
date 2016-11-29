const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      pug = require('pug'),
      logger = require('morgan'),
      session = require('express-session'),
      fs = require('fs');

var dataFilmInMemory = JSON.parse(fs.readFileSync("data.json").toString())["films"];

var dataBookInMemory = JSON.parse(fs.readFileSync("data.json").toString())["books"];


var db = require('./models');

var app = express();

var adminRouter = require('./routes/admin');

app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(session({
   secret: 'our secret key',
   resave: true,
   saveUninitialized: true
 }));

app.use(bodyParser.urlencoded({ extended: false}));

// hack for delete

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/admin', adminRouter);

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




// gets landing page

app.get('/', (req, res) => {
  db.Book.findAll({ order: [['createdAt', 'DESC']] }).then((books) => {
    res.render('index', { books: books, sponsor: req.session.sponsor });
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

//post sponsor login

app.post('/login-sponsor', (req, res) => {
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

//post reader login


app.post('/login-reader', (req, res) => {
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

// create sponsor post sponsor data
app.post('/sponsors', (req, res) => {
  db.Sponsor.create(req.body).then((sponsor) => {
    res.redirect('/');
  }).catch(() => {
    res.redirect('register');
  });
});

// create reader post reader data

app.post('/readers', (req, res) => {
  db.Reader.create(req.body).then((reader) => {
    res.redirect('/');
  }).catch(() => {
    res.redirect('register');
  });
});

//log out

app.get('/logout', (req, res) => {
  req.session.sponsor = undefined;
  req.session.reader = undefined;
  res.redirect('/');
});


//get post show page
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

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Web server started at port 3000!');
  });
});
