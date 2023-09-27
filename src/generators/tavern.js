const { storygen } = require("./base");

// TODO:
// trinkets
// background
// goals
// traits
// flaws

storygen.mergeGrammar({
  //   food_reasons: ["spiciness", "squishy texture", "crunchy texture", "flavor"],
  //   food_reason: ["because of the #food_reasons#"],
  mug_type: ["tankard", "mug", "goblet"],
  beer_types: [
    "bitter",
    "ale",
    "lager",
    "stout",
    "pilsner",
    "porter",
    "dunkel",
    "lambert",
    "kolsch",
    "mead",
    "gose",
    "sour",
    "rye beer",
    "wheat beer",
    "saison",
    "tripel",
    "dubbel",
    "marzen",
    "cream ale",
    "red ale",
    "pale ale",
    "amber ale",
  ],
  glass_type: ["goblet", "chalice", "glass"],
  wine_types: [
    "white wine",
    "red wine",
    "chardonnay",
    "cabernet sauvignon",
    "merlot",
    "sauvignon blanc",
    "sangiovese",
    "pinot gris",
    "pinot noir",
    "nebbiolo",
    "riesling",
    "syrah",
  ],
  tavern_type: [
    "tavern",
    "inn",
    "pub",
    "caravansary",
    "saloon",
    "bar",
    "cantina",
    "roadhouse",
    "hostelry",
  ],
  sensory_description: [
    "smell of #_smell_food_#",
    "sounds of drinking",
    "notes of a song",
    "singing of sailors",
  ],
  back_buildings_attachment: ["standing", "attached"],
  back_buildings: ["stable", "mill", "hot spring", "brewery"],
  tavern_name: ["#simple_colors# #animals#"],
  roof_types: ["thatched", "tiled", "shingled", "slate", "copper"],
  wall_types: [
    "log",
    "stone",
    "brick",
    "wattle and daub",
    "stucco",
    "timber",
    "masonary",
  ],
  positive_descriptors_windows: ["welcoming", "bright", "open"],
  tavern: [
    `
#[_name_:tavern_name]# 
#[_smell_food_:foods]#

The #_name_# is #tavern_type.a#, located in the #named_populated_location#.
It is owned by #generate_name().c# the #species.c#.

A #random(1,3)# story #wall_types# building topped with a #roof_types# roof.
#back_buildings_attachment.c# behind is #back_buildings.a#.

The #sensory_description# drifts out into the road through the #positive_descriptors_windows# windows.

  Menu:
#mug_type.c# of #beer_types#
#mug_type.c# of #beer_types#
#glass_type.c# of #wine_types#
#glass_type.c# of #wine_types#

Serving of #_smell_food_#
Serving of #foods#
Serving of #foods#

  Rumors:
#repeatDelim(rumors,2,3,n)#
    `,
  ],
});

console.log(storygen.run("#tavern#").trimStart());
