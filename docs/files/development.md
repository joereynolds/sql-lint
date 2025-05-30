# Development

If you're interested in helping further the development of `sql-lint` then read
on. Casual users can ignore this section.

## How it works

A raw query (either from stdin, a file, or a string) hits `main.ts`.
This query then gets categorised into the type of statement it is (`SELECT`,
`INSERT`, `UPDATE`, `DELETE` etc...), as the SQL grammar is pretty damn huge, there is
a lexer per statement. This adds redundancy but increases flexibility.

Once a query has been categorised, it is then lexxed by the relevant lexer. See the
`src/lexer` directory for the inner workings.

i.e. if we have the statement

```
SELECT name FROM user
```

This will hit the lexer which will categorise this as a `SELECT` statement which
the `SELECT` lexer will then tokenise. The tokenised string is then
passed through to every checker to look for any linting errors.


## Adding a check

If you want to add your own check, read on. It's quite simple but also verbose.

This can probably be automated to make it WAY easier.

Anyway, here are the steps.

- Create a check under `src/checker/checks`
    - The name of the class is also the name of the checker so name it well
- Add your check to `src/barrel/checks.ts`
    - All checks live here so we can import them all conveniently
- Import your check in `src/checker/checkFactory.ts`
- Add your check to the `checkMap` in `src/checker/checkFactory.ts`
- Add it to the README.md so people know it's a thing
- Add it to `configuration.md`. This is an exhaustive list of the checks
- Add tests. The name of the test should match the name of the check
- Add it to `checks.md`, the main documentation for checks
- `npm run build` to compile the changes

## Troubleshooting

### `TypeError: checkMap[check] is not a constructor`

Your check is not being picked up by the `checkerRunner`. log out what the value
of `checks` is in `checkerRunner` **after** the `splice`ing.

## Testing the code

Testing requires sql-lint to be installed.

```
npm install -g sql-lint
./build/build.sh //This will run more than just the tests (recommended)
```

## Using the Docker container

First, make sure port `3306` is available locally.  (You can do this by
inspecting the output of `sudo lsof -i :3306` and `docker ps` and `kill`ing
anything using that port) Now do:

```
docker-compose up --build -d --force-recreate
```

At this point the container(s) will be up and ready to use.  You can login with
the following credentials: `mysql -u root -ppassword`.

Here's an example of a query:

```
docker exec sqllint_mysql_1 mysql -u root -ppassword -e "SHOW DATABASES"
```

### Connecting sql-lint to the Docker container

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

Optionally, you can also add `"database": "your_database_name"` if you want to connect 
to a specific database. However, most tests were written without this option.

## This documentation

This documentation is built on `sphinx` and `readthedocs`. To run it locally,
you will need the following:

- The `sql-lint` repository (documentation lies in `docs/`)
- `sphinx` to be installed (`pip install sphinx`)
- `sphinx-rtd-theme` to be installed (`pip install sphinx-rtd-theme`)
- `recommonmark` to be installed (`pip install recommonmark`)

Once those prerequisites are met, you can edit the files and see them exactly
how they would appear on readthedocs.


installed. 
