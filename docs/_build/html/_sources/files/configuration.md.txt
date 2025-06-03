# Configuration

Configuring `sql-lint` to connect to your database of choice allows even more
errors to come through. Errors that `sql-lint` wouldn't find itself. To do this
is easy, simply supply the connection details to your database in one of two
ways:

## Via CLI

```
sql-lint --driver="mysql" --host="localhost" --user="root" --password="hunter2"
```

## Via File

`sql-lint` will search the current working directory and its parent directories
for a configuration file `.sql-lint.json`. This allows you to have
directory-local configurations for different projects. If no `.sql-lint.json`
is found, it will fall back to the global configuration file.

A global configuration file for `sql-lint` can reside in
`~/.config/sql-lint/config.json`.  It follows the [XDG Base Directory
Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html).
Specifically, it uses `$HOME/.config`.

You can also manually specify a path for the config with the `--config` flag.

You should put the following in there for more intelligent errors to come through

```
{
    "driver": "mysql",
    "host": "localhost",
    "user": "root",
    "password": "hunter2",
    "port": 3306,
    "database": "your_database"
}
```

## Configuration options

An exhaustive list of the configuration options for your `config.json` file are
below.


### `driver`

The driver to be used to check for errors.
Accepted ones are `mysql` and `postgres`.

Optional, default is `mysql`.

### `host`

The host of the database server.

### `user`

The user for the database server.

### `password`

The password for the database server.

### `port`

The port to connect to.

Optional, default is `3306`.

### `database`

The database to connect to.

Optional, default is no database, where you will have to specify the database in your queries.

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

For a full list of all available checks, see [the check
documentation](./checks.md)


You cannot skip checks that are returned from the DB server itself, only the checks built into `sql-lint`.

Note that this option is also available as a flag on the cli.
i.e.

```
sql-lint --ignore-errors=trailing-whitespace some-sql-file.sql
```

Multiple errors can be comma separated:

```
sql-lint --ignore-errors=trailing-whitespace,missing-where,hungarian-notation some-sql-file.sql
```

### Example configuration

The below configuration contains every option available.

```
{
    "host": "localhost",
    "user": "root",
    "password": "password",
    "port": 3306,
    "database": "your_database",
    "ignore-errors": [
        "odd-code-point",
        "missing-where",
        "invalid-drop-option",
        "invalid-create-option",
        "invalid-truncate-option",
        "invalid-alter-option",
        "hungarian-notation",
        "trailing-whitespace"
    ]
}
```

### A word of warning

Do not version control your configuration file unless you know what you're
doing. Stick it in your global `.gitignore` to be safe.

## Editor Integration

`sql-lint` can integrate with any editor that supports external plugins.

### Vim / Neovim

#### Ale

`sql-lint` can be integrated into (Neo)Vim with [Ale](https://github.com/dense-analysis/ale/).

#### Vanilla

If you want to go without a plugin, the simplest option is to run the following:

```
:!sql-lint %
```
