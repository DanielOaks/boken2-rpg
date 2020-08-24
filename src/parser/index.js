const A = require('arcsecond');

const commentMatch = A.between (A.str('{#')) (A.str('#}')) (A.everyCharUntil(A.str('#}')))
.map(x => (''));

const escapedMatch = A.choice([A.str('\\\\'), A.str('\\{')])
.map(x => (x.charAt(1))); // trim escape character

const plainTextMatch = A.everyCharUntil(A.choice([A.anyOfString('\\{'), A.endOfInput]));

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

export const scriptParser = A.sequenceOf([textParser, A.endOfInput]);
