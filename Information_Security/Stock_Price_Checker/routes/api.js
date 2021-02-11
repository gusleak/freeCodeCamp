'use strict';
const fetch = require('node-fetch');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


const stockSchema = new mongoose.Schema({
  symbol: {type: String, required: true},
  likes: {type: Number, default: 0},
  ips: {type: [String], default: []}
});
var Stock = mongoose.model('Stock', stockSchema);

function proxy(symbol) {
  return `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`;
}

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get((req, res) => {
      let giveLike = false;
      if (req.query.like) { giveLike = true; }
      if (!Array.isArray(req.query.stock)) {
        fetch(proxy(req.query.stock))
        .then(response => response.json())
        .then(data => {
          Stock.exists({ symbol: data.symbol }, (err, exists) => {
            if (exists) { 
              Stock.findOne({symbol: data.symbol}, (err, stock) => {
                if (giveLike && !stock.ips.includes(req.ip)) {
                  stock.likes++;
                  stock.ips.push(req.ip);
                  stock.save();
                }
                return res.json({
                  'stockData': {
                    'stock': stock.symbol,
                    'price': data.latestPrice,
                    'likes': stock.likes
                  }
                });
              });
            } else {
              let stock;
              if (giveLike) {
                stock = new Stock({
                  symbol: data.symbol,
                  likes: 1,
                  ips: [req.ip]
                });
              } else {
                stock = new Stock({
                  symbol: data.symbol
                });
              }
              stock.save();
              return res.json({
                'stockData': {
                  'stock': stock.symbol,
                  'price': data.latestPrice,
                  'likes': stock.likes
                }
              });
            }
          });
        })
        .catch(err => console.log(err))
      } else {
        let stockData = [];
        for (let i=0; i < req.query.stock.length; i++) {
          fetch(proxy(req.query.stock[i]))
          .then(response => response.json())
          .then(data => {
            Stock.exists({ symbol: data.symbol }, (err, exists) => {
              if (!exists) {
                let stock;
                if (giveLike) {
                  stock = new Stock({
                    symbol: data.symbol,
                    likes: 1,
                    ips: [req.ip]
                  });
                } else {
                  stock = new Stock({
                    symbol: data.symbol
                  });
                }
                stock.save();
                stockData.push({
                  'stock': stock.symbol,
                  'price': data.latestPrice,
                  'likes': stock.likes
                });
              } else {
                Stock.findOne({symbol: data.symbol}, (err, stock) => {
                  if (giveLike && !stock.ips.includes(req.ip)) {
                    stock.likes++;
                    stock.ips.push(req.ip);
                    stock.save();
                  }
                  stockData.push({
                    'stock': stock.symbol,
                    'price': data.latestPrice,
                    'likes': stock.likes
                  });
                })
              }
            })
          })
          .catch(err => console.log(err))
        };
        setTimeout(() => {
          let diff = Math.abs(stockData[0].likes - stockData[1].likes);
          return res.json({
            'stockData': stockData.map(e => {
              if (e.likes < diff) {
                e.rel_likes = -diff;
              } else {
                e.rel_likes = diff;
              }
              delete e.likes;
              return e;
            })
          })
        }, 1000);
      }
    });
    
};
