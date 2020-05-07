@preprocessor typescript

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

use -> "use " _ table _ terminator {%
    function(data) {
        return {
            table: data[2]
        };
    }
%}

table -> [a-z]:+ {%
    function(data) {
        return data[0].join("");
    }
%}

terminator -> ";"
