'use strict';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


const threadSchema = new mongoose.Schema({
  board: {type: String, required: true},
  text: {type: String, required: true},
  created_on: {type: Date, default: Date.now},
  bumped_on: {type: Date, default: Date.now},
  reported: {type: Boolean, default: false},
  delete_password: {type: String, required: true},
  replies: {type: [String], default: []}
});
const replySchema = new mongoose.Schema({
  thread_id: {type: String, required: true},
  text: {type: String, required: true},
  created_on: {type: Date, default: Date.now},
  reported: {type: Boolean, default: false},
  delete_password: {type: String, required: true}
});
var Thread = mongoose.model('Thread', threadSchema);
var Reply = mongoose.model('Reply', replySchema);

module.exports = function (app) {
  
  app.route('/api/threads/:board')

     .get((req, res) => {
       Thread.find()
             .sort('-created_on')
             .limit(20)
             .exec((err, threads) => {
               threads = threads.map(thread => {
                 delete thread.bumped_on;
                 delete thread.reported;
                 delete thread.delete_password;
                 if (thread.replies.length > 3) {
                   thread.replies = thread.replies.slice(0, 3);
                 }
               })
               res.send(threads);
             });
     })

     .post((req, res) => {
       let thread = new Thread({
         board: req.body.board,
         text: req.body.text,
         delete_password: req.body.delete_password
       });
       thread.save();
       res.json(thread);
     })

     .put((req, res) => {
       Thread.findById(thread_id, (err, thread) => {
         thread.reported = true;
         thread.save()
         res.send('success');
       })
     })

     .delete((req, res) => {
       Thread.findByIdAndRemove(req.body.thread_id, (err, thread) => {
         if (thread.delete_password !== req.body.delete_password) {
           return res.send('incorrect password');
         } else {
           res.send('success');
         }
         Reply.findById(req.body.reply_id, (err, reply) => {
           reply.text = '[deleted]';
           reply.save();
         })
       })
     })

    
  app.route('/api/replies/:board')

     .get((req, res) => {
       Thread.findById(req.query.thread_id, (err, thread) => {                      
         delete thread.bumped_on;
         delete thread.reported;
         delete thread.delete_password;
         thread.replies = thread.replies.map(reply => {
           delete reply.reported;
           delete reply.delete_password
         })
         res.json(thread);
       })
     })

     .post((req, res) => {
       Thread.findById(req.body.thread_id, (err, thread) => {
         thread.bumped_on = new Date();
         let reply = new Reply({
           thread_id: req.body.thread_id,
           text: req.body.text,
           delete_password: req.body.delete_password
         });
         reply.save();
         thread.replies.push(reply);
         res.json(reply)
       })
     })

     .put((req, res) => {
       Reply.findById(req.body.reply_id, (err, reply) => {
         reply.reported = true;
         reply.save();
         res.send('success');
       })
     })

     .delete((req, res) => {
       Reply.findById(req.body.reply_id, (err, reply) => {
         if (reply.delete_password != req.body.delete_password) {
           return res.send('incorrect password');
         } else {
           res.send('success');
         }
         reply.text = '[deleted]';
         reply.save();
       })
     })
};
