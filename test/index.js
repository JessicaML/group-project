var assert = require('assert');
var db = require('../models');


  describe('Book Model', () => {
  before((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });

  it('creates a book', (done) => {
    db.Book.create({
      title: 'Izels great blog article',
      author: 'Man or woman',
      imgURL: 'string',
      slug: 'our test slug',
      content: '<h1>I\'m awesome!</h1>'
    }).then((book) => {
      assert.equal(book.isNewRecord, false);
      assert.equal(book.title, 'Izels great blog article');
      assert.equal(book.author, 'Man or woman');
      assert.equal(book.imgURL, 'string');
      assert.equal(book.slug, 'our test slug');
      assert.equal(book.content, '<h1>I\'m awesome!</h1>');
      done();
    });
  });

  it('cannot create a book if title is missing', (done) => {
    db.Book.create({
      slug: 'our test slug',
      content: '<h1>I\'m awesome!</h1>'
    }).catch((error) => {
      assert.equal(error.errors[0].message, 'title cannot be null');
      assert.equal(error.errors.length, 1);
      done();
    });
  });

  it('cannot create a book if content is missing', (done) => {
    db.Book.create({
      title: 'Izels great blog article',
      slug: 'our test slug'
    }).catch((error) => {
      assert.equal(error.errors[0].message, 'content cannot be null');
      assert.equal(error.errors.length, 1);
      done();
    });
  });

  // it('generates a slug during book creation if book has no slug', (done) => {
  //   db.Book.create({
  //     title: 'This should get sluggified',
  //     content: '<h1>I\'m awesome!</h1>'
  //   }).then((book) => {
  //     assert.equal(book.slug, 'this-should-get-sluggified');
  //     done();
  //   });
  // });

  it('updates a book', (done) => {
    db.Book.update({
      title: 'Updated new title',
      content: '<h5>New Content</h5>',
      slug: 'our-new-slug'
    }, {
      where: {
        title: 'Izels great blog article'
      },
      returning: true
    }).then((updateData) => {
      var book = updateData[1][0];
      assert.equal(book.title, 'Updated new title');
      assert.equal(book.content, '<h5>New Content</h5>');
      assert.equal(book.slug, 'our-new-slug');
      done();
    });
  });

  // it('deletes a blog book', (done) => {
  //   db.Book.destroy({
  //     where: {
  //       title: 'This should get sluggified'
  //     }
  //   }).then((destroyRecordCount) => {
  //     assert.equal(destroyRecordCount, 1);
  //     done();
  //   });
  // });



});


describe('Comment Model', () => {
  before((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });


it('creates a blog comment', (done) => {
    db.Comment.create({
      content: '<h1>I\'m awesome!</h1>'
    }).then((comment) => {
      assert.equal(comment.content, '<h1>I\'m awesome!</h1>');
      done();
    });
  });

  it('cannot create a comment if content is missing', (done) => {
    db.Comment.create({
    }).catch((error) => {
      assert.equal(error.errors[0].message, 'content cannot be null');
      assert.equal(error.errors.length, 1);
      done();
    });
  });
});
