# Flow 

A raw query string hits `lexer.go`, `lexer.go` determines the kind of statement it is (SELECT, INSERT, CREATE TABLE etc..).
From there, it passes it on to the relevant lexer.  

i.e. if we have the statement   

```
SELECT name FROM user
```

This will hit `lexer.go`, `lexer.go` will categorise this as a `SELECT` statement which `lexer/manipulation/select.go` will then    
tokenise. The tokenised string is then passed through to every checker to look for any linting errors.
