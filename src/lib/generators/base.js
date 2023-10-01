const { Language } = require('@dropecho/langgen');
const { Generator, Functions, Transforms } = require('@dropecho/storygen');

var lang = new Language(null);

Functions.set('generate_name', (generator, args) => {
  if (args[0] == 'true') {
    lang = new Language(null, generator.getSeed());
  }
  return lang.createWord(null, 2, 4);
});

Functions.set('generate_phrase', (generator, args) => {
  if (args[0] == 'true') {
    lang = new Language(null, generator.getSeed());
  }
  return lang.createPhrase();
});

Functions.set('pick', (generator, args) => {
  let [key, count] = args;
  let results = [];
  let possible = [...generator.grammars[key]];

  let c = parseInt(count) || 1;

  for (let i = 0; i < c; i++) {
    if (possible.length == 0) {
      break;
    }
    let index = Math.floor(Math.random() * possible.length);
    results.push(possible.splice(index, 1)[0]);
  }

  return results.join(' ');
});

Functions.set('or', (generator, args) => {
  let c = generator.random.choice(args);
  return generator.run(`#${c}#`, generator.getSeed());
});

/**
 * Generates a "combination" of all given grammars, for example:
 * [1,2,3], [a,b,c] => [1,2,3,1a,1b,1c,2a.....,a,b,c].
 *
 * @param {Generator} generator
 * @param {Array<string>} args - The list of grammar symbols to combine.
 * @returns A choice from the combined grammars.
 */
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
  let c = generator.random.choice(results);
  return generator.run(c, generator.getSeed());
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

  let c = generator.random.choice(combos);
  return generator.run(c, generator.getSeed());
});

Transforms.set('titlize', (string) => {
  return string
    .split(' ')
    .map((x) => x.at(0)?.toUpperCase() + x.substring(1))
    .join(' ');
});
Transforms.set('t', Transforms.get('titlize'));
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
gen.mergeGrammar(require('../data/symbols.json'));

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

gen.mergeGrammar(require('../data/deity/aspects.json'));

gen.mergeGrammar(require('../data/generators/plothooks.json'));
gen.mergeGrammar(require('../data/generators/npc.json'));

// let window = this || null;
// console.log('what', window);
// if (window) {
//   window.localStorage.setItem(
//     'dropecho_generator_overrides',
//     JSON.stringify({
//       species: ['brad'],
//     }),
//   );
//
//   try {
//     var json = window.localStorage.getItem('dropecho_generator_overrides');
//     gen.mergeGrammar(JSON.parse(json));
//   } catch (err) {
//     console.log('no or invalid grammar found in local storage');
//   }
// }

module.exports = {
  storygen: gen,
  langgen: lang,
};
