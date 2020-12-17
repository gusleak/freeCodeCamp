const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  suite('POST /api/issues/get-tests', function() {
    test('Create an issue with every field', function(done) {
      chai.request(server)
        .post('/api/issues/get-tests')
        .send({ 
          issue_title: 'Test title',
          issue_text: 'Test text',
          created_by: 'Test creator',
          assigned_to: 'Test assignee',
          status_text: 'Test status'})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.issue_title, 'Test title');
          assert.equal(res.body.issue_text, 'Test text');
          assert.equal(res.body.created_by, 'Test creator');
          assert.equal(res.body.assigned_to, 'Test assignee');
          assert.equal(res.body.status_text, 'Test status');
          done();
        })
    })
    test('Create an issue with only required fields', function(done) {
      chai.request(server)
        .post('/api/issues/get-tests')
        .send({ 
          issue_title: 'Test title',
          issue_text: 'Test text',
          created_by: 'Test creator'})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.issue_title, 'Test title');
          assert.equal(res.body.issue_text, 'Test text');
          assert.equal(res.body.created_by, 'Test creator');
          done();
        })
    })
    test('Create an issue with one missing field', function(done) {
      chai.request(server)
        .post('/api/issues/get-tests')
        .send({ 
          issue_title: 'Test title',
          issue_text: 'Test text',
          created_by: 'Test creator',
          assigned_to: 'Test assignee'})
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.issue_title, 'Test title');
          assert.equal(res.body.issue_text, 'Test text');
          assert.equal(res.body.created_by, 'Test creator');
          assert.equal(res.body.assigned_to, 'Test assignee');
          done();
        })
    })
  })



  suite('GET /api/issues/get-tests', function() {
    test('View issues on a project', function(done) {
      chai.request(server)
        .get('/api/issues/get-tests')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          done();
        })
    })
    test('View issues on a project with a filter', function(done) {
      chai.request(server)
        .get('/api/issues/get-tests')
        .query({issue_title: 'Test title'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          done();
        })
    })
    test('View issues on a project with multiple filters', function(done) {
      chai.request(server)
        .get('/api/issues/get-tests')
        .query({issue_title: 'Test title', issue_text: 'Test text'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          done();
        })
    })
  })


  suite('PUT /api/issues/get-tests', function() {
    test('Update one field on an issue', function(done) {
      chai.request(server)
        .put('/api/issues/get-tests')
        .send({ _id: '5fdb5fb24527440889eff6ae', issue_title: 'changed title'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          done();
        })
    })
    test('Update multiple fields on an issue', function(done) {
      chai.request(server)
        .put('/api/issues/get-tests')
        .send({ _id: '5fdb5fb24527440889eff6ae', issue_title: 'changed title', issue_text: 'changed text'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          done();
        })
    })
    test('Update an issue with a missing ID', function(done) {
      chai.request(server)
        .put('/api/issues/get-tests')
        .send({ issue_title: 'changed title'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.error, 'missing _id');
          done();
        })
    })
    test('Update an issue with no fields to update', function(done) {
      chai.request(server)
        .put('/api/issues/get-tests')
        .send({ _id: '5fdb5fb24527440889eff6ae'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.error, 'no update field(s) sent');
          done();
        })
    })
    test('Update an issue with an invalid ID', function(done) {
      chai.request(server)
        .put('/api/issues/get-tests')
        .send({ _id: '5fdb5wrongIDff6ae', issue_title: 'changed title'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.error, 'could not update');
          done();
        })
    })
  })



  suite('DELETE /api/issues/get-tests', function() {
    test('Delete an issue', function(done) {
      chai.request(server)
        .delete('/api/issues/get-tests')
        .send({ _id: '5fdb662731e98f0d9dd07ce6'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          done();
        })
    })
    test('Delete an issue with an invalid ID', function(done) {
      chai.request(server)
        .delete('/api/issues/get-tests')
        .send({ _id: '5fdb5fWRONGID9eff6ae'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.error, 'could not delete');
          done();
        })
    })
    test('Delete an issue with a missing ID', function(done) {
      chai.request(server)
        .delete('/api/issues/get-tests')
        .send()
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.error, 'missing _id');
          done();
        })
    })
  })
});
