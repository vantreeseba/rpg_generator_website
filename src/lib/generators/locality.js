const { storygen } = require('./base');

const government_types = [
  'democracy',
  'republic',
  'democratic republic',
  'federation',
  'confederation',

  'oligarchy',
  'aristocracy',
  'theocracy',
  'plutocracy',
];

const single_leader_government_types = ['aristocracy', 'theocracy', 'plutocracy', 'federation'];
const multi_leader_government_types = [
  'democracy',
  'republic',
  'federation',
  'confederation',
  'oligarchy',
  'theocracy',
  'plutocracy',
];

const leader_type = ['king', 'prince', 'duke', 'baron', 'elder', 'priest', 'pope'];

storygen.mergeGrammar({
  government_types,
  single_leader_government_types,
  multi_leader_government_types,
  leader_type,

  locality_name: ['#generate_name(true).c#'],
  locality_npc: ['#generate_name().c#, #gender.a# #species.c#'],
  locality_memory: [
    '#[name_:locality_name]# #[leader_count:locality_leader_count]# #population:random(10, 10000)#',
  ],

  locality_government: [
    `#switch(leader_count, one=>single_leader_government_types, many=>multi_leader_government_types)#`,
  ],
  locality_leader_count: ['one', 'many'],
  locality_leaders: [
    `#switch(leader_count, one=>locality_leader_one, many=>locality_leader_many)#`,
  ],
  locality_leader: ['#leader_type_:leader_type.c# #locality_npc#'],
  locality_leader_one: ['#leader_type.c# #locality_npc#'],
  locality_leader_many: [
    `#locality_leader_one#\n#repeatDelim(locality_leader,2,5,n)#`,
    `#repeatDelim(locality_leader,2,5,n)#`,
  ],

  locality_short: ['#location_type_populated.c# of #name_#', '#name_# #location_type_populated.c#'],
  locality_worker_count: ['many', 'a large number of', 'small groups of', 'some', 'few'],
  locality_worker_types: [
    '#locality_worker_count.c# people here are #occupations.s#.',
    '#locality_worker_count.c# #species.s# here are #occupations.s#.'
  ],
  locality_workers: ['#repeatDelim(locality_worker_types, 1, 5, n)#'],

  locality_points_of_interest: [
    ''
  ],
});

export default function () {
  const seed = Math.floor(Math.random() * 100000).toString();
  storygen.run('#locality_memory#', seed);

  const locality = {
    ...storygen.memory,
    short: storygen.run('#locality_short#', seed).trimStart().trimEnd(),
    government: storygen.run('#locality_government#', seed).trimStart().trimEnd(),
    leaders: storygen.run('#locality_leaders#', seed).trimStart().trimEnd(),
    workers: storygen.run('#locality_workers#', seed).trimStart().trimEnd(),
    //     short: storygen.run('#locality_short#', seed).trimStart().trimEnd(),
    //     owner: storygen.run('#locality_owner#', seed).trimStart().trimEnd(),
    //     menu: storygen.run('#locality_menu#', seed).trimStart().trimEnd(),
    //     rumors: storygen.run('#locality_rumors#', seed).trimStart().trimEnd(),
  };
  storygen.memory = {};
  return locality;
}

// console.log(storygen.run("#locality#").trimStart());
