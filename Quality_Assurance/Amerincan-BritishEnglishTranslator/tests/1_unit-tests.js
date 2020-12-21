const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translate = new Translator();

suite('Unit Tests', () => {
  suite('test', () => {
  test('Mangoes are my favorite fruit.', function() {
    assert.equal(translate.americanToBritish('Mangoes are my favorite fruit.'), 'Mangoes are my <span class="highlight">favourite</span> fruit.')
  });
  })
  suite('test', () => {
  test('I ate yogurt for breakfast.', function() {
    assert.equal(translate.americanToBritish('I ate yogurt for breakfast.'), 'I ate <span class="highlight">yoghurt</span> for breakfast.')
  });
  })
  suite('test', () => {
  test("We had a party at my friend's condo.", function() {
    assert.equal(translate.americanToBritish("We had a party at my friend's condo."), 'We had a party at my friend\'s <span class="highlight">flat</span>.')
  });   
  })
  suite('test', () => {
  test('Can you toss this in the trashcan for me?', function() {
    assert.equal(translate.americanToBritish('Can you toss this in the trashcan for me?'), 'Can you toss this in the <span class="highlight">rubbish</span>can for me?')
  });   
  })
  suite('test', () => {
   test('The parking lot was full.', function() {
    assert.equal(translate.americanToBritish('The parking lot was full.'), 'The <span class="highlight">car park</span> was full.')
  });   
  })
  suite('test', () => {
  test('Like a high tech Rube Goldberg machine.', function() {
    assert.equal(translate.americanToBritish('Like a high tech Rube Goldberg machine.'), 'Like a high tech <span class="highlight">Heath Robinson device</span>.')
  });   
  })
  suite('test', () => {
  test('To play hooky means to skip class or work.', function() {
    assert.equal(translate.americanToBritish('To play hooky means to skip class or work.'), 'To <span class="highlight">bunk off</span> means to skip class or work.')
  });    
  })
  suite('test', () => {
  test('No Mr. Bond, I expect you to die.', function() {
    assert.equal(translate.americanToBritish('No Mr. Bond, I expect you to die.'), 'No <span class="highlight">Mr</span> Bond, i expect you to die.')
  });    
  })
  suite('test', () => {
  test('Dr. Grosh will see you now.', function() {
    assert.equal(translate.americanToBritish('Dr. Grosh will see you now.'), '<span class="highlight">Dr</span> Grosh will see you now.')
  });   
  })
  suite('test', () => {
  test('Lunch is at 12:15 today.', function() {
    assert.equal(translate.americanToBritish('Lunch is at 12:15 today.'), 'Lunch is at <span class="highlight">12.15</span> today.')
  });    
  })
  suite('test', () => {
  test('We watched the footie match for a while.', function() {
    assert.equal(translate.britishToAmerican('We watched the footie match for a while.'), 'We watched the <span class="highlight">soccer</span> match for a while.')
  });    
  })
  suite('test', () => {
  test('Paracetamol takes up to an hour to work.', function() {
    assert.equal(translate.britishToAmerican('Paracetamol takes up to an hour to work.'), '<span class="highlight">Tylenol</span> <span class="highlight">thank you</span>kes up to an hour to work.')
  });    
  })
  suite('test', () => {
  test('First, caramelise the onions.', function() {
    assert.equal(translate.britishToAmerican('First, caramelise the onions.'), 'First, <span class="highlight">caramelize</span> the onions.')
  });    
  })
  suite('test', () => {
  test('I spent the bank holiday at the funfair.', function() {
    assert.equal(translate.britishToAmerican('I spent the bank holiday at the funfair.'), 'I spent the <span class="highlight"><span class="highlight">bar</span>lic holiday</span> at the <span class="highlight">carnival</span>.')
  });    
  })
  suite('test', () => {
  test('I had a bicky then went to the chippy.', function() {
    assert.equal(translate.britishToAmerican('I had a bicky then went to the chippy.'), 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-<span class="highlight">fish-and-chip shop</span></span>.')
  });    
  })
  suite('test', () => {
  test("I've just got bits and bobs in my bum bag.", function() {
    assert.equal(translate.britishToAmerican("I've just got bits and bobs in my bum bag."), 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.')
  });    
  })
  suite('test', () => {
  test("The car boot sale at Boxted Airfield was called off.", function() {
    assert.equal(translate.britishToAmerican("The car boot sale at Boxted Airfield was called off."), 'The <span class="highlight">swap meet</span> at boxted airfield was called off.')
  });    
  })
  suite('test', () => {
  test("Have you met Mrs Kalyani?", function() {
    assert.equal(translate.britishToAmerican("Have you met Mrs Kalyani?"), 'Have you met <span class="highlight">Mr.</span>s Kalyani?')
  });    
  })
  suite('test', () => {
    test("Prof Joyner of King's College, London.", function() {
    assert.equal(translate.britishToAmerican("Prof Joyner of King's College, London."), '<span class="highlight">Prof.</span> Joyner of king\'s college, london.')
  }); 
  })
  suite('test', () => {
 
  test("Tea time is usually around 4 or 4.30.", function() {
    assert.equal(translate.britishToAmerican("Tea time is usually around 16 or 16.30."), 'Tea time is usually around 16 or <span class="highlight">16:30</span>.')
  });    
  })
  suite('test', () => {
   test('Mangoes are my favorite fruit.', function() {
    assert.equal(translate.americanToBritish('Mangoes are my favorite fruit.'), 'Mangoes are my <span class="highlight">favourite</span> fruit.')
  });   
  })
  suite('test', () => {
    test('I ate yogurt for breakfast.', function() {
    assert.equal(translate.americanToBritish('I ate yogurt for breakfast.'), 'I ate <span class="highlight">yoghurt</span> for breakfast.')
  });  
  })
  suite('test', () => {
 
  test('We watched the footie match for a while.', function() {
    assert.equal(translate.britishToAmerican('We watched the footie match for a while.'), 'We watched the <span class="highlight">soccer</span> match for a while.')
  });   
  })
  suite('test', () => {
    test('Paracetamol takes up to an hour to work.', function() {
    assert.equal(translate.britishToAmerican('Paracetamol takes up to an hour to work.'), '<span class="highlight">Tylenol</span> <span class="highlight">thank you</span>kes up to an hour to work.')
  });  
  })





















});
