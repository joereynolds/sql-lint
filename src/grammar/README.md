# Grammars

These are the (WIP) grammars for the SQL fixer.
A combination of moo (for lexxing) and nearley (for parsing.)

## Usage

You need nearley (`npm install -g nearley` or the local packaged version)

### Compiling

```
nearleyc use-statement.ne -o grammar.js
```

### Testing

(Note the use of testing the compiled .js file. Typescript support isn't great
in nearley)
```
nearley-test -i "use test;" grammar.js
```

### Sample Output

To generate sample output to spotcheck what it generates:

```
nearley-unparse grammar.js
```

(Again, you'll need to generate a JS not TS file by commenting out the
preprocessor typescript and then compiling)

## Notes

Note that these are heavily geared towards MySQL at the moment.
We might need to break these out into individual drivers at some point...
