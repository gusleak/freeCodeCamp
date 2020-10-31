function telephoneCheck(str) {
  const testRegex = {
    space: /\s{1}|\s{2}|\s{3}/,
    dash: /\-{1}|\-{2}/
  };
  let newStr;
  if (str.charAt(0) === '1') {
    newStr = str.slice(1);
  } else {
    newStr = str;
  }
  let arr = newStr.split('');
  let numArr = newStr.replace(/[()-\s]/g, '').split('');
  if (numArr.length !== 10) {
    return false;
  }
  if (arr.indexOf(/\s/) !== -1) {
    if (!(testRegex.space).test(newStr)) { return false; }
  }
  if (arr.indexOf('-') !== -1) {
    if (!(testRegex.dash).test(newStr)) { return false; }
  }
  if ((str.includes('(') && !str.includes(')')) || (!str.includes('(') && str.includes(')'))) { return false; }
  if ((str.includes('(') || str.includes(')')) && arr.indexOf(')') - arr.indexOf('(') !== 4) { return false; }
  return true;
}
