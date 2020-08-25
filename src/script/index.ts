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
