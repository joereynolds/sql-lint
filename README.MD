# sql-lint  

![Build Status](https://travis-ci.org/joereynolds/sql-lint.svg?branch=typescript)

![Imgur](https://i.imgur.com/Le90iGL.png)

![Imgur](https://i.imgur.com/JgAhLFp.png)

![Imgur](https://i.imgur.com/lo7MMoI.png)

sql-lint is a linter for SQL, it brings back any error from the supported servers
as well as custom errors written for sql-lint.

`sql-lint` will show errors about the following things (and more)

- DELETE statements missing WHERE clauses
- DROP/TRUNCATE/ALTER/CREATE statements with invalid options specified
- Odd code points in queries
- Invalid arguments to the LIMIT clause
- Any SQL server errors

\* `sql-lint` brings back errors from the supported servers too. It will catch **any** error from the server.
these include but are not limited to:

- Unknown columns on a table 
- A non existent database
- A non existent table
- Syntax errors


## Installation

There are binaries on the [releases
page](https://github.com/joereynolds/sql-lint/releases) for Mac, Linux and
Windows.  Or you can do `npm install -g sql-lint`

To find out more, [read the documentation](https://sql-lint.readthedocs.io/)
