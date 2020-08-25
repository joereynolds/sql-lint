clause_database_or_schema -> "DATABASE"i __ | "SCHEMA"i __
clause_if_exists -> null | "IF"i __ "EXISTS"i __
clause_if_not_exists -> null | "IF"i __ "NOT"i __ "EXISTS"i __

name -> [a-z]:+ {% (word) => word[0].join("") %}
name_list -> name | name_list __ "," name_list _

terminator -> ";"

equals -> "="
optional_equals -> null | equals
yes -> "Y"
no -> "N"
yes_or_no -> yes | no

trigger -> "TRIGGER"i __
