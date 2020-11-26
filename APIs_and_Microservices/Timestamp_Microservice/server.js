// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix : Date.now(), utc: new Date().toUTCString() })
})


app.get("/api/timestamp/:date", (req, res) => {
  let dateObj = new Date(req.params.date);
  if (dateObj == NaN || new Date(parseInt(req.params.date)) == 'Invalid Date') {
    res.json({error: 'Invalid Date'})
  }
  if (req.params.date.match(/^[\d]+$/)) {
    res.json({ unix : parseInt(req.params.date), utc : new Date(parseInt(req.params.date)).toUTCString() })
  } else {
    res.json({ unix : dateObj.getTime(), utc : dateObj.toUTCString() })
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
