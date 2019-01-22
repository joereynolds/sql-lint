/* tslint:disable */
const shelltest = require("shelltest");
/* tslint:enable */
const sqlLint = "./dist/src/main.js";
test("it brings back a version number", done => {
    shelltest()
        .cmd(`${sqlLint} --version`)
        .expect('stdout', "0.0.7\n")
        .end(done);
});
test("it tells us if it can't find a file", done => {
    shelltest()
        .cmd(`${sqlLint} -f non-existent-file`)
        .expect('stdout', "Can't open file non-existent-file. Does it exist?\n")
        .end(done);
});
test("it works with stdin", done => {
    shelltest()
        .cmd(`echo 'DELETE FROM person ;' | ${sqlLint}`)
        .expect('stdout', /.*DELETE missing WHERE.*/)
        .end(done);
});
//# sourceMappingURL=sql-lint.test.js.map