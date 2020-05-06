# Grammars

These are the (WIP) grammars for the SQL fixer.
A combination of moo (for lexxing) and nearley (for parsing.)

## Usage

### Compiling

```
nearleyc use-statement.ne -o use.js
```

### Testing

(Note the use of testing the compiled .js file. Typescript support isn't great
in nearley)
```
nearley-test -i "use test;" use.js
```
