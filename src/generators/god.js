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
    '#order_name_type# of #_main_aspect_#',
    '#simple_colors# #order_name_type# of #_main_aspect_#',
    '#simple_colors# #order_name_type#',
    '#order_name_type# of the #simple_colors#',
    '#order_name_type# of the #simple_colors# #_main_aspect_#',
  ],
  plane_location: [
    'plane of #generate_name().c#',
    'the #simple_colors# #natural_location_type#',
    '#count# layer of #generate_name().c#, the realm of #_main_aspect_#',
    '#count# layer of #generate_name().c#, the #simple_colors# #natural_location_type#',
  ],
  count: ['first', 'second', 'third', 'fourth'],
  diety_type: ['diety', 'ruler', 'spirit'],
  diety: [
    `
#[_gender_:gender]# 
#[_pronoun_:pronoun]# 
#[_is_:is_verb]# 
#[_name_:generate_name().c]# 
#[species_:species]#
#[_main_aspect_:aspects]#

#_name_# is the #diety_type# of #_main_aspect_#, #aspects# and #aspects#. 
They appear as #_gender_.a# #species_# with #hair-style# #colors# hair and #colors# eyes.

Their divine home, the #named_location#, is on the #plane_location#.
Their most dedicated followers are the "#order_name.titlize#".

They are often worshipped by #occupations.s# and #occupations.s#.
    `,
  ],
});

console.log(storygen.run('#diety#').trimStart());
