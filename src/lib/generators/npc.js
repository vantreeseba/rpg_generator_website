const { storygen } = require('./base');

// TODO:
// trinkets
// background
// goals
// traits
// flaws

storygen.mergeGrammar({
  is_was: ['is', 'was'],
  he: ['he'],
  she: ['she'],
  they: ['they'],
  is: ['is'],
  are: ['are'],
  pronoun: ['#switch(gender_, male=>he, female=>she, _=>they)#'],
  is_verb: ['#switch(pronoun_, he=>is, she=>is, they=>are)#'],
  food_reasons: ['spiciness', 'squishy texture', 'crunchy texture', 'flavor'],
  food_reason: ['because of the #food_reasons#'],
  npc_memory: [
    `
#[gender_:gender]# 
#[pronoun_:pronoun]# 
#[is_:is_verb]# 
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
#pronoun_.capitalize# #is_# now living in the #location_type_populated# of #generate_name().capitalize#.
#pronoun_.capitalize# #is_# #random(18, 60)# years old.
#pronoun_.capitalize# used to be #occupations.a.toLowerCase# and now #is_# making a living as #occupations.a.toLowerCase#.
    `,
  ],
  npc_parents: [`#repeatDelim(npc_same_species, 2, 2, n)#`],
  npc_siblings: [`#repeatDelim(npc_same_species, 0, 4, n)#`],
  npc_likes: [
    `
#pronoun_.capitalize# love eating #foods#, #food_reason#.
#pronoun_.capitalize# hate eating #foods#, #food_reason#.
#pronoun_.capitalize# love watching #animals.pluralize.toLowerCase#.
#pronoun_.capitalize# are scared of #animals.pluralize.toLowerCase#.
    `,
  ],
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

  npc_goal: [
    `#pronoun_.capitalize# long #goals#.`,
    `#pronoun_.capitalize# desire #goals#.`,
    `#pronoun_.capitalize# swore #goals#.`,
    `#pronoun_.capitalize# want #goals#.`,
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
  seed = seed || Math.floor(Math.random() * 100000);
  storygen.memory = {};

  for (let key in memory) {
    let memoryKey = key + '_';
    storygen.memory[memoryKey] = memory[key];
  }

  storygen.run('#npc_memory#', seed);

  const npc = {
    ...storygen.memory,
    short: storygen.run('#npc_short#', seed).trimStart().trimEnd(),
    clothes: storygen.run('#npc_clothes#', seed).trimStart().trimEnd(),
    history: storygen.run('#npc_history#', seed).trimStart().trimEnd(),
    parents: storygen.run('#npc_parents#', seed).trimStart().trimEnd(),
    siblings: storygen.run('#npc_siblings#', seed).trimStart().trimEnd(),
    likes: storygen.run('#npc_likes#', seed).trimStart().trimEnd(),
    traits: storygen.run('#npc_traits#', seed).trimStart().trimEnd(),
    goals: storygen.run('#npc_goals#', seed).trimStart().trimEnd(),
  };
  storygen.memory = {};
  return npc;
}
// Plot Hooks:
