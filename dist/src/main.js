#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const process = require("process");
const lexer_1 = require("./lexer/lexer");
const Generic_OddCodePoint_1 = require("./checker/Generic_OddCodePoint");
const version = "0.0.2";
program
    .version(version)
    .option("-f, --file <path>", "The .sql file to lint")
    .option("-q, --query <string>", "The query to lint")
    .option("-v, --verbose", "Brings back information on the what it's linting and the tokens generated")
    .parse(process.argv);
let query = "";
if (program.query) {
    query = program.query;
}
if (program.file) {
    query = program.file;
}
const selectChecks = [];
const genericChecks = [
    new Generic_OddCodePoint_1.OddCodePoint()
];
const allChecks = [selectChecks, genericChecks];
const tokenised = lexer_1.tokenise(query);
allChecks.forEach((checks) => {
    checks.forEach((check) => {
        console.log(check.check(tokenised));
    });
});
//# sourceMappingURL=main.js.map