const { storygen } = require('./base');

storygen.mergeGrammar({});

export default function GenerateTrinket(seed) {
  seed = seed === undefined ? Math.floor(Math.random() * 100000) : seed;

  const short = storygen.run('#trinkets.a.c#', seed);

  const trinket = {
    title: storygen.memory.M_trinket_item,
    short,
  };
  storygen.memory = {};
  return trinket;
}
