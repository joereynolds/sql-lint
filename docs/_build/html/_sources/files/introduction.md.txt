# Introduction

## What is sql-lint?

`sql-lint` is a linter for SQL dialects. It currently supports MySQL and
Postgres. It brings errors to your attention, suggests what's wrong with them,
why it may be wrong, and what you can do as a developer to fix it. Generally
these errors are more verbose and specific than those coming from an SQL server.

Here's a small excerpt of its use:

```
: sql-lint test/test-files//test.sql 
test/test-files//test.sql:16 [sql-lint: unmatched-parentheses] Unmatched parentheses.
test/test-files//test.sql:20 [sql-lint: missing-where] DELETE statement missing WHERE clause.
test/test-files//test.sql:22 [sql-lint: invalid-drop-option] Option 'thing' is not a valid option, must be one of '["database","event","function","index","logfile","procedure","schema","server","table","view","tablespace","trigger"]'.
test/test-files//test.sql:26 [sql-lint: invalid-truncate-option] Option 'something' is not a valid option, must be one of '["table"]'.
test/test-files//test.sql:30 [sql-lint: odd-code-point] Unexpected code point.
test/test-files//test.sql:32 [sql-lint: invalid-limit-quantifier] Argument 'test' is not a valid quantifier for LIMIT clause.
test/test-files//test.sql:24 [ER_PARSE_ERROR] You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'CREATE test person' at line 1
test/test-files//test.sql:39 [ER_NO_SUCH_TABLE] Table 'symfony.dont_exist' doesn't exist
```

## Usage


`sql-lint` is used from the command line in several ways.

### Via stdin

```
echo "DELETE FROM person;" | sql-lint
```

### With a file

```
sql-lint test-file.sql
```

## Command line options

### -V --version

The version of `sql-lint`. 
Useful for bug reports and confirming what features are available to you.

```
sql-lint --version
> 0.0.11
```

### -d --driver

`mysql` | `postgres`

Default is `mysql`.

The driver to use.

### -v --verbose

How verbose to be with output. `-v` will print out the output from the lexer.
Usually you do not want any verbosity. Useful for bug reports and debugging.

```
sql-lint --verbose
> ...
```

### --config

The path for the configuration file.

Default is `$HOME/.config/sql-lint/config.json`

### --format

`simple` | `json`

Default is `simple`.

The output format of `sql-lint`.

 `simple` is the most user friendly and human readable. You won't usually change
 the format unless you have a reason to.

 ```
 echo 'DELETE FROM person;' | sql-lint
> stdin:1 [sql-lint: missing-where] DELETE statement missing WHERE clause.
 ```

`json` can be used if you wish. Usually this is done for editor
integration or for consumption via some other service.

```
echo 'DELETE FROM person;' | sql-lint --format json
> {
     "source":"stdin",
     "error":"[sql-lint: missing-where] DELETE statement missing WHERE clause.",
     "line":1
}
```

### --host

The host for the connection.

### --user

The user for the connection.

### --password

The password for the connection.

### --port 

Default is `3306`.

The port for the connection.

### -h --help

```
: sql-lint -h
Usage: sql-lint [options]

Options:
  -V, --version          output the version number
  --fix [string]         The .sql string to fix
  -d, --driver <string>  The driver to use, must be one of ['mysql', 'postgres']
  -v, --verbose          Brings back information on the what it's linting and the tokens generated
  --format <string>      The format of the output, can be one of ['simple', 'json'] (default: "simple")
  --host <string>        The host for the connection
  --user <string>        The user for the connection
  --password <string>    The password for the connection
  --port <string>        The port for the connection
  --config <string>      The path to the configuration file
  -h, --help             display help for command
```

## Programmatic Access

```
import sqlLint from 'sql-lint'

// using async/await

const errors = await sqlLint({
  sql: 'SELECT my_column FROM my_table',
})

// or using promise

sqlLint({ sql: 'SELECT my_column FROM my_table' }).then(errors => {
  for (const error of errors) {
    // do something
  }
})

```

### Parameters
sql-lint accepts an object using the following interface as its only argument
```
{
  sql: string
  host?: string
  user?: string
  port?: number
  driver?: string
  prefix?: string
  password?: string
  verbosity?: number
}
```

### Notes on some of the parameters
`sql`: can have multiple queries separated by `;`

`host`: if host is not provided `sql-lint` will only perform checks that do not require a connection

`driver`: defaults to mysql

`port`: if port is not provided it will use the default port for the driver you are using

### Output
sql-lint returns an `array` of objects with the following shape

```
{
  line: number
  error: string
  source: string
  additionalInformation: string
}
```
