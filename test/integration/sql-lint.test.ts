/* tslint:disable-next-line */
const shelltest = require("shelltest");

const sqlLint = "./dist/src/main.js";

xtest("it warns us if it can't find a configuration file", done => {
  shelltest()
    .cmd(`${sqlLint} -f test/test-files/test.sql`)
    .expect("stdout", /Can't open file .*config\.json.*/)
    .end(done);
});

test("it tells us if it can't find a file", done => {
  shelltest()
    .cmd(`${sqlLint} -f non-existent-file`)
    .expect("stdout", "Can't open file non-existent-file. Does it exist?\n")
    .end(done);
});

test("it works with stdin", done => {
  shelltest()
    .cmd(`echo 'DELETE FROM person ;' | ${sqlLint}`)
    .expect("stdout", /.*DELETE statement missing WHERE.*/)
    .end(done);
});

// Skipping because the travis build complains about a missing configuration file.
// Should work fine locally assuming you have the config file.
xtest("it can lint a use correctly", done => {
  shelltest()
    .cmd(`echo 'USE non_existent_db ;' | ${sqlLint}`)
    .expect("stdout", /.*Database 'non_existent_db' does not exist.*/)
    .end(done);
});

// Change this to somethihng less flaky, maybe just 0.*
xtest("it brings back a version number", done => {
  shelltest()
    .cmd(`${sqlLint} --version`)
    .expect("stdout", "0.0.10\n")
    .end(done);
});
