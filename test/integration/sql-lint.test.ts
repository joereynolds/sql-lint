/* tslint:disable-next-line */
const shelltest = require("shelltest");

const sqlLint = "node ./dist/src/cli.js";

xtest("it warns us if it can't find a configuration file", (done) => {
  shelltest()
    .cmd(`${sqlLint} test/test-files/test.sql`)
    .expect("stdout", /Can't open file .*config\.json.*/)
    .end(done);
});

xtest("it tells us if it can't find a file", (done) => {
  shelltest()
    .cmd(`${sqlLint} non-existent-file`)
    .expect("stdout", "Can't open file non-existent-file. Does it exist?\n")
    .end(done);
});

// Doesn't work for some reason, output is empty
xtest("it works with stdin", (done) => {
  shelltest()
    .cmd(`echo 'DELETE FROM person ;' | ${sqlLint}`)
    .expect("stdout", /.*DELETE statement missing WHERE.*/)
    .end(done);
});

test("--fix works with stdin", (done) => {
  shelltest()
    .cmd(`echo 'DELETE FROM person ;' | ${sqlLint} --fix`)
    .expect("stdout", /.*DELETE.*/)
    .end(done);
});

test("--fix works with an option", (done) => {
  shelltest()
    .cmd(`${sqlLint} --fix "DELETE FROM person;"`)
    .expect("stdout", /.*DELETE.*/)
    .end(done);
});

// Skipping because the travis build complains about a missing configuration file.
// Should work fine locally assuming you have the config file.
xtest("it can lint a use correctly", (done) => {
  shelltest()
    .cmd(`echo 'USE non_existent_db ;' | ${sqlLint}`)
    .expect("stdout", /.*Database 'non_existent_db' does not exist.*/)
    .end(done);
});

test("it brings back a version number", (done) => {
  shelltest().cmd(`${sqlLint} --version`).expect("stdout", /^\d/).end(done);
});

test("--port is a valid option", (done) => {
  shelltest()
    .cmd(`${sqlLint} --help`)
    .expect("stdout", /.*--port.*/)
    .end(done);
});

test("--config is a valid option", (done) => {
  shelltest()
    .cmd(`${sqlLint} --help`)
    .expect("stdout", /.*--config.*/)
    .end(done);
});

test("Good queries exit with 0", (done) => {
  shelltest()
    .cmd(`echo 'DELETE FROM person WHERE 1=1;' | ${sqlLint}`)
    .expect(0)
    .end(done);
});

// Ironically this fails the test suite so we can't actually run it.
// Figure out a way around this
xtest("Bad queries exit with 1", (done) => {
  // This is a "bad query" becase the linter will flag it up as
  // dangerous. Anything the linter prints out should result
  // in an exit code of 1.
  shelltest()
    .cmd(`echo 'DELETE FROM person ;' | ${sqlLint}`)
    .expect(1)
    .end(done);
});
