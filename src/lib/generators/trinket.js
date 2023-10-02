const { storygen } = require('./base');

storygen.mergeGrammar({});

export default function GenerateTrinket(seed) {
  storygen.memory = {};
  seed = seed === undefined ? Math.floor(Math.random() * 100000) : seed;
  storygen.run('#generate_name(true)#', seed); //reset the language generator to the current seed.

  const short = storygen.run('#trinkets.a.c#', seed);

  const trinket = {
    title: storygen.memory.M_trinket_item,
    short,
  };
  storygen.memory = {};
  return trinket;
}
