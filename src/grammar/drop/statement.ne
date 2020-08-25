@preprocessor typescript

# Testing:
#   nearleyc statement.ne -o grammar.js
#   nearley-test -i "YOUR_STATEMENT" grammar.js

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

@include "../base.ne"

statement -> drop_statements _ terminator

drop_statements -> drop_table | drop_database | drop_function | drop_procedure | drop_event | drop_view | drop_server | drop_spatial_reference_system | drop_logfile_group | drop_trigger

drop_table -> keyword temporary table clause_if_exists name_list clause_end_options
drop_database -> keyword clause_database_or_schema _ clause_if_exists name
drop_event -> keyword event clause_if_exists name
drop_function -> keyword function clause_if_exists name
drop_procedure -> keyword procedure clause_if_exists name
drop_view -> keyword view clause_if_exists name_list clause_end_options
drop_server -> keyword server clause_if_exists name
drop_spatial_reference_system -> keyword spatial_reference_system clause_if_exists name

drop_trigger -> keyword trigger clause_if_exists name {%
    function(statement) {
        return {
            statement_type: statement[0],
            trigger: statement[3]
        }
    }
%}

drop_logfile_group -> keyword logfile group name __ engine optional_equals _ name {%
    function(statement) {
        return {
            statement_type: statement[0],
            logfile: statement[3],
            engine: statement[8]
        }
    }
%}

keyword -> "DROP"i __ {% (word) => word.join("") %}

engine -> "ENGINE"i __
logfile -> "LOGFILE"i __
group -> "GROUP"i __
temporary -> null | "TEMPORARY"i __
table -> "TABLE"i __ 
event -> "EVENT"i __
function -> "FUNCTION"i __
procedure -> "PROCEDURE"i __ {% (word) => word.join("") %}
view -> "VIEW"i __
server -> "SERVER"i __
spatial_reference_system -> "SPATIAL"i __ "REFERENCE"i __ "SYSTEM"i __

clause_end_options -> null | __ "RESTRICT"i __ | "CASCADE"i __ 
