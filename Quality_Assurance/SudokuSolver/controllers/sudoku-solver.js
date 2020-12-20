class SudokuSolver {

  validate(puzzleString) {
    if (!(/^[1-9\.]+$/).test(puzzleString)) { return 'invalidChar'}
    if (puzzleString.length !== 81) { return 'invalidLength' }
    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowLength = 9;
    let rowCount = 1;
    let arr;
    for (let i=0; i < puzzleString.length; i+=rowLength) {
      if (rowCount == row) {
        arr = puzzleString.slice(i, i + rowLength);
        break;
      }
      rowCount++;
    }
    return arr.includes(value) ? false : true
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colLength = 9;
    let arr = [];
    for (let i=0; i < puzzleString.length; i++) {
      if ((i + 1) % colLength == column || (column == colLength && (i + 1) % colLength == 0)) {
        arr.push(puzzleString.charAt(i));
      }
    }
    return arr.includes(value) ? false : true
  }

  checkRegionPlacement(puzzleString, row, column, value) {

    const regL = 3;
    const rowL = 9;
    let regArr = [];
    let topReg, midReg, lowReg;
    for (let i=0; i < puzzleString.length; i+=3) {
      if (i%9 === 0 && i !== 0) { i+= 2*rowL }
      topReg = puzzleString.slice(i, i + regL);
      midReg = puzzleString.slice(i + rowL, i + regL + rowL);
      lowReg = puzzleString.slice(i + 2*rowL, i + regL + 2*rowL);
      regArr.push(topReg.concat(midReg).concat(lowReg));
    }
    if (row <= 3) {

      if (column <= 3) { return regArr[0].includes(value) ? false : true }
      else if (column <= 6) { return regArr[1].includes(value) ? false : true }
      else if (column <= 9) { return regArr[2].includes(value) ? false : true }

    } else if (row <= 6) {

      if (column <= 3) { return regArr[3].includes(value) ? false : true }
      else if (column <= 6) { return regArr[4].includes(value) ? false : true }
      else if (column <= 9) { return regArr[5].includes(value) ? false : true }

    } else if (row <= 9) {

      if (column <= 3) { return regArr[6].includes(value) ? false : true }
      else if (column <= 6) { return regArr[7].includes(value) ? false : true }
      else if (column <= 9) { return regArr[8].includes(value) ? false : true }

    }
    return false;
  }

  solve(puzzleString) {
    const rowL = 9, colL = 9;
    let possibleMatches = [];
    let col, row;
    let attempts = 0;
    let solArr = puzzleString.split('');
    while (attempts <= 50 & solArr.indexOf('.') !== -1) {
      for (let i=0; i < solArr.length; i++) {
        row = Math.ceil((i+1) / rowL);
        col = (i+1) % colL === 0 ? colL : (i+1) % colL;
        if (solArr[i] == '.') {
          for (let j=1; j <= 9; j++) {
            if (this.checkRowPlacement(solArr.join(''), row.toString(), col.toString(), j.toString()) && 
            this.checkColPlacement(solArr.join(''), row.toString(), col.toString(), j.toString()) && 
            this.checkRegionPlacement(solArr.join(''), row.toString(), col.toString(), j.toString())) {
              possibleMatches.push(j.toString())
            }
          }
          if (possibleMatches.length === 1) {
            solArr[i] = possibleMatches[0];
          } 
          possibleMatches = [];
        }
      }
      if (solArr.indexOf('.') === -1 ) { return solArr.join(''); }
      attempts++;
    }
    return false;
  }
}

module.exports = SudokuSolver;

