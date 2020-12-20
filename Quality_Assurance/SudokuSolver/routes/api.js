'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let coord = req.body.coordinate;
      let val = req.body.value;
      if (!puzzle || !coord || !val) { return res.json({error: 'Required field(s) missing'}); }
      let validation = solver.validate(puzzle);
      if (validation == 'invalidChar') { return res.json({error: 'Invalid characters in puzzle'}); }
      else if (validation == 'invalidLength') { return res.json({error: 'Expected puzzle to be 81 characters long'}); }
      
      if (!(/^[A-Ia-i][1-9]$/).test(coord)) { return res.json({error: 'Invalid coordinate'}) } 
      else if (!(/[1-9]/).test(val)) { return res.json({error: 'Invalid value'}) }

      let arr = coord.split('');
      switch(arr[0].toLowerCase()) {
        case 'a':
          arr[0] = 1;
          break;
        case 'b':
          arr[0] = 2;
          break;
        case 'c':
          arr[0] = 3;
          break;
        case 'd':
          arr[0] = 4;
          break;
        case 'e':
          arr[0] = 5;
          break;
        case 'f':
          arr[0] = 6;
          break;
        case 'g':
          arr[0] = 7;
          break;
        case 'h':
          arr[0] = 8;
          break;
        case 'i':
          arr[0] = 9;
          break;
      }
      let row = solver.checkRowPlacement(puzzle, arr[0], arr[1], val);
      let column = solver.checkColPlacement(puzzle, arr[0], arr[1], val);
      let region = solver.checkRegionPlacement(puzzle, arr[0], arr[1], val);

      if (row && column && region) {
        return res.json({ valid: true })
      } else {
        let errorObj = {
          valid: false,
          conflict: []
        }
        if (!row) { errorObj.conflict.push('row') }
        if (!column) { errorObj.conflict.push('column') }
        if (!region) { errorObj.conflict.push('region') }
        res.json(errorObj);
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      if (!puzzle) { return res.json({error: 'Required field missing'}); }
      let validation = solver.validate(puzzle);
      if (validation == 'invalidChar') { return res.json({error: 'Invalid characters in puzzle'}); }
      else if (validation == 'invalidLength') { return res.json({error: 'Expected puzzle to be 81 characters long'}); }

      let result = solver.solve(puzzle);
      if (!result) { return res.json({error: 'Puzzle cannot be solved'}); }
      else { return res.json({solution: result}) }
  
    });
};
