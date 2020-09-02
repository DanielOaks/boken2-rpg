# Boken2-RPG Script Parser

This parses/executes Boken2-RPG scripts, what our pages are written in. It's inspired by [Liquid](https://shopify.github.io/liquid/) to some extent.

## Language Overview

- `\\`: Backslash.
- `\{`: Print the bracket.
- `{{ variable }}`: Print the enclosed variable/expression.
- `{# comment #}`: Everything inside is a comment.
- `{% control-statement %}`: Control statements (if, elseif, else, endif, etc).

## Control Statements

- `if *expression*`: If statement, will only execute if `expression` is true.
- `elseif *expression*`: Elseif statement, will only execute if `expression` is true.
- `else`: Else statement, executes if none of the `if` or `elseif` statements are true.
- `endif`: Closes the `if` block(s).
- `raw`: Everything inside this will be output as-is without any parsing, until an `endraw` is reached.
- `endraw`: Closes the `raw` block


### Todo

- Case control statement (switch/case is standard C terminology, Liquid uses case/when which feels maybe a bit more readable?).
- For iteration statement (Liquid has else, break, continue, limit, offset, and range that can be used with for statements which are fun).
- Assign variable statement.
- Capture variable statement.
- Increment variable statement?
- Decrement variable statement?
- Outputting standard variables (player name, pronouns, attributes, etc), including `standardName, CapitalisedName, SHOUTINGNAME` modifiers by case.
