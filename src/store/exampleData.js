// this is where I mock out and test new things
// I type things into this file, no toolz needed!!!11

export default {
  gameData: {
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
    currencyName: 'Coins',
  },

  gameState: {
    player: {
      name: {
        mainName: 'Alice',
      },
      stats: {
        armour: {
          default: 130,
          current: 100,
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
    },
  },
}
