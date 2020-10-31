function rot13(str) {
  const rot = 13;
  const firstLetter = 'A'.charCodeAt();
  const lastLetter = 'Z'.charCodeAt();
  let arr = str.split('');
  return arr.map(letter => {
    if (/\w/.test(letter)) {
      if (letter.charCodeAt() - rot >= firstLetter) {
        return String.fromCharCode(letter.charCodeAt() - rot);
      } else {
        let remainder = rot - (letter.charCodeAt() - firstLetter);
        return String.fromCharCode(lastLetter - remainder + 1);
      }
    } else {
      return letter;
    }
  }).join('');
}
