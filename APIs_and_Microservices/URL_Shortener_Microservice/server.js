require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

let count = 0;
let short_urls = {};

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.route('/api/shorturl/new')
   .post((req, res) => {
     const reg = /^https?:\/\//i
     if (req.body.url.match(reg)) {
       count++;
       short_urls[count] = req.body.url
       res.json({
         'original_url': req.body.url,
         'short_url': count
      }) 
     } else {
       res.json({'error': 'invalid url'});
     }
   })

app.get('/api/shorturl/:num', (req, res) => {
  res.redirect(short_urls[req.params.num]);
})
   