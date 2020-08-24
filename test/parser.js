var assert = require('assert');
const P = require('../src/parser/index.js');

var script = '';
var expectedResult = '';

describe('ScriptParser', function () {
  script = `This is a simple script!`;
  expectedResult = `This is a simple script!`;
  it('should return a simple string', function () {
    result = P.scriptParser.run(script);
    assert.equal(result.isError, false, result.error);
    assert.equal(result.result[0].type, 'plainText');
    assert.equal(result.result[0].value, expectedResult);
  });

  script = `This is a simple script\n\nwith\t\nsome\nnewlines!`;
  expectedResult = `This is a simple script\n\nwith\t\nsome\nnewlines!`;
  it("shouldn't affect whitespace", function () {
    result = P.scriptParser.run(script);
    assert.equal(result.isError, false, result.error);
    assert.equal(result.result[0].type, 'plainText');
    assert.equal(result.result[0].value, expectedResult);
  });

  script = `{# hi #}This is a simple script with a{# comment #} in the middle!{# and at the end too! #}`;
  expectedResult = `This is a simple script with a in the middle!`;
  it('should ignore comments anywhere', function () {
    result = P.scriptParser.run(script);
    assert.equal(result.isError, false, result.error);
    assert.equal(result.result[0].type, 'plainText');
    assert.equal(result.result[0].value, expectedResult);
  });

  script = `\\{{# \\\\hi #}This is a s\\\\imple script with a{# comment #} in\\{ the middle!{# and at the end too! #}\\{`;
  expectedResult = `{This is a s\\imple script with a in{ the middle!{`;
  it('should unescape escaped characters anywhere', function () {
    result = P.scriptParser.run(script);
    assert.equal(result.isError, false, result.error);
    assert.equal(result.result[0].type, 'plainText');
    assert.equal(result.result[0].value, expectedResult);
  });
});
