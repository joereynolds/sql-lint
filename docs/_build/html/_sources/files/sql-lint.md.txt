# NAME

sql-lint - Lint MySQL files.

## SYNOPSIS
sql-lint [OPTION]...


## DESCRIPTION
-V, --version         
output the version number

-f, --file <path>     
The .sql file to lint

-q, --query <string>  
The query to lint

-v, --verbose         
Brings back information on the what it's linting and the tokens generated

--host <string>       
The host for the MySQL server connection

--user <string>       
The user for the MySQL server connection

--password <string>   
The password for the MySQL server connection

-h, --help            
Output usage information

## EXAMPLES

### stdin
```
echo "DELETE FROM person;" | sql-lint
```

### file
```
sql-lint -f test-file.sql
```

### query
```
sql-lint --query="DELETE FROM person;"
```
