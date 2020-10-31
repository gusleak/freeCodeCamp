function palindrome(str) {
  let arr = str.toLowerCase().replace(/_/g, '').match(/\w/gi);
  for (let i = 0; i < arr.length / 2; i++) {
    if (arr[i] !== arr[arr.length - 1 - i]) { return false; }
  }
  return true;
}
