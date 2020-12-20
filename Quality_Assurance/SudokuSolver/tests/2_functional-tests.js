const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Solve valid puzzle string', function(done) {
    chai.request(server)
      .post('/api/solve')
      .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
        done();
      })
  })
  test('Puzzle string missing', function(done) {
    chai.request(server)
      .post('/api/solve')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field missing')
        done();
      })
  })
  test('Puzzle with invalid characters', function(done) {
    chai.request(server)
      .post('/api/solve')
      .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37Z'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid characters in puzzle')
        done();
      })
  })
  test('Puzzle with incorrect length', function(done) {
    chai.request(server)
      .post('/api/solve')
      .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16.'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        done();
      })
  })
  test('Puzzle that cannot be solve', function(done) {
    chai.request(server)
      .post('/api/solve')
      .send({puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..169999926914.37.'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Puzzle cannot be solved')
        done();
      })
  })
  test('Check puzzle with all fields', function(done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'A2',
        value: '1'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false)
        done();
      })
  })
  test('Check puzzle with single placement conflict', function(done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'A2',
        value: '4'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.conflict.length, 1)
        done();
      })
  })
  test('Check puzzle with multiple placement conflict', function(done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'A1',
        value: '2'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.conflict.length, 3)
        done();
      })
  })
  test('Check puzzle with all placement conflict', function(done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'B1',
        value: '1'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.conflict.length, 3)
        done();
      })
  })
  test('Check puzzle with missing fields', function(done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: '',
        value: '1'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing')
        done();
      })
  })
  test('Check puzzle with incorrect length', function(done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: '1.5..2.84..63.12.7.2..5.....9',
        coordinate: 'A2',
        value: '1'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        done();
      })
  })
  test('Check puzzle with invalid characters', function(done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37Z',
        coordinate: 'A2',
        value: '1'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid characters in puzzle')
        done();
      })
  })
  test('Check puzzle with invalid coordinate', function(done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'ZZ',
        value: '1'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid coordinate')
        done();
      })
  })
  test('Check puzzle with invalid value', function(done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        coordinate: 'A2',
        value: 'H'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value')
        done();
      })
  })
});

