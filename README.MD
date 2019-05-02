# sql-lint  

![Build Status](https://travis-ci.org/joereynolds/sql-lint.svg?branch=typescript)

![Imgur](https://i.imgur.com/Le90iGL.png)

![Imgur](https://i.imgur.com/JgAhLFp.png)

![Imgur](https://i.imgur.com/lo7MMoI.png)

sql-lint is a linter for SQL, it brings back any error from the supported servers
as well as custom errors written for sql-lint.

`sql-lint` will show errors about the following things

- DELETE statements missing WHERE clauses
- DROP/TRUNCATE/ALTER/CREATE statements with invalid options specified
- Odd code points in queries
- Any MySQL error*

* `sql-lint` brings back errors from the supported servers too. It will catch **any** error from the server.
these include but are not limited to:

- Unknown columns on a table 
- A non existent database
- A non existent table
- Syntax errors

etc...

## Supported servers

As of now, `sql-lint` supports the following servers:

- Mysql
- Postgres

Others can be added but I don't use them. Raise an issue with the server you want to be supported and I'll get around to it.

## Running / Installation

There are binaries on the [releases page](https://github.com/joereynolds/sql-lint/releases) for Mac, Linux and Windows.

### Linting a query

sql-lint works on queries with the `--query` flag.

```
> sql-lint --query="DELETE FROM test;"
query:1 Delete missing WHERE, intentional?
```

### Linting a file  

sql-lint works on files with the `--file` flag.

```
> sql-lint --file="test/test-files/test.sql" 
test/test-files/test.sql:13 [sql-lint: odd-code-point] Unexpected code point.
test/test-files/test.sql:29 [sql-lint: missing-where] DELETE statement missing WHERE clause.
test/test-files/test.sql:47 [sql-lint: missing-where] DELETE statement missing WHERE clause.
test/test-files/test.sql:55 [sql-lint: invalid-drop-option] Option 'thing' is not a valid option, must be one of '["database","event","function","index","logfile","procedure","schema","server","table","view","tablespace","trigger"]'.
test/test-files/test.sql:61 [sql-lint: invalid-create-option] Option 'test' is not a valid option, must be one of '["algorithm","database","definer","event","function","index","procedure","server","table","tablespace","temporary","trigger","user","view"]'.
test/test-files/test.sql:67 [sql-lint: invalid-truncate-option] Option 'something' is not a valid option, must be one of '["table"]'.
test/test-files/test.sql:73 [sql-lint: invalid-alter-option] Option 'mlady' is not a valid option, must be one of '["online","offline","ignore","database","event","function","procedure","server","table","tablespace","view"]'.
test/test-files/test.sql:8 [sql-lint: database-not-found] Database 'test' does not exist.
test/test-files/test.sql:9 [sql-lint: database-not-found] Database 'non_existent_database' does not exist.
test/test-files/test.sql:13 [ER_PARSE_ERROR] You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'FRO�' at line 1
test/test-files/test.sql:16 [ER_NO_DB_ERROR] No database selected
test/test-files/test.sql:26 [ER_NO_SUCH_TABLE] Table 'symfony.gig' doesn't exist
test/test-files/test.sql:43 [ER_NO_SUCH_TABLE] Table 'symfony.dont_exist' doesn't exist
```

### Linting stdin

sql-lint works with stdin if you don't supply any arguments.


```
> echo "DELETE FROM test;" | sql-lint
stdin:1 Delete missing WHERE, intentional?
```

## Editor integration   

There is a patch [here](https://github.com/joereynolds/sql-lint/issues/30) which will allow `sql-lint` to work with ALE
for Vim and Neovim.

## Configuration

Configuring `sql-lint` with connection details allows errors from the server to come through.
You'll probably want these as they supply even more information about what's going wrong.

You can read more about it in `./doc/configuration.md`.

## Contributing

### To test  

```
./build/build.sh //This will run more than just the tests (recommended)
```

### Working with the docker container

First, make sure port `3306` is available locally.
(You can do this by inspecting the output of `sudo lsof -i :3306` and `docker ps` and `kill`ing anything using that port)
Now do:

```
docker-compose up --build -d --force-recreate
```

At this point the container(s) will be up and ready to use.
You can login with the following credentials: `mysql -u root -ppassword`.

Here's an example of a query:

```
docker exec sqllint_mysql_1 mysql -u root -ppassword -e "SHOW DATABASES"
```

### Connecting sql-lint to the docker container

Change your config file in `~/.config/sql-lint/config.json` to have the following values:

```
{
    "driver": "mysql",
    "host": "localhost",
    "user": "root",
    "password": "password"
}
```

## Troubleshooting

Having an issue? Check out `./doc/troubleshooting.md`.
