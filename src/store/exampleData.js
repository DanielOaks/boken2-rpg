// this is where I mock out and test new things
// I type things into this file, no toolz needed!!!11

export default {
  gameData: {
    name: 'Adventures of Troto',
    stats: {
      armour: {
        fullName: 'Armour',
      },
      health: {
        fullName: 'Health',
        // uiName: 'HP',
      },
      energy: {
        fullName: 'Energy',
      }
    },
    attributes: {
      str: {
        fullName: 'Strength',
        uiName: 'STR',
      },
      dex: {
        fullName: 'Dexterity',
        uiName: 'DEX',
      },
      int: {
        fullName: 'Intelligence',
        uiName: 'INT',
      },
      cha: {
        fullName: 'Charisma',
        uiName: 'CHA',
      },
      luck: {
        fullName: 'Luck',
        uiName: 'LUCK',
      },
    },
    xpToLevel: {
      1: 500,
      2: 1000,
      3: 1500,
      4: 2000,
      5: 2000,
      6: 3000,
      7: 4000,
      8: 5000,
      9: 7500,
      10: 10000,
    },
    currencyName: 'Coins',
    regions: {
      troto: {
        name: "Troto",
        maps: {},
        regions: {
          eastTroto: {
            name: "East Troto",
            maps: {
              marketplace: {
                name: "Marketplace",
              },
              aliceHouse: {
                name: "Alice's House",
              },
            },
            regions: {},
          }
        }
      }
    },
    maps: {
      startingArea: {
        name: "Starting Area",
      },
    },
  },

  gameState: {
    player: {
      name: {
        mainName: 'Alice',
      },
      stats: {
        armour: {
          default: 130,
          current: 106,
        },
        health: {
          default: 100,
          current: 83,
        },
        energy: {
          default: 100,
          current: 100,
        }
      },
      attributes: {
        str: {
          base: 8,
          mod: 3,
        },
        dex: {
          base: 5,
          mod: 0,
        },
        int: {
          base: 4,
          mod: 0,
        },
        cha: {
          base: 12,
          mod: 2,
        },
        luck: {
          base: 7,
          mod: -1,
        },
      },
      advancement: {
        level: 2,
        xp: 135,
      },
      currency: 24700,
    },
  },
}