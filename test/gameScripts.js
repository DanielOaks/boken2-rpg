import { describe, it } from 'mocha';

const assert = require('assert');
const S = require('../src/gameScripts/index.js');

describe('Script Parsing', () => {
  describe('plainText', () => {
    it('should return a simple string', () => {
      const script = `This is a simple script!`;
      const expectedResult = `This is a simple script!`;
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.equal(result.result.length, 1);
      assert.equal(result.result[0].type, 'plainText');
      assert.equal(result.result[0].value, expectedResult);
    });

    it("should leave whitespace alone", () => {
      const script = `This is a simple script\n\nwith\t\nsome\nnewlines!`;
      const expectedResult = `This is a simple script\n\nwith\t\nsome\nnewlines!`;
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.equal(result.result.length, 1);
      assert.equal(result.result[0].type, 'plainText');
      assert.equal(result.result[0].value, expectedResult);
    });

    it('should ignore comments anywhere', () => {
      const script = `{# hi #}This is a simple script with a{# comment #} in the middle!{# and at the end too! #}`;
      const expectedResult = `This is a simple script with a in the middle!`;
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.equal(result.result.length, 1);
      assert.equal(result.result[0].type, 'plainText');
      assert.equal(result.result[0].value, expectedResult);
    });

    it('should unescape characters anywhere', () => {
      const script = `\\{{# \\\\hi #}This is a s\\\\imple script with a{# comment #} in\\{ the middle!{# and at the end too! #}\\{`;
      const expectedResult = `{This is a s\\imple script with a in{ the middle!{`;
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.equal(result.result.length, 1);
      assert.equal(result.result[0].type, 'plainText');
      assert.equal(result.result[0].value, expectedResult);
    });
  });

  describe('formula parsing', () => {
    it('should parse a simple variable', () => {
      const script = ` player.name`;
      const expectedResult = {
        type: 'variable',
        value: 'player.name'
      };
      const result = S.formulaParser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.deepEqual(result.result, expectedResult);
    });
  });

  describe('printing', () => {
    it('should print a simple variable', () => {
      const script = `{{ player.na3me }}`;
      const expectedResult = {
        type: 'variable',
        value: 'player.na3me'
      };
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.equal(result.result.length, 1);
      assert.equal(result.result[0].type, 'print');
      assert.deepEqual(result.result[0].value, expectedResult);
    });
  });

  describe('combined', () => {
    it('should parse a script with both plain text and print tags', () => {
      const script = `Hey there {{player.name}}, how are you today?{{ someVar }}{{ someVar3 }}`;
      const expectedResult = [
        { type: 'plainText', value: 'Hey there ' },
        { type: 'print', value: { type: 'variable', value: 'player.name' } },
        { type: 'plainText', value: ', how are you today?' },
        { type: 'print', value: { type: 'variable', value: 'someVar' } },
        { type: 'print', value: { type: 'variable', value: 'someVar3' } },
      ];
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.deepEqual(result.result, expectedResult);
    });
  });
});


describe('Script Running', () => {
  describe('plainText', () => {
    it('should run a simple script with no variables or tags', () => {
      const script = `This is a simple script!`;
      const expectedResult = `This is a simple script!`;
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      const result2 = S.run(result);
      assert.equal(result2, expectedResult);
    });

    it("should leave whitespace alone", () => {
      const script = `This is a simple script\n\nwith\t\nsome\nnewlines!`;
      const expectedResult = `This is a simple script\n\nwith\t\nsome\nnewlines!`;
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      const result2 = S.run(result);
      assert.equal(result2, expectedResult);
    });

    it('should ignore comments anywhere', () => {
      const script = `{# hi #}This is a simple script with a{# comment #} in the middle!{# and at the end too! #}`;
      const expectedResult = `This is a simple script with a in the middle!`;
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      const result2 = S.run(result);
      assert.equal(result2, expectedResult);
    });

    it('should unescape characters anywhere', () => {
      const script = `\\{{# \\\\hi #}This is a s\\\\imple script with a{# comment #} in\\{ the middle!{# and at the end too! #}\\{`;
      const expectedResult = `{This is a s\\imple script with a in{ the middle!{`;
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      const result2 = S.run(result);
      assert.equal(result2, expectedResult);
    });
  });

  describe('complex scripts', () => {
    it('should print a simple variable', () => {
      const script = `{{ player.name }}`;
      const vars = {
        'player.name': 'Alice',
      }
      const expectedResult = 'Alice';
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      const result2 = S.run(result, vars);
      assert.equal(result2, expectedResult);
    });

    it('should parse a script with both plain text and print tags', () => {
      const script = `{# welcome script #}Hey there {{player.name}}, how are you today? {{ npc.boss.name}}{{ situation }}`;
      const vars = {
        'player.name': 'Alice',
        'npc.boss.name': 'Jeremy',
        'situation': ` really messed up the orders, so we're kinda swamped`,
      }
      const expectedResult = `Hey there Alice, how are you today? Jeremy really messed up the orders, so we're kinda swamped`
      const result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      const result2 = S.run(result, vars);
      assert.equal(result2, expectedResult);
    });
  });
});
