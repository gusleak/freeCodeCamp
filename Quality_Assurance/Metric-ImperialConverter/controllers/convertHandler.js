/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    let arr = input.match(/[\d\.\/]+/g);
    if (arr === null) {
      return 1;
    }

    let expr = arr[0];
    if (/\//.test(expr)) {
      arr = expr.split('/');
      if (arr.length == 2) {
        result = parseFloat(arr[0]) / parseFloat(arr[1]);
      } else {
        return NaN;
      }
    }else if (!isNaN(expr)) {
      result = parseFloat(expr);
    } else {
      return NaN;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let arr = input.match(/[a-zA-Z]+/g);
    if (arr !== null) {
      let result = arr[0].toLowerCase();
      if (result === 'l') { return 'L'; }
      if (result === 'gal' || result === 'lbs' || result === 'kg' || result === 'mi' || result === 'km') {
        return result;
      } else {
        return null;
      }
    } else {
      return null
    } 
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    if (initUnit !== null) {
      switch (initUnit.toLowerCase()) {
        case 'gal':
          result = 'L';
          break;
        case 'l':
          result = 'gal';
          break;
        case 'lbs':
          result = 'kg';
          break;
        case 'kg':
          result = 'lbs';
          break;
        case 'mi':
          result = 'km';
          break;
        case 'km':
          result = 'mi';
          break;
        default:
          result = null;
      }
      return result;
    } else { return null; }
  };

  this.spellOutUnit = function(unit) {
    let result;
    if (unit !== null) {
      switch (unit.toLowerCase()) {
        case 'gal':
          result = 'gallons';
          break;
        case 'l':
          result = 'liters';
          break;
        case 'lbs':
          result = 'pounds';
          break;
        case 'kg':
          result = 'kilos';
          break;
        case 'mi':
          result = 'miles';
          break;
        case 'km':
          result = 'kilometers';
          break;
        default:
          result = '';
      }
      return result;
    } else { return null; }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit !== null) {
      switch (initUnit.toLowerCase()) {
        case 'gal':
          result = initNum * galToL;
          break;
        case 'l':
          result = initNum / galToL;
          break;
        case 'lbs':
          result = initNum * lbsToKg;
          break;
        case 'kg':
          result = initNum / lbsToKg;
          break;
        case 'mi':
          result = initNum * miToKm;
          break;
        case 'km':
          result = initNum / miToKm;
          break;
        default:
          result = '';
      }
      return (Math.round(result * 100000) / 100000);
    } else {
      return null;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
