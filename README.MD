# sql-lint  

![Imgur](https://i.imgur.com/Le90iGL.png)

sql-lint is a linter for MySQL, it brings back any error from the MySQL server
as well as custom errors written for sql-lint.

An example of some of the checks performed

- DELETE statements missing WHERE clauses
- Databases not found
- Tables not found
- Weird characters in a query where they shouldn't be

Any others!

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
> sql-lint --file="test/test.sql" 
test/test.sql:13 Bad code point
test/test.sql:40 Delete missing WHERE, intentional?
test/test.sql:6 Database 'test' does not exist.
test/test.sql:10 Database 'dykes_reservations' does not exist.
test/test.sql:11 Database 'dykes_res' does not exist.
test/test.sql:13 [ER_PARSE_ERROR] You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'FRO�' at line 1
test/test.sql:16 [ER_NO_DB_ERROR] No database selected
test/test.sql:29 [ER_NO_DB_ERROR] No database selected
test/test.sql:54 [ER_NO_SUCH_TABLE] Table 'symfony.dont_exist' doesn't exist
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

You can connect in two ways:

### Via CLI

You can connect via the command line if you wish with the respective flags.

```
sql-lint --host="localhost" --user="root" --password="hunter2" --query="SELECT 1;"
```

### Via `config.json`

A configuration file for `sql-lint` can reside in `~/.config/sql-lint/config.json`

You should put the following in there for more intelligent errors to come through

```
{
    "host": "localhost",
    "user": "root",
    "password": "hunter2"
}
```

## Contributing

### To test  

```
./build.sh //This will run more than just the tests (recommended)
```

### Integration tests   

Integration tests are not (currently) ran on travis.
run `./tests.sh` to run the tests.

### Working with the docker container

First, make sure port `3306` is available locally.
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
