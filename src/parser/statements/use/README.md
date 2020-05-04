# Grammars

These are the (WIP) grammar files for each statement.
They use nearley for all the parsing/compiling

## Usage

```
nearleyc use-statement.ne -o use.js
```

Test it interactively with

```
nearley-test -i "use test;" use.js
```
