# Checks

`sql-lint` comes with its own suite of checks. Aside from its own checks, it
also returns any errors from the SQL server you have connected to. Generally
you'll find that the errors from `sql-lint` are more informative than those from
the server. That said, you will still want errors from the server as it covers
more cases and will catch things that `sql-lint` does not.

## Reference

### unmatched-parentheses

Shown when a query has an unbalanced amount of parentheses.

#### Example output
```
test/test-files//test.sql:16 [sql-lint: unmatched-parentheses] Unmatched parentheses.
```

### missing-where

Shown when a `DELETE` statement is missing a `WHERE` clause.

#### Example output

```
test/test-files/test.sql:20 [sql-lint: missing-where] DELETE statement missing WHERE clause.
```

### invalid-drop-option

Shown when an invalid option is given to the `DROP` statement.

#### Example output

```
test/test-files/test.sql:22 [sql-lint: invalid-drop-option] Option 'thing' is not a valid option, must be one of '["database","event","function","index","logfile","procedure","schema","server","table","view","tablespace","trigger"]'.
```

### invalid-create-option

Shown when an invalid option is given to the `CREATE` statement.

#### Example output

```
:24 [sql-lint: invalid-create-option] Option 'test' is not a valid option, must be one of '["algorithm","database","definer","event","function","index","or","procedure","server","table","tablespace","temporary","trigger","user","unique","view"]'.
```

### invalid-truncate-option

Shown when an invalid option is given to the `TRUNCATE` statement.

#### Example output

```
test/test-files/test.sql:26 [sql-lint: invalid-truncate-option] Option 'something' is not a valid option, must be one of '["table"]'.
```

### invalid-alter-option

Shown when an invalid option is given to the `ALTER` statement.

#### Example output

```
test/test-files/test.sql:28 [sql-lint: invalid-alter-option] Option 'mlady' is not a valid option, must be one of '["column","online","offline","ignore","database","event","function","procedure","server","table","tablespace","view"]'.
```

### odd-code-point

Shown when there are unsupported/unusual* code points in your code.

*<small>This check came about whilst working Microsoft Excel. Microsoft likes to
add a lot of zany characters which can subtly break your data without you
realising.</small>


#### Example output

```
test/test-files//test.sql:30 [sql-lint: odd-code-point] Unexpected code point.
```

### invalid-limit-quantifier

Shown when you specify something other than a number to the `LIMIT` statement.

#### Example output

```
test/test-files//test.sql:32 [sql-lint: invalid-limit-quantifier] Argument 'test' is not a valid quantifier for LIMIT clause.
```

### hungarian-notation

Shown when the string `sp_` or `tbl_` is present in the query.


#### Example output

```
test/test-files/test.sql:34 [sql-lint: hungarian-notation] Hungarian notation present in query
```

### trailing-whitespace

Shown when a query has trailing whitespace.

#### Example output

```
test/test-files/test.sql:34 [sql-lint: trailing-whitespace] Trailing whitespace
```
