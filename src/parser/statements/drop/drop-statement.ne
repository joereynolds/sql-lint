@preprocessor typescript

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

drop_statement -> keyword _ option _ everything_else _ terminator {%
    function(data) {
        return {
            keyword: data[0],
            option: data[2],
        };
    }
%}

everything_else -> [A-z]:*

# Very basic, but it will do for now
keyword -> "drop"i {% (word) => word.join("") %}

option -> [A-z]:+ {% (word) => word[0].join("") %}

terminator -> ";"
