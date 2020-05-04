@preprocessor typescript

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

@{%
    const moo = require("moo");

    const lexer = moo.compile({
      keyword: ['update', 'UPDATE'],
      ws: /[ \t]+/,
      option: /[A-z\.]+/,
      terminator: ";",
      everything_else: /[A-z]+/,
    });
%}

@lexer lexer

statement -> %keyword _ %option _ %terminator {%
    function(data) {
        return {
            keyword: data[0],
            option: data[2],
        };
    }
%}
