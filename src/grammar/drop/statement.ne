# @preprocessor typescript

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

statement -> drop_statements _ terminator

drop_statements -> drop_table | drop_database

drop_table -> keyword temporary table clause_if_exists drop_table_list clause_end_options
drop_database -> keyword clause_database_or_schema _ clause_if_exists drop_database_specifier

keyword -> "DROP"i __  {% (word) => word.join("") %}
temporary -> null | "TEMPORARY"i __
table -> "TABLE"i __ 

clause_database_or_schema -> "DATABASE"i __ | "SCHEMA"i __
clause_if_exists -> null | "IF"i __ "EXISTS"i __
clause_end_options -> null | __ "RESTRICT"i __ | "CASCADE"i __ 

drop_table_list -> [a-z]:+ | drop_table_list __ "," drop_table_list _
drop_database_specifier -> [a-z]:+

terminator -> ";"
