@preprocessor typescript

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

statement -> create_statements _ terminator {%
    function(data) {
        return {
            keyword: data[0][0][0],
            option: data[0][0][2],
        };
    }
%}

create_statements -> create_view | create_index | create_wildcard

create_view -> keyword _ clause_or_replace _ clause_algorithm _ clause_definer _ clause_view
create_index -> keyword _ clause_index _ "INDEX" _ [A-z]:+ _ clause_index_type

create_wildcard -> keyword _ everything_else:+

clause_algorithm -> "UNDEFINED" | "MERGE" | "TEMPTABLE" | null
clause_definer -> "user" | null
clause_index -> "UNIQUE" | "FULLTEXT" | "SPATIAL" | null
clause_index_type -> "USING BTREE" | "USING HASH" | null
clause_or_replace -> "OR REPLACE" | null
clause_view -> "VIEW" [A-z]:+ 

everything_else -> [A-z]:+ _ 

# Very basic, but it will do for now
keyword -> "create"i {% (word) => word.join("") %}

option -> [A-z]:+ {% (word) => word[0].join("") %}

terminator -> ";"
