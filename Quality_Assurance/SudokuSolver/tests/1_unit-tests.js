const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
  test('Valid puzzle string (81 characters)' ,function() {
    assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), true)
  });
  test('Invalid puzzle string', function() {
    assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37a'), 'invalidChar')
  })
  test('Short puzzle string', function() {
    assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.'), 'invalidLength')
  })
  test('Valid row placement', function() {
    assert.equal(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 2, 3), true)
  })
  test('Invalid row placement', function() {
    assert.equal(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 2, 1), false)
  })
  test('Valid column placement', function() {
    assert.equal(solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 2, 1), true)
  })
  test('Invalid column placement', function() {
    assert.equal(solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 2, '2'), false)
  })
  test('Valid region placement', function() {
    assert.equal(solver.checkRegionPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 2, 3), true)
  })
  test('Invalid region placement', function() {
    assert.equal(solver.checkRegionPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 1, 2, 1), false)
  })
  test('Check solver on valid puzzle string' ,function() {
    assert.isString(solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'))
  });
  test('Check solver on invalid puzzle string' ,function() {
    assert.equal(solver.solve('999999999999999999999999999999999999999999999999999999999999999999999999999999'), false)
  });
  test('Solve valid puzzle string' ,function() {
    assert.equal(solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
  });
});
