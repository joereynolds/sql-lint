@preprocessor typescript

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

@{%
    const moo = require("moo");

    const lexer = moo.compile({
      keyword: ['use', 'USE'],
      ws: /[ \t]+/,
      table_reference: /[A-z]+/,
      terminator: ";"
    });
%}

@lexer lexer

statement -> %keyword _ %table_reference _ %terminator {%
    function(data) {
        return {
            keyword: data[0],
            table_reference: data[2],
        };
    }
%}
