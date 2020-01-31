# sql-lint  

> NOTE. Development is not dead but has slowed down, I no longer use SQL on a daily basis, helping hands are appreciated :)

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

## Installation

There are binaries on the [releases
page](https://github.com/joereynolds/sql-lint/releases) for Mac, Linux and
Windows.  Or you can do `npm install -g sql-lint`

## Supported drivers

As of now, `sql-lint` supports the following drivers:

- Mysql 
- psql (postgres)

Others can be added but I don't use them. Raise an issue with the server you
want to be supported and I'll get around to it.

### Linting a query

sql-lint works on queries with the `--query` flag.

```
> sql-lint --query="DELETE FROM test;"
```

### Linting a file  

sql-lint works on files with the `--file` flag.

```
> sql-lint --file="test/test-files/test.sql" 
```

### Linting stdin

sql-lint works with stdin if you don't supply any arguments.

```
> echo "DELETE FROM test;" | sql-lint
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

Testing requires sql-lint and auto-changelog to be installed.

```
npm install -g sql-lint auto-changelog
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
    "password": "password",
    "port": 3306
}
```

## Troubleshooting

Having an issue? Check out `./doc/troubleshooting.md`
