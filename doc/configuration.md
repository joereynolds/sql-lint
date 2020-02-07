## Connecting to the DB server

You can connect in two ways:

### Via CLI

You can connect via the command line if you wish with the respective flags.

```
sql-lint --driver="mysql" --host="localhost" --user="root" --password="hunter2" --query="SELECT 1;"
```

### Via `config.json`

A configuration file for `sql-lint` can reside in `~/.config/sql-lint/config.json`

You should put the following in there for more intelligent errors to come through

```
{
    "driver": "mysql",
    "host": "localhost",
    "user": "root",
    "password": "hunter2",
    "port": 3306
}
```

## Configuration options

The configuration file for `sql-lint` enables more intelligent
errors to come through since it can query the DB server.

It follows the [XDG Base Directory
Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html). Specifically, it uses
`$HOME/.config`.

Basically, your configuration file is (or belongs) in `~/.config/sql-lint/config.json`.

### `driver`

Optional, default is `mysql`.

The driver to be used to check for errors.
Accepted ones are `mysql` and `psql`.

### `host`

The host of the database server.

### `user`

The user for the database server.

### `password`

The password to the database server.

### `port`

Optional, default it `3306`.

The port to connect to.

### `ignore-errors`

Don't want to be warned about a particular error? 
In that case add it to the `ignore-errors` array in `~/.config/sql-lint/config.json`.

```
{
    "host": "localhost",
    "user": "root",
    "password": "password",
    "ignore-errors": [
        "odd-code-point",
        "missing-where"
    ]
}
```

The example above will skip checks for odd code points and `DELETE` statements with missing `WHERE` clauses.
The available checks to skip are:

An exhaustive list is below.

```
"odd-code-point"
"missing-where"
"invalid-drop-option"
"invalid-create-option"
"invalid-truncate-option"
"invalid-alter-option"
"invalid-limit-quantifier"
```

You cannot skip checks that are returned from the DB server itself, only the checks built into `sql-lint`.

### Example configuration

The below configuration contains every option available.

```
{
    "host": "localhost",
    "user": "root",
    "password": "password",
    "ignore-errors": [
        "odd-code-point",
        "missing-where",
        "invalid-drop-option",
        "invalid-create-option",
        "invalid-truncate-option",
        "invalid-alter-option"
    ]
}
```

# A word of warning

Do not version control your configuration file unless you know what you're
doing. Stick it in your global `.gitignore` to be safe.
