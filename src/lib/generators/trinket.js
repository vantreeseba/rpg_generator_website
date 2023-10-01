const { storygen } = require('./base');

storygen.mergeGrammar({});

export default function GenerateTrinket() {
  const seed = Math.floor(Math.random() * 100000).toString();

  const short = storygen.run('#trinkets.a.c#', seed);

  const trinket = {
    title: storygen.memory.M_trinket_item,
    short,
  };
  storygen.memory = {};
  return trinket;
}

// console.log(storygen.run("#locality#").trimStart());
