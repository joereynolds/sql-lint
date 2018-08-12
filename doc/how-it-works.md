# Flow 

A raw query (either from stdin, a file, or a string) hits the main `main.ts`.
This query then gets categorised into the type of statement it is (SELECT,
INSERT, UPDATE, DELETE etc...), as the SQL grammar is pretty damn huge, there is
a lexer per statement.

Once it has been categorised, it is then lexxed by the relevant lexer. See the
`src/lexer` directory for the inner workings.

i.e. if we have the statement   

```
SELECT name FROM user
```

This will hit the lexer will categorise this as a `SELECT` statement which the select lexer will then tokenise.
tokenise. The tokenised string is then passed through to every checker to look for any linting errors.

