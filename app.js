"use strict"

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    db = require('./models/index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//Home
app.get('/', function(req, res){
    res.render('home');
  });

// // Index
// app.get('/books', function(req, res){
//   db.Post.findAll().done(function(err,books) {
//     res.render('library/index', {allBooks: books});
//   });
// });

// //New
// app.get('/books/new', function(req, res){
//   res.render("library/new", {title:"", author:""});
// });

//Create
app.post('/posts', function(req, res) {

  var content =req.body.content;
  var author = req.body.author;
  
  db.Post.create({
    content: content,
    author:author
  }).done(function(err,success){
    res.redirect('/posts');
    // if(err){
    //   var errMsg = "title must be at least 6 characters";
      // don't want a redirect! see line below
  });
});

//Show one
app.get('/posts/:id', function(req, res) {
  var id = req.params.id;
  // .find returns data to the callback(post parameter)
  db.Post.find(id).done(function(err,post){
    res.render('library/show', {post:post});
  });
});

//show all
app.get('/posts', function(req, res) {
  db.Post.findAll().done(function(err,posts){
    res.render('library/posts', {allPosts:posts});
  });
});



// //Edit
// app.get('/books/:id/edit', function(req, res) {
//   //find our book
//   var id = req.params.id;
//   db.Post.find(id).done(function(err,book){
//       res.render('library/edit', {book: book});
//   });
// });

//Update
app.put('/books/:id', function(req, res) {
  var id = req.params.id;
  db.Book.find(id).done(function(err, book){
    book.updateAttributes({
      title: req.body.book.title,
      author: req.body.book.author
    }).done(function(err){
      if(err){
      var errMsg = "title must be at least 6 characters";
      res.render('library/edit', {errMsg:errMsg,book: book});
      }
      res.redirect('/books');
    });
  });
});

//Delete
app.delete('/books/:id', function(req, res) {
  var id = req.params.id;
  db.Book.find(id).done(function(err,book){
    book.destroy().done(function(err){
      res.redirect('/books');
    });
  });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});