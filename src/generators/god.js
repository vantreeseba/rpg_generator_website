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
  deity_type: ['deity', 'ruler', 'spirit'],
  deity_memory: [
    `
#[gender_:gender]# 
#[pronoun_:pronoun]# 
#[is_:is_verb]# 
#[name_:generate_name(true).c]# 
#[species_:species]#
#[main_aspect_:aspects]#
    `,
  ],
  deity_short: [`#name_# is the #deity_type# of #main_aspect_#, #aspects# and #aspects#.`],
  deity_appearance: [
    `They appear as #gender_.a# #species_# with #hair-style# #colors# hair and #colors# eyes.`,
  ],
  deity_planar_home: [`Their divine home, the #named_location#, is on the #plane_location#.`],
  deity_followers: [`Their most dedicated followers are the "#order_name.titlize#".`],
  deity_worshippers: [`They are often worshipped by #occupations.s# and #occupations.s#.`],
  deity: [
    `
They appear as #gender_.a# #species_# with #hair-style# #colors# hair and #colors# eyes.

Their divine home, the #named_location#, is on the #plane_location#.
Their most dedicated followers are the "#order_name.titlize#".

They are often worshipped by #occupations.s# and #occupations.s#.
    `,
  ],
});

// console.log(storygen.run('#deity#').trimStart());
export default function () {
  const seed = Math.floor(Math.random() * 100000);
  storygen.run('#deity_memory#', seed);

  const deity = {
    seed,
    ...storygen.memory,
    short: storygen.run('#deity_short#').trimStart().trimEnd(),
    //     description: storygen.run('#deity#').trimStart().trimEnd(),
    planar_home: storygen.run('#deity_planar_home#').trimStart().trimEnd(),
    appearance: storygen.run('#deity_appearance#').trimStart().trimEnd(),
    followers: storygen.run('#deity_followers#').trimStart().trimEnd(),
    worshippers: storygen.run('#deity_worshippers#').trimStart().trimEnd(),
  };

  storygen.memory = {};
  return deity;
}
