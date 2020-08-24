const A = require('arcsecond');

const mainScript = `This is the main Boken2 script {# hi #}parser test file! \\\\With an escaped backslash too!
\\\\ actually, with two! \\\\\\\\or four! and an escaped \\{ thing there!!

{# Boken2 Parser Test File #}

and some more text after the comment!`;

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

const scriptParser = textParser;

var result = scriptParser.run(mainScript);
console.log('ARC:');
console.log(result);
console.log(result.result.value);
