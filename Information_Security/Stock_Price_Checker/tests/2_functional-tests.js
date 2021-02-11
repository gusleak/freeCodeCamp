const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('GET /api/stock-prices/', function() {
    test('View one stock', function(done) {
      chai.request(server)
        .get('/api/stock-prices/')
        .query({stock: 'AAPL'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          done();
        })
    })
    test('View one stock and like', function(done) {
      chai.request(server)
        .get('/api/stock-prices/')
        .query({stock: 'AAPL', like: true})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          done();
        })
    })
    test('View same stock and like again', function(done) {
      chai.request(server)
        .get('/api/stock-prices/')
        .query({stock: 'AAPL', like: true})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          done();
        })
    })
    test('View two stocks', function(done) {
      chai.request(server)
        .get('/api/stock-prices/')
        .query({stock: ['AAPL', 'TSLA']})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          done();
        })
    })
    test('View two stocks and like', function(done) {
      chai.request(server)
        .get('/api/stock-prices/')
        .query({stock: ['AAPL', 'TSLA'], like: true})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          done();
        })
    })
  })
});
