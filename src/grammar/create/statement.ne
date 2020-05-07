@preprocessor typescript

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

@include "../base.ne"

statement -> create_statements _ terminator

# create_statements -> create_view | create_index | create_wildcard
create_statements -> create_database

create_view -> keyword clause_or_replace clause_algorithm _ clause_definer _ clause_view
create_index -> keyword clause_index _ "INDEX" _ [A-z]:+ _ clause_index_type
create_database -> keyword clause_database_or_schema clause_if_not_exists name __ option_create_option

keyword -> "CREATE"i __ {% (word) => word.join("") %}
default -> "DEFAULT"i __
character_set -> "CHARACTER"i __ "SET"i _
collate -> "COLLATE"i __
encryption -> "ENCRYPTION"i __

character_set_choice -> (null | default) character_set (null | equals) name
collate_choice -> (null | default) collate (null | equals) name
encryption_choice -> (null | default) encryption (null | equals) yes_or_no

option_create_option -> null | (character_set_choice | collate_choice | encryption_choice)

clause_algorithm -> "UNDEFINED" | "MERGE" | "TEMPTABLE" | null
clause_definer -> "user" | null
clause_index -> "UNIQUE" | "FULLTEXT" | "SPATIAL" | null
clause_index_type -> "USING BTREE" | "USING HASH" | null
clause_or_replace -> null | "OR REPLACE" __
clause_view -> "VIEW" [A-z]:+ 
