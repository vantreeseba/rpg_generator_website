const { storygen } = require('./base');

// TODO:
// trinkets
// background
// goals
// traits
// flaws

storygen.mergeGrammar({
  mug_type: ['tankard', 'mug', 'goblet'],
  beer_types: [
    'bitter',
    'ale',
    'lager',
    'stout',
    'pilsner',
    'porter',
    'dunkel',
    'lambert',
    'kolsch',
    'mead',
    'gose',
    'sour',
    'rye beer',
    'wheat beer',
    'saison',
    'tripel',
    'dubbel',
    'marzen',
    'cream ale',
    'red ale',
    'pale ale',
    'amber ale',
  ],
  glass_type: ['goblet', 'chalice', 'glass'],
  wine_types: [
    'white wine',
    'red wine',
    'chardonnay',
    'cabernet sauvignon',
    'merlot',
    'sauvignon blanc',
    'sangiovese',
    'pinot gris',
    'pinot noir',
    'nebbiolo',
    'riesling',
    'syrah',
  ],
  tavern_type: [
    'tavern',
    'inn',
    'pub',
    'caravansary',
    'saloon',
    'bar',
    'cantina',
    'roadhouse',
    'hostelry',
  ],
  sensory_description: [
    'smell of #smell_food_#',
    'sounds of drinking',
    'notes of a song',
    'singing of sailors',
  ],
  back_buildings_attachment: ['standing', 'attached'],
  back_buildings: ['stable', 'mill', 'hot spring', 'brewery'],
  tavern_name: [
    'The #or(symbol_adjectives, simple_colors)# #or(animals, symbols, glass_type, mug_type)#',
    'The #or(symbol_adjectives, simple_colors)# #or(animals, symbols, glass_type, mug_type)# #type_:tavern_type#',
    'The #or(animals, species, symbols, glass_type, mug_type)# and the #or(animals, species, symbols, glass_type, mug_type)#',
    'The #species# song',
  ],
  roof_types: ['thatched', 'tiled', 'shingled', 'slate', 'copper'],
  wall_types: ['log', 'stone', 'brick', 'wattle and daub', 'stucco', 'timber', 'masonary'],
  positive_descriptors_windows: ['welcoming', 'bright', 'open'],
  tavern_memory: [`#[name_:tavern_name]# #[smell_food_:foods]#`],
  tavern_short: [`#name_# is #type_:tavern_type.a#, located in the #location_populated_named#.`],
  tavern_owner_verb: ['run by', 'owned by', 'cared for by', 'managed by'],
  tavern_owner: [
    `It is #tavern_owner_verb# #generate_name(true).c# the #species#.`,
    `It is #tavern_owner_verb# the #species# #generate_name(true).c#.`,
  ],
  tavern_description: [
    `
A #random(1,3)# story #wall_types# building topped with a #roof_types# roof.
#back_buildings_attachment.c# behind is #back_buildings.a#.

The #sensory_description# drifts out into the road through the #positive_descriptors_windows# windows.
    `,
  ],
  tavern_menu: [
    `
#mug_type.c# of #beer_types#
#mug_type.c# of #beer_types#
#glass_type.c# of #wine_types#
#glass_type.c# of #wine_types#
Serving of #smell_food_#
Serving of #foods#
Serving of #foods#
    `,
  ],
  tavern_rumors: [`#repeatDelim(rumors,2,3,n)#`],
});

export default function () {
  const seed = Math.floor(Math.random() * 100000);
  storygen.run('#tavern_memory#', seed);

  const tavern = {
    ...storygen.memory,
    name: storygen.run('#name_.t#', seed).trimStart().trimEnd(),
    short: storygen.run('#tavern_short#', seed).trimStart().trimEnd(),
    description: storygen.run('#tavern_description#', seed).trimStart().trimEnd(),
    owner: storygen.run('#tavern_owner#', seed).trimStart().trimEnd(),
    menu: storygen.run('#tavern_menu#', seed).trimStart().trimEnd(),
    rumors: storygen.run('#tavern_rumors#', seed).trimStart().trimEnd(),
  };
  storygen.memory = {};
  return tavern;
}

// console.log(storygen.run("#tavern#").trimStart());
