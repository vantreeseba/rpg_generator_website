const { Language } = require('@dropecho/langgen');
const { Generator, Functions, Transforms } = require('@dropecho/storygen');

var lang = new Language(null);

Functions.set('generate_name', (generator, args) => {
  if (args[0] == 'true') {
    lang = new Language(null, generator.getSeed());
  }
  return lang.createWord(null, 1);
});

Functions.set('generate_phrase', (generator, args) => {
  if (args[0] == 'true') {
    lang = new Language(null, generator.getSeed());
  }
  return lang.createPhrase();
});

Functions.set('combine', (generator, args) => {
  let results = [];
  var temp = [];
  var sqLength = Math.pow(2, args.length);

  for (var i = 0; i < sqLength; i++) {
    temp = [];
    for (var j = 0; j < args.length; j++) {
      if (i & Math.pow(2, j)) {
        temp.push(args[j]);
      }
    }
    if (temp.length > 0) {
      results.push(temp);
    }
  }

  results = results.map((x) => x.map((y) => `#${y}#`).join(' '));
  let c = results[Math.trunc(Math.random() * results.length)];
  return generator.run(c);
});

Functions.set('permute', (generator, args) => {
  function permute(arr, memo) {
    let cur = arr.slice();
    let results = [];
    memo = memo || [];

    for (var j = 0; j < cur.length; j++) {
      results.push(cur.map((x) => `#${x}#`).join(' '));
      let first = cur.shift();
      cur.push(first);
    }

    return results;
  }

  let cur = args.slice();
  let combos = [];

  for (var i = 0; i < cur.length; i++) {
    let per = permute(cur).map((x) => x.split(' ').slice(i).join(' '));
    combos = combos.concat(per);
  }

  let c = combos[Math.trunc(Math.random() * combos.length)];
  return generator.run(c);
});

Transforms.set('c', Transforms.get('capitalize'));
Transforms.set('s', Transforms.get('pluralize'));
Transforms.set('trim', (string) => {
  return string.trimStart().trimEnd();
});

Transforms.set('niceCount', (string) => {
  var int = parseInt(string);
  if (isNaN(int)) {
    return string;
  }

  if (int > 10 && int < 100) {
    return 'tens';
  } else if (int >= 100 && int < 1000) {
    return 'hundreds';
  } else if (int >= 1000 && int < 10000) {
    return 'thousands';
  } else if (int >= 10000 && int < 100000) {
    return 'tens of thousands';
  } else if (int >= 100000 && int < 1000000) {
    return 'hundreds of thousands';
  } else if (int >= 1000000 && int < 10000000) {
    return 'millions';
  } else if (int >= 10000000) {
    return 'countless';
  }

  return int;
});

var gen = new Generator({});
gen.mergeGrammar(require('../data/common/colors.json'));
gen.mergeGrammar(require('../data/common/materials.json'));

gen.mergeGrammar(require('../data/animals.json'));
gen.mergeGrammar(require('../data/foods.json'));
gen.mergeGrammar(require('../data/occupations.json'));
gen.mergeGrammar(require('../data/locations.json'));

gen.mergeGrammar(require('../data/items/clothing.json'));
gen.mergeGrammar(require('../data/items/trinkets.json'));
gen.mergeGrammar(require('../data/items/weapons.json'));

gen.mergeGrammar(require('../data/character/species.json'));
gen.mergeGrammar(require('../data/character/body-parts.json'));
gen.mergeGrammar(require('../data/character/characteristics.json'));
gen.mergeGrammar(require('../data/character/goals.json'));
gen.mergeGrammar(require('../data/character/talents.json'));
gen.mergeGrammar(require('../data/character/traits.json'));
gen.mergeGrammar(require('../data/character/hair.json'));
gen.mergeGrammar(require('../data/character/identity.json'));

gen.mergeGrammar(require('../data/diety/aspects.json'));

gen.mergeGrammar(require('../data/generators/plothooks.json'));
gen.mergeGrammar(require('../data/generators/npc.json'));

module.exports = {
  storygen: gen,
  langgen: lang,
};
