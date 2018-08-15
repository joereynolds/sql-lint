## To run  

Run `./build.sh`, after that, you will have `sql-lint` installed locally.
This is a workaround until a package is made.

## To test  

```
./build.sh //This will run more than just the tests (recommended)
```

### Integration tests   

Integration tests are not (currently) ran on travis.
run `./tests.sh` to run the tests.

## Configuration

A configuration file for `sql-lint` should reside in `~/.config/sql-lint/config.json`

You should put the following in there for more intelligent errors to come through

```
{
    "host": "localhost",
    "user": "root",
    "password": "password"
}
```

## Troubleshooting

```
GRANT SELECT, SHOW VIEW, PROCESS, REPLICATION CLIENT ON *.* TO 'root'@'127.0.0.1' IDENTIFIED BY 'hunter2';
```


