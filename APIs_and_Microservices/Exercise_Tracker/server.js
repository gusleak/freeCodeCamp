const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true}
});

let User = mongoose.model('User', userSchema);

const exerciseSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  date: {type: Date, default: Date.now},
  duration: {type: Number, required: true},
  description: {type: String, required: true}
});

let Exercise = mongoose.model('Exercise', exerciseSchema);

// Post new user
app.post('/api/exercise/new-user', (req, res) => {
  let user = new User({
    username: req.body.username
  })
  console.log('New User: ' + user)
  user.save();
  res.json(user);
})

// Get all users
app.get('/api/exercise/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return console.log(err);
    res.json(users)
  })
})

// Post exercises
app.post('/api/exercise/add', (req, res) => {
  User.findById({_id: req.body.userId}, (err, user) => {
    if (err) return console.log(err);

    let setDate;
    if (!req.body.date) {
      setDate = new Date().toDateString();
    } else if (isNaN(Date.parse(req.body.date))) {
      res.send('Invalid date');
      return true;
    } else {
      setDate = new Date(req.body.date);
    }
    
    let exercise = new Exercise({
      userId: user,
      date: setDate,
      duration: req.body.duration,
      description: req.body.description
    })
    exercise.save();
    console.log('Added exercise for ' + exercise.userId._id);
    console.log('Exercise date: ' + setDate)
    res.json({
      '_id': exercise.userId._id,
      'username': exercise.userId.username,
      'date': exercise.date.toDateString(),
      'duration': exercise.duration,
      'description': exercise.description
    });
  })
})

// Get exercise log for a user
app.get('/api/exercise/log', (req, res) => {

  console.log('Query: ' + JSON.stringify(req.query))
  
  // Check for valid userId
  if (!req.query.userId) {
    res.send('Invalid user');
    return true;
  }

  // Check for date query
  let dateString = { date: { $gte: new Date(1980-01-01), $lte: Date.now() }};
  if (req.query.from && req.query.to) {
    dateString = { date: { $gte: new Date(req.query.from), $lte: new Date(req.query.to) } }
  }

  // Check for limit query
  let limit = 0;
  if (req.query.limit) { limit = parseInt(req.query.limit) }
  
  // Get exercises
  Exercise.find({userId : req.query.userId})
          .find(dateString)
          .sort('-date')
          .select('-_id date duration description')
          .limit(limit)
          .exec((err1, exercises) => {
    if (err1) return console.log(err1);

    User.findById({_id: req.query.userId}, (err2, user) => {
      if (err2) return console.log(err2);

      res.json({
        '_id': user._id,
        'username': user.username,
        'count': exercises.length,
        'log': exercises.map(elem => elem.date != null ? {description: elem.description, duration: elem.duration, date: elem.date.toDateString()} : {description: elem.description, duration: elem.duration, date: elem.date})
      });
    })

  })
})