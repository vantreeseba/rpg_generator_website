import { storygen } from './base.js';

// TODO: background, flaws

storygen.mergeGrammar({
  food_reasons: ['spiciness', 'squishy texture', 'crunchy texture', 'flavor'],
  food_reason: ['because of the #food_reasons#'],
  npc_memory: [
    `
#[gender_:gender]#
#[pronoun_:pronoun]#
#[is_:is_verb]#
#[poss_:poss_pronoun]#
#[reflex_:reflex_pronoun]#
#[name_:generate_name(true).capitalize]#
#[species_:species]#
    `,
  ],
  npc_short: [
    `#[npc_memory]#
#gender_.a# #species_# with #hair-style# #human-hair-colors# hair and #colors# eyes.`,
  ],
  npc_clothes: [
    `#[npc_memory]#
#clothing_hat#
#clothing_outer#
#clothing_top#
#clothing_bottom#
#clothing_shoe#
    `,
  ],
  npc_history: [
    `
Born in the #location_named#.
#pronoun_.capitalize# #conjugate(be, pronoun_)# now living in the #location_type_populated# of #generate_name().capitalize#.
#pronoun_.capitalize# #conjugate(be, pronoun_)# #random(18, 60)# years old.
#pronoun_.capitalize# used to be #occupations.a.toLowerCase# and now #conjugate(make, pronoun_)# a living as #occupations.a.toLowerCase#.
    `,
  ],
  npc_parents: [`#repeatDelim(npc_same_species, 2, 2, n)#`],
  npc_siblings: [`#repeatDelim(npc_same_species, 0, 4, n)#`],
  npc_like: [
    `#pronoun_.capitalize# #conjugate(love, pronoun_)# eating #foods#, #food_reason#.`,
    `#pronoun_.capitalize# #conjugate(have, pronoun_)# a weakness for #foods# and #conjugate(eat, pronoun_)# it whenever possible.`,
    `#pronoun_.capitalize# #conjugate(insist, pronoun_)# on putting #foods# on everything.`,
    `#pronoun_.capitalize# #conjugate(hate, pronoun_)# eating #foods#, #food_reason#.`,
    `#pronoun_.capitalize# can't stand the taste of #foods#.`,
    `#pronoun_.capitalize# won't touch #foods# under any circumstances.`,
    `#pronoun_.capitalize# #conjugate(love, pronoun_)# watching #animals.pluralize.toLowerCase#.`,
    `#pronoun_.capitalize# #conjugate(keep, pronoun_)# a pet #animals.toLowerCase# whenever possible.`,
    `#pronoun_.capitalize# #conjugate(believe, pronoun_)# #animals.pluralize.toLowerCase# are smarter than most people.`,
    `#pronoun_.capitalize# #conjugate(be, pronoun_)# scared of #animals.pluralize.toLowerCase#.`,
    `#pronoun_.capitalize# #conjugate(hate, pronoun_)# #animals.pluralize.toLowerCase# and everything about them.`,
    `#pronoun_.capitalize# #conjugate(enjoy, pronoun_)# the company of #occupations.pluralize.toLowerCase#.`,
    `#pronoun_.capitalize# #conjugate(distrust, pronoun_)# #occupations.pluralize.toLowerCase#.`,
    `#pronoun_.capitalize# #conjugate(have, pronoun_)# no patience for #occupations.pluralize.toLowerCase#.`,
    `#pronoun_.capitalize# #conjugate(feel, pronoun_)# most alive in a crowd.`,
    `#pronoun_.capitalize# #conjugate(hate, pronoun_)# crowds and #conjugate(avoid, pronoun_)# them whenever possible.`,
    `#pronoun_.capitalize# #conjugate(love, pronoun_)# a good argument.`,
    `#pronoun_.capitalize# #conjugate(be, pronoun_)# happiest when completely alone.`,
    `#pronoun_.capitalize# #conjugate(love, pronoun_)# the smell of rain.`,
    `#pronoun_.capitalize# #conjugate(hate, pronoun_)# the cold with a passion.`,
    `#pronoun_.capitalize# #conjugate(sleep, pronoun_)# better during storms than on calm nights.`,
    `#pronoun_.capitalize# #conjugate(find, pronoun_)# silence unbearable.`,
    `#pronoun_.capitalize# #conjugate(prefer, pronoun_)# working at night.`,
    `#pronoun_.capitalize# #conjugate(love, pronoun_)# music but can't carry a tune.`,
    `#pronoun_.capitalize# #conjugate(be, pronoun_)# terrified of deep water.`,
  ],
  npc_likes: [`#repeatDelim(npc_like, 2, 4, n)#`],
  npc_traits: [
    `
#pronoun_.capitalize# #characteristics#.
#pronoun_.capitalize# #characteristics#.
#pronoun_.capitalize# #characteristics#.

Typically #pronoun_# #is_# #personality#, sometimes #pronoun_# #is_# #personality.toLowerCase#.
Often #pronoun_# #is_# #personality# towards children.
Also #pronoun_# #is_# #personality# towards #occupations.pluralize#.
    `,
  ],

  npc_trinket_count: ['0', '1', '2', '3'],
  npc_goal: [
    `#pronoun_.capitalize# #conjugate(long, pronoun_)# #goals#.`,
    `#pronoun_.capitalize# #conjugate(desire, pronoun_)# #goals#.`,
    `#pronoun_.capitalize# swore #goals#.`,
    `#pronoun_.capitalize# #conjugate(want, pronoun_)# #goals#.`,
  ],
  npc_goals: [`#repeatDelim(npc_goal, 1, 4, n)#`],
  npc: [
    `
#name_# is #npc_short#
Clothes: #npc_clothes#
`,
  ],
});

export default function (memory, seed) {
  storygen.memory = {};
  seed = seed === undefined ? Math.floor(Math.random() * 100000) : seed;
  storygen.run('#generate_name(true)#', seed); //reset the language generator to the current seed.

  storygen.run('#npc_memory#', seed);

  // Apply passed memory after npc_memory so constraints like species override
  // the random values npc_memory generates.
  for (let key in memory) {
    storygen.memory[key + '_'] = memory[key];
  }

  const siblingsText = storygen.run('#npc_siblings#', seed).trim();
  const sibling_count = siblingsText.length === 0 ? 0 : siblingsText.split('\n').length;

  const npc = {
    ...storygen.memory,
    memory: { ...storygen.memory, seed },
    short: storygen.run('#npc_short#', seed).trimStart().trimEnd(),
    clothes: storygen.run('#npc_clothes#', seed).trimStart().trimEnd(),
    history: storygen.run('#npc_history#', seed).trimStart().trimEnd(),
    parents: storygen.run('#npc_parents#', seed).trimStart().trimEnd(),
    siblings: siblingsText,
    sibling_count,
    likes: storygen.run('#npc_likes#', seed).trimStart().trimEnd(),
    traits: storygen.run('#npc_traits#', seed).trimStart().trimEnd(),
    goals: storygen.run('#npc_goals#', seed).trimStart().trimEnd(),
    trinket_count: parseInt(storygen.run('#npc_trinket_count#', seed)),
    family_seed: memory.family_seed ?? null,
    family_sibling_count: memory.family_sibling_count ?? null,
    family_root_seed: memory.family_root_seed ?? null,
  };
  storygen.memory = {};
  return npc;
}
// Plot Hooks:
