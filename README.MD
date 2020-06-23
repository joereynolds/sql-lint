# sql-lint  

![Build Status](https://travis-ci.org/joereynolds/sql-lint.svg?branch=typescript)

![Imgur](https://i.imgur.com/rJ3h34b.png)

![Imgur](https://i.imgur.com/nqi1MnT.gif)

sql-lint is a linter for SQL, it brings back any error from the supported servers
as well as custom errors written for sql-lint.

`sql-lint` will show errors about the following things (and more)

- DELETE statements missing WHERE clauses
- DROP/TRUNCATE/ALTER/CREATE statements with invalid options specified
- Odd code points in queries
- Invalid arguments to the LIMIT clause
- Hungarian notation being used (e.g. `tbl_person`)
- Any SQL server errors

\* `sql-lint` brings back errors from the supported servers too. It will catch **any** error from the server.
these include but are not limited to:

- Unknown columns on a table 
- A non existent database
- A non existent table
- Syntax errors

## Usage

`sql-lint` works on files, directories and stdin.

```
# Will lint all .sql files recursively from the current directory
sql-lint .

# Lints the create-person.sql file
sql-lint create-person.sql

# Lints stdin
echo 'DELETE FROM person;' | sql-lint
```

## Installation

There are binaries on the [releases
page](https://github.com/joereynolds/sql-lint/releases) for Mac, Linux and
Windows, this is the recommended way to install sql-lint.  

You can also do `npm install -g sql-lint`.

## Read more

To find out more, [read the documentation](https://sql-lint.readthedocs.io/)
