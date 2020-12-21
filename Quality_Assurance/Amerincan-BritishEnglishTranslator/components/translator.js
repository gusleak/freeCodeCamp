const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class Translator {

  americanToBritish(sentence) {
    let toTranslate = sentence.toLowerCase();
    let translated;
    let occurences = 0;
    for (let term in americanOnly) {
      if (toTranslate.includes(term)) {
        translated = toTranslate.replace(term, `<span class="highlight">${americanOnly[term]}</span>`);
        toTranslate = translated;
        occurences++;
      }
    }
    for (let term in americanToBritishSpelling) {
      if (toTranslate.includes(term)) {
        translated = toTranslate.replace(term, `<span class="highlight">${americanToBritishSpelling[term]}</span>`);
        toTranslate = translated;
        occurences++;
      }
    }
    for (let title in americanToBritishTitles) {
      if (toTranslate.includes(title)) {
        let arr = toTranslate.split(' ');
        for (let i=0; i < arr.length; i++) {
          if ((arr[i] == 'mr.' || arr[i] == 'mrs.' || arr[i] == 'ms.' || arr[i] == 'mx.' || arr[i] == 'dr.' || arr[i] == 'prof.') && arr[i + 1]) {
            arr[i + 1] = arr[i + 1].capitalize();
          }
        }
        toTranslate = arr.join(' ');
        translated = toTranslate.replace(title, `<span class="highlight">${americanToBritishTitles[title].charAt(0).toUpperCase() + americanToBritishTitles[title].slice(1)}</span>`);
        toTranslate = translated;
        occurences++;
      }
    }
    if ((/\d\d\:\d\d/).test(toTranslate)) {
      translated = toTranslate.replace(/(\d\d)\:(\d\d)/gi, `<span class="highlight">${'$1\.$2'}</span>`)
      occurences++;
    }
    return occurences === 0 ? false : translated.capitalize();
  }

  britishToAmerican(sentence) {
    let toTranslate = sentence.toLowerCase();
    let translated;
    let occurences = 0;
    for (let term in britishOnly) {
      if (toTranslate.includes(term)) {
        translated = toTranslate.replace(term, `<span class="highlight">${britishOnly[term]}</span>`);
        toTranslate = translated;
        occurences++;
      }
    }
    for (let term in americanToBritishSpelling) {
      if (toTranslate.includes(americanToBritishSpelling[term])) {
        translated = toTranslate.replace(americanToBritishSpelling[term], `<span class="highlight">${term}</span>`);
        toTranslate = translated;
        occurences++;
      }
    }
    for (let title in americanToBritishTitles) {
      if (toTranslate.includes(americanToBritishTitles[title])) {
        let arr = toTranslate.split(' ');
        for (let i=0; i < arr.length; i++) {
          if ((arr[i] == 'mr' || arr[i] == 'mrs' || arr[i] == 'ms' || arr[i] == 'mx' || arr[i] == 'dr' || arr[i] == 'prof') && arr[i + 1]) {
            arr[i + 1] = arr[i + 1].capitalize();
          }
        }
        toTranslate = arr.join(' ');
        translated = toTranslate.replace(americanToBritishTitles[title], `<span class="highlight">${title.charAt(0).toUpperCase() + title.slice(1)}</span>`);
        toTranslate = translated;
        occurences++;
      }
    }
    if ((/\d\d\.\d\d/).test(toTranslate)) {
      translated = toTranslate.replace(/(\d\d)\.(\d\d)/gi, `<span class="highlight">${'$1\:$2'}</span>`)
      occurences++;
    }
    return occurences === 0 ? false : translated.capitalize();
  }

}

module.exports = Translator;