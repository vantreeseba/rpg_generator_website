const { storygen } = require('./base');

storygen.mergeGrammar(require('../data/generators/quest.json'));
storygen.mergeGrammar({
  quest_trinket: ['It is #trinkets.a#.'],

  quest_hooks: [
    '#person.capitalize# #meeting_places# tells of #location_type_populated.a# threatened by #threats.a#.\n#rumors#',
    '#person.capitalize# #meeting_places# tells of #weird_natural_places.a#.\n#rumors#',
    'The nearest #location_type_populated# gates are shut, and many soldiers are stationed nearby.\n#rumors#',
    'A strange #materials_metals# #weapons# is lying in the crossroads, should you pick it up?',
    "A young #species# appears in the party's camp one night, sitting by the fire. \nThey never speak, and cannot be physically touched.\nThey stay for one hour and then vanish, this happens every night for a week.",
    'A huge blackend circle of scorched earth, in the center is the body of a #species# and they are holding #materials_metals.a# #weapons#.',
    'A huge blackend circle of scorched earth, in the center is the body of a #species# and they are holding #trinkets.a#.',
    'In the middle of the path lies #trinkets.a#.',
    'Reports of a #species# child lost in the nearby area.\nThey say they had gone missing before, and had been found in a local #location_type_natural#, stone cold and refusing to speak.',
    'Two #species# groups are engaged in murderous warfare on one another.\nOne leader has a #cursed_item#.',
    'A group of #species.pluralize# suddenly teleports into the area, see the party and yell at them to run while they can.\nThey leave behind a #trinkets#.',
    'A #traveler_types# #meeting_places# reported a dangerous section of road that passes by the nearby #location_type_natural#.\n#species.capitalize# #raider_types# have taken a bridge and are extorting people.',
    'A #traveler_types# #meeting_places# warns of a swarm of enraged #animals_wild.toLowerCase.pluralize# that have been attacking people.\nThey say it is the fault of the local ruler #generate_name().titlize# in the nearby #location_type_populated#.\nThe ruler seems completly disinterested in helping.',
    'A noise grows louder and louder, until #species.a# falls into the ground.\nDid they survive, and where did they come from?',
  ],
});

export default function GenerateQuest(seed) {
  storygen.memory = {};
  seed = seed === undefined ? Math.floor(Math.random() * 100000) : seed;
  storygen.run('#generate_name(true)#', seed); //reset the language generator to the current seed.

  const hook = storygen.run('#plot_hooks#', seed);
  storygen.memory = {};

  const quest = {
    title: storygen.run('#quest_title#', seed),
    short: storygen.run('#quest_tasks#', seed),
    item: storygen.run('#quest_trinket#', seed),
    hook,
  };
  storygen.memory = {};
  return quest;
}

// console.log(storygen.run("#locality#").trimStart());
