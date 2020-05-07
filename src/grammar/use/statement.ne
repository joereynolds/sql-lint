@preprocessor typescript

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

statement -> use_statement _ terminator

use_statement -> use name

use -> "USE"i __
name -> [a-z]:+
terminator -> ";"
