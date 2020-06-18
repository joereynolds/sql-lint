@preprocessor typescript

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

@include "../base.ne"

statement -> drop_statements _ terminator

drop_statements -> drop_table | drop_database | drop_function | drop_event | drop_view | drop_server | drop_spatial_reference_system

drop_table -> keyword temporary table clause_if_exists name_list clause_end_options
drop_database -> keyword clause_database_or_schema _ clause_if_exists name
drop_event -> keyword event clause_if_exists name
drop_function -> keyword function name
drop_view -> keyword view clause_if_exists name_list clause_end_options
drop_server -> keyword server clause_if_exists name
drop_spatial_reference_system -> keyword spatial_reference_system clause_if_exists name

keyword -> "DROP"i __  {% (word) => word.join("") %}
temporary -> null | "TEMPORARY"i __
table -> "TABLE"i __ 
event -> "EVENT"i __
function -> "FUNCTION"i __
view -> "VIEW"i __
server -> "SERVER"i __
spatial_reference_system -> "SPATIAL"i __ "REFERENCE"i __ "SYSTEM"i __

clause_end_options -> null | __ "RESTRICT"i __ | "CASCADE"i __ 
