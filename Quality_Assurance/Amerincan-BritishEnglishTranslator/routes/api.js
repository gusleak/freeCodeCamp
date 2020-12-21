'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if (req.body.text == undefined) { return res.json({error: 'Required field(s) missing'}) }
      if (!req.body.text) { return res.json({error: 'No text to translate'}) }
      if (req.body.locale == 'american-to-british') {
        let translated = translator.americanToBritish(req.body.text);
        if (!translated) {return res.json({
          text: req.body.text,
          translation: 'Everything looks good to me!'
        })}
        return res.json({
          text: req.body.text,
          translation: translated
        })
      } else if (req.body.locale == 'british-to-american') {
        let translated = translator.britishToAmerican(req.body.text);
        if (!translated) {return res.json({
          text: req.body.text,
          translation: 'Everything looks good to me!'
        })}
        return res.json({
          text: req.body.text,
          translation: translated
        })
      } else {
        return res.json({ error: 'Invalid value for locale field' })
      }
    });

};
