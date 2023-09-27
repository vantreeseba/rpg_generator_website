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
  pronoun: ['#switch(_gender_, male=>he, female=>she, _=>they)#'],
  is_verb: ['#switch(_pronoun_, he=>is, she=>is, they=>are)#'],
  order_name_type: [
    'order',
    'knights',
    'followers',
    'sect',
    'lovers',
    'bringers',
    'fraternity',
    'sorority',
    'children',
    'communion',
    'wanderers',
    'gathering',
    'oracles',
    'creed',
    'cult',
    'chosen',
  ],
  order_name: [
    '#order_name_type# of #main_aspect_#',
    '#simple_colors# #order_name_type# of #main_aspect_#',
    '#simple_colors# #order_name_type#',
    '#order_name_type# of the #simple_colors#',
    '#order_name_type# of the #simple_colors# #main_aspect_#',
  ],
  plane_location: [
    'plane of #generate_name().c#',
    'the #simple_colors# #natural_location_type#',
    '#count# layer of #generate_name().c#, the realm of #main_aspect_#',
    '#count# layer of #generate_name().c#, the #simple_colors# #natural_location_type#',
  ],
  count: ['first', 'second', 'third', 'fourth'],
  diety_type: ['diety', 'ruler', 'spirit'],
  diety_memory: [
    `
#[gender_:gender]# 
#[pronoun_:pronoun]# 
#[is_:is_verb]# 
#[name_:generate_name().c]# 
#[species_:species]#
#[main_aspect_:aspects]#
    `,
  ],
  diety_short: [`#name_# is the #diety_type# of #main_aspect_#, #aspects# and #aspects#.`],
  diety_appearance: [
    `They appear as #gender_.a# #species_# with #hair-style# #colors# hair and #colors# eyes.`,
  ],
  diety_planar_home: [`Their divine home, the #named_location#, is on the #plane_location#.`],
  diety_followers: [`Their most dedicated followers are the "#order_name.titlize#".`],
  diety_worshippers: [`They are often worshipped by #occupations.s# and #occupations.s#.`],
  diety: [
    `
They appear as #gender_.a# #species_# with #hair-style# #colors# hair and #colors# eyes.

Their divine home, the #named_location#, is on the #plane_location#.
Their most dedicated followers are the "#order_name.titlize#".

They are often worshipped by #occupations.s# and #occupations.s#.
    `,
  ],
});

// console.log(storygen.run('#diety#').trimStart());
export default function () {
  const seed = Math.floor(Math.random() * 100000);
  storygen.run('#diety_memory#', seed);

  const diety = {
    seed,
    ...storygen.memory,
    short: storygen.run('#diety_short#').trimStart().trimEnd(),
    //     description: storygen.run('#diety#').trimStart().trimEnd(),
    planar_home: storygen.run('#diety_planar_home#').trimStart().trimEnd(),
    appearance: storygen.run('#diety_appearance#').trimStart().trimEnd(),
    followers: storygen.run('#diety_followers#').trimStart().trimEnd(),
    worshippers: storygen.run('#diety_worshippers#').trimStart().trimEnd(),
  };

  storygen.memory = {};
  return diety;
}
