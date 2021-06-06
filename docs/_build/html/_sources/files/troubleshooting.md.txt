# Troubleshooting

## I'm not seeing any warnings

Run `sql-lint your-file` and it will display the exception.
Add the `-v` flag for more information.

## It's telling me there's a syntax error when there's clearly not.

Chances are you're using an old(er) version of MySQL.
`EXPLAIN`ing on `INSERT|UPDATE|DELETE` was added in Mysql 5.6.
