var assert = require('assert');
const S = require('../src/script/index.ts');

describe('ScriptParser', function () {
  describe('plainText', function () {
    it('should return a simple string', function () {
      const script = `This is a simple script!`;
      const expectedResult = `This is a simple script!`;
      let result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.equal(result.result.length, 1);
      assert.equal(result.result[0].type, 'plainText');
      assert.equal(result.result[0].value, expectedResult);
    });

    it("should leave whitespace alone", function () {
      const script = `This is a simple script\n\nwith\t\nsome\nnewlines!`;
      const expectedResult = `This is a simple script\n\nwith\t\nsome\nnewlines!`;
      let result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.equal(result.result.length, 1);
      assert.equal(result.result[0].type, 'plainText');
      assert.equal(result.result[0].value, expectedResult);
    });

    it('should ignore comments anywhere', function () {
      const script = `{# hi #}This is a simple script with a{# comment #} in the middle!{# and at the end too! #}`;
      const expectedResult = `This is a simple script with a in the middle!`;
      let result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.equal(result.result.length, 1);
      assert.equal(result.result[0].type, 'plainText');
      assert.equal(result.result[0].value, expectedResult);
    });

    it('should unescape characters anywhere', function () {
      const script = `\\{{# \\\\hi #}This is a s\\\\imple script with a{# comment #} in\\{ the middle!{# and at the end too! #}\\{`;
      const expectedResult = `{This is a s\\imple script with a in{ the middle!{`;
      let result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.equal(result.result.length, 1);
      assert.equal(result.result[0].type, 'plainText');
      assert.equal(result.result[0].value, expectedResult);
    });
  });

  describe('formula parsing', function () {
    it('should parse a simple variable', function () {
      const script = ` player.name`;
      const expectedResult = {
        type: 'variable',
        value: 'player.name'
      };
      let result = S.formulaParser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.deepEqual(result.result, expectedResult);
    });
  });

  describe('printing', function () {
    it('should print a simple variable', function () {
      const script = `{{ player.na3me }}`;
      const expectedResult = {
        type: 'variable',
        value: 'player.na3me'
      };
      let result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.equal(result.result.length, 1);
      assert.equal(result.result[0].type, 'print');
      assert.deepEqual(result.result[0].value, expectedResult);
    });
  });

  describe('combined', function () {
    it('should parse a script with both plain text and print tags', function () {
      const script = `Hey there {{player.name}}, how are you today?{{ someVar }}{{ someVar3 }}`;
      const expectedResult = [
        { type: 'plainText', value: 'Hey there ' },
        { type: 'print', value: { type: 'variable', value: 'player.name' } },
        { type: 'plainText', value: ', how are you today?' },
        { type: 'print', value: { type: 'variable', value: 'someVar' } },
        { type: 'print', value: { type: 'variable', value: 'someVar3' } },
      ];
      let result = S.parser.run(script);
      assert.equal(result.isError, false, result.error);
      assert.deepEqual(result.result, expectedResult);
    });
  });
});
