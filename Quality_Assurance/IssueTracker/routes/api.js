const mongoose    = require('mongoose');
const bodyParser  = require('body-parser');
'use strict';

module.exports = function (app) {

  const issueSchema = new mongoose.Schema({
    issue_title: {type: String, required: true},
    issue_text: {type: String, required: true},
    created_on: {type: Date, default: Date.now},
    updated_on: {type: Date, default: Date.now},
    created_by: {type: String, required: true},
    assigned_to: String,
    open: {type: Boolean, default: true},
    status_text: String,
    project: String
  });

  let Issue = mongoose.model('Issue', issueSchema);

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      Issue.find({ project: project }, (err, data) => {
        let arr = data
                    .filter(elem => req.query._id != undefined ? elem._id == req.query._id : true)
                    .filter(elem => req.query.issue_title != undefined ? elem.issue_title == req.query.issue_title : true)
                    .filter(elem => req.query.issue_text != undefined ? elem.issue_text == req.query.issue_text : true)
                    .filter(elem => req.query.created_by != undefined ? elem.created_by == req.query.created_by : true)
                    .filter(elem => req.query.assigned_to != undefined ? elem.assigned_to == req.query.assigned_to : true)
                    .filter(elem => req.query.open != undefined ? elem.open == req.query.open : true)
                    .filter(elem => req.query.status_text != undefined ? elem.status_text == req.query.status_text : true)
                    .map(elem => {
                      return {
                        _id: elem._id,
                        issue_title: elem.issue_title,
                        issue_text: elem.issue_text,
                        created_on: elem.created_on,
                        updated_on: elem.updated_on,
                        created_by: elem.created_by,
                        assigned_to: elem.assigned_to,
                        open: elem.open,
                        status_text: elem.status_text
                      }
                    })
        res.json(arr);
      })
    })
    
    .post(function (req, res){
      let project = req.params.project;
      if (req.body.issue_title === undefined ||
          req.body.issue_text === undefined ||
          req.body.created_by === undefined) {
        return res.json({ error: 'required field(s) missing' })
      }
      let issue = new Issue({
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_on: new Date(),
        updated_on: new Date(),
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || '',
        open: true,
        status_text: req.body.status_text || '',
        project: project
      });
      issue.save();
      res.json({
        assigned_to: issue.assigned_to,
        status_text: issue.status_text,
        open: issue.open,
        _id: issue._id,
        issue_title: issue.issue_title,
        issue_text: issue.issue_text,
        created_by: issue.created_by,
        created_on: issue.created_on,
        updated_on: issue.updated_on
      });
    })
    
    .put(function (req, res){
      let project = req.params.project;
      if (!req.body._id) return res.json({ error: 'missing _id'})
      let missingFields = true;
      for (let field in req.body) {
        if (req.body[field] && req.body[field] !== req.body._id) { missingFields = false; }
      }
      if (missingFields) return res.json({ error: 'no update field(s) sent', _id: req.body._id })
      Issue.findById(req.body._id, (err, issue) => {
        if (err || !issue) return res.json({ error: 'could not update', _id: req.body._id })
        if (req.body.issue_title) { issue.issue_title = req.body.issue_title; }
        if (req.body.issue_text) { issue.issue_text = req.body.issue_text; }
        if (req.body.created_by) { issue.created_by = req.body.created_by; }
        if (req.body.assigned_to) { issue.assigned_to = req.body.assigned_to; }
        if (req.body.status_text) { issue.status_text = req.body.status_text; }
        if (req.body.open) { issue.open = false; }
        issue.updated_on = new Date();
        issue.save();
        res.json({
          result: 'successfully updated',
          _id: issue._id
        });
      })
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      if (!req.body._id) return res.json({ error: 'missing _id'})
      Issue.findByIdAndRemove(req.body._id, (err, data) => {
        if (err || !data) return res.json({ error: 'could not delete', _id: req.body._id })
        res.json({
          result: 'successfully deleted',
          _id: req.body._id
        });
      });
    });
    
};
