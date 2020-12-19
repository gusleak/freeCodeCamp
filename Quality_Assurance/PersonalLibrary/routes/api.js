/*
*
*
*       Complete the API routing below
*       
*       
*/
const mongoose    = require('mongoose');
const bodyParser  = require('body-parser');
'use strict';

module.exports = function (app) {

  const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    comments: [String]
  });

  let Book = mongoose.model('Book', bookSchema);

  app.route('/api/books')
    .get(function (req, res){
      Book.find((err, book) => {
        if (err || !book) { return res.send('no books') }
        if (Array.isArray(book)) {
          let arr = [];
          for (let i=0; i < book.length; i++) {
            arr.push({
              _id: book[i]._id,
              title: book[i].title,
              commentcount: book[i].comments.length
            });
          }
          return res.json(arr);
        } else {
          return res.json({
            _id: book._id,
            title: book.title,
            commentcount: book.comments.length
          })
        }
      })
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;
      if (!title) { return res.send('missing required field title') }
      let book = new Book({
        title: req.body.title,
        comments: []
      });
      book.save();
      res.json({
        _id: book._id,
        title: book.title
      });
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      Book.remove(req.body._id, (err, book) => {
        res.send('complete delete successful');
      })
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      Book.findById(bookid, (err, book) => {
        if (err || !book) { return res.send('no book exists') }
        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments
        });
      })
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) { return res.send('missing required field comment'); }
      Book.findById(bookid, (err, book) => {
        if (err || !book) { return res.send('no book exists'); }
        book.comments.push(comment);
        book.save();
        res.json(book);
      })
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      Book.findByIdAndRemove(bookid, (err, book) => {
        if (err || !book) { return res.send('no book exists'); }
        res.send('delete successful');
      })
      //if successful response will be 'delete successful'
    });
  
};
