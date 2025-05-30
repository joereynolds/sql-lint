-- To see these errors in vim, you need the patch:
-- https://github.com/joereynolds/sql-lint/issues/30
-- failing that you can do `:!sql-lint %`

-- Valid Queries (These should not display any errors)
ALTER TABLE test;
CREATE TABLE person;
DROP TABLE test;
TRUNCATE TABLE person;
DELETE
FROM 
PERSON  
WHERE something;

-- [sql-lint: trailing-whitespace]
DELETE 
FROM 
PERSON WHERE 1=1;
