@preprocessor typescript

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

use_statement -> keyword _ table _ terminator {%
    function(data) {
        return {
            keyword: data[0],
            table_reference: data[2],
        };
    }
%}

# Very basic, but it will do for the `use` statement
keyword -> "use"i {% (word) => word.join("") %}

table -> [A-z]:+ {% (word) => word[0].join("") %}

terminator -> ";"
