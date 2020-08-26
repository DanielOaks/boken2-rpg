// here is where we actually parse scripts.
// currently supported:
//
// [x] plain text
// [x] comments
// [x] printing variables
// [ ] general formulas, e.g. {{ player.attribute.strength }}
// [ ] conditionals, i.e. if
// [ ] raw blocks
// [ ] loops
const A = require('arcsecond');


const variableParser = A.sequenceOf([A.optionalWhitespace, A.letter, A.many(A.choice([A.letter, A.digit, A.char('.')])).map(x => (x.join(''))), A.optionalWhitespace]).map(x => (x.join('').trim()))
.map(x => ({
  type: 'variable',
  value: x,
}));
export const formulaParser = variableParser;


const commentMatch = A.between (A.str('{#')) (A.str('#}')) (A.everyCharUntil(A.str('#}')))
.map(x => (''));

const escapedMatch = A.choice([A.str('\\\\'), A.str('\\{')])
.map(x => (x.charAt(1))); // trim escape character

const plainTextMatch = A.everyCharUntil(A.choice([A.anyOfString('\\{'), A.endOfInput]));

// the .join('')'s are safe here because textParser will never contain any other kind of
//  content.
const textParser =
  A.sequenceOf([plainTextMatch,
    A.many(
      A.choice([
        A.sequenceOf([commentMatch, plainTextMatch]).map(x => x.join('')),
        A.sequenceOf([escapedMatch, plainTextMatch]).map(x => x.join('')),
      ])
    ).map(x => x.join(''))
  ])
  .map(x => ({
  type: 'plainText',
  value: x.join(''),
}));


const printParser = A.between (A.str('{{')) (A.str('}}')) (formulaParser)
.map(x => ({
  type: 'print',
  value: x,
}));

// map slices off the endOfInput
export const parser = A.sequenceOf([A.many1(A.choice([printParser, textParser])), A.endOfInput]).map(x => (x[0]));


// here is where we take a parsed script and create the final string
// 
// variables are given like { "player.name": "Alice", "player.name.nickname": "Ally" }
function runElement(element: { type: string; value: any; }, variables: {}) {
  switch (element.type) {
    case 'plainText':
      return element.value;
    case 'print':
      return runElement(element.value, variables);
    case 'variable':
      if (variables.hasOwnProperty(element.value.toLowerCase())) {
        return variables[element.value.toLowerCase()];
      } else {
        return '[no variable named '+element.value+' found]';
      }
    default:
      return '[element type '+element.type+' not supported]';
  }
}

export function run(script: any, variables: {}) {
  if (variables === undefined) {
    variables = {};
  }

  var rootElement = script;
  if (!rootElement.type && rootElement.result) {
    rootElement = rootElement.result;
  }

  // recursively work out elements! \o/
  var output = [];
  rootElement.forEach(element => {
    output.push(runElement(element, variables));
  });

  return output.join('');
}