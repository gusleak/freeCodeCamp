const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let translate = new Translator();

suite('Functional Tests', () => {
  suite('test', () => {
  test('Translation with text and locale fields', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({locale: 'american-to-british', text: 'color'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, translate.americanToBritish('color'))
        done();
      })
  });
  })
  suite('test', () => {
      test('Translation with text and invalid locale field', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({locale: 'american-to-japanese', text: 'color'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value for locale field')
        done();
      })
  });
  })
  suite('test', () => {
      test('Translation with missing text field', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({locale: 'american-to-british'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing')
        done();
      })
  });
  })
  suite('test', () => {
      test('Translation with missing locale field', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({text: 'color'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value for locale field')
        done();
      })
  });
  })
  suite('test', () => {
      test('Translation with empty text field', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({locale: 'american-to-british', text: ''})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'No text to translate')
        done();
      })
  });
  })
  suite('test', () => {
      test('Translation with text that needs no translation', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({locale: 'american-to-british', text: 'colour'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Everything looks good to me!')
        done();
      })
  });
  })






});
