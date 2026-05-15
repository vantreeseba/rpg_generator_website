import { Language } from '@dropecho/langgen';
import { Generator, Functions, Transforms } from '@dropecho/storygen';

import colorsData from '../data/common/colors.json';
import materialsData from '../data/common/materials.json';
import animalsData from '../data/animals.json';
import foodsData from '../data/foods.json';
import occupationsData from '../data/occupations.json';
import locationsData from '../data/locations.json';
import symbolsData from '../data/symbols.json';
import clothingData from '../data/items/clothing.json';
import trinketsData from '../data/items/trinkets.json';
import weaponsData from '../data/items/weapons.json';
import speciesData from '../data/character/species.json';
import bodyPartsData from '../data/character/body-parts.json';
import characteristicsData from '../data/character/characteristics.json';
import goalsData from '../data/character/goals.json';
import talentsData from '../data/character/talents.json';
import traitsData from '../data/character/traits.json';
import hairData from '../data/character/hair.json';
import identityData from '../data/character/identity.json';
import aspectsData from '../data/deity/aspects.json';
import plothooksData from '../data/generators/plothooks.json';
import npcData from '../data/generators/npc.json';

var langs = {};

Functions.set('generate_name', (generator, args) => {
  const seed = generator.getSeed().toString();
  if (!langs[seed]) {
    langs[seed] = new Language(null, seed.toString());
  }
  if (args[0] == 'true') {
    langs[seed].random.setStringSeed(seed.toString());
  }
  const word = langs[seed].createWord(null, 2, 4);
  return word;
});

Functions.set('generate_phrase', (generator, args) => {
  const seed = generator.getSeed();
  if (!langs[seed]) {
    langs[seed] = new Language(null, seed);
  }
  return langs[seed].createPhrase();
});

Functions.set('sub', (generator, args) => {
  const sub = buildGenerator();
  const grammar = args[0];
  const seed = (
    args[1] !== null && args[1] !== undefined ? generator?.memory[args[1]] || -1 : -1
  ).toString();

  const memory = grammar + '_memory';
  if (sub.grammars[memory]) {
    sub.run(memory, seed);
  }
  return sub.run(`#${grammar}#`, seed);
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

/**
 * Outputs a generated phrase from one of the given grammers.
 * i.e. #choice(test,foo)#
 * where "test": [1,2], foo:[a,b].
 * would output either "1", "2", "a", "b".
 *
 * @param {Generator} generator
 * @param {Array<string>} args
 * @returns A "run" of one of the given symbols/grammars.
 */
Functions.set('choice', (generator, args) => {
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

function conjugateVerb(verb, pronoun) {
  if (pronoun === 'he' || pronoun === 'she' || pronoun === 'it') {
    const irregulars = { be: 'is', have: 'has', do: 'does', go: 'goes' };
    if (irregulars[verb]) return irregulars[verb];
    if (/(?:s|x|z|ch|sh)$/.test(verb)) return verb + 'es';
    if (/[^aeiou]y$/.test(verb)) return verb.slice(0, -1) + 'ies';
    return verb + 's';
  }
  // they / plural — base form, except 'be'
  if (verb === 'be') return 'are';
  return verb;
}

// Usage: #conjugate(want, pronoun_)# or #conjugate(want, he)#
// Accepts either a pronoun directly (he/she/they) or a memory key.
Functions.set('conjugate', (generator, args) => {
  const verb = args[0];
  const raw = args[1];
  const pronoun = (raw === 'he' || raw === 'she' || raw === 'they' || raw === 'it')
    ? raw
    : generator.memory[raw];
  return conjugateVerb(verb, pronoun);
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

function buildGenerator() {
  var gen = new Generator({});
  gen.mergeGrammar(colorsData);
  gen.mergeGrammar(materialsData);

  gen.mergeGrammar(animalsData);
  gen.mergeGrammar(foodsData);
  gen.mergeGrammar(occupationsData);
  gen.mergeGrammar(locationsData);
  gen.mergeGrammar(symbolsData);

  gen.mergeGrammar(clothingData);
  gen.mergeGrammar(trinketsData);
  gen.mergeGrammar(weaponsData);

  gen.mergeGrammar(speciesData);
  gen.mergeGrammar(bodyPartsData);
  gen.mergeGrammar(characteristicsData);
  gen.mergeGrammar(goalsData);
  gen.mergeGrammar(talentsData);
  gen.mergeGrammar(traitsData);
  gen.mergeGrammar(hairData);
  gen.mergeGrammar(identityData);

  gen.mergeGrammar(aspectsData);

  gen.mergeGrammar(plothooksData);
  gen.mergeGrammar(npcData);

  // Shared pronoun/verb grammar — defined once here so generator load order never matters.
  gen.mergeGrammar({
    is_was: ['is', 'was'],
    he: ['he'],
    she: ['she'],
    they: ['they'],
    is: ['is'],
    are: ['are'],
    pronoun: ['#switch(gender_, male=>he, female=>she, _=>they)#'],
    is_verb: ['#switch(pronoun_, he=>is, she=>is, it=>is, _=>are)#'],
    poss_pronoun: ['#switch(pronoun_, he=>his, she=>her, it=>its, _=>their)#'],
    reflex_pronoun: ['#switch(pronoun_, he=>himself, she=>herself, it=>itself, _=>themselves)#'],
  });

  gen.mergeGrammar({
    locality_name: ['#generate_name(true).c#'],
    locality_npc: ['#generate_name().c#, #gender.a# #species.c#'],
    locality_leader_count: ['one', 'many'],
    locality_short_memory: [
      '#[M_locality_name_:locality_name]# #[leader_count:locality_leader_count]# #population:random(10, 10000)#',
    ],
    locality_short: [
      '#location_type_populated.c# of #M_locality_name_#',
      '#M_locality_name_# #location_type_populated.c#',
    ],
  });

  return gen;
}

export const storygen = buildGenerator();
