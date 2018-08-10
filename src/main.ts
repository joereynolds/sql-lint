#!/usr/bin/env node

import * as program from "commander";
import * as process from "process";

import { categorise, tokenise } from "./lexer/lexer"

import { OddCodePoint } from "./checker/Generic_OddCodePoint";
import { IChecker } from "./checker/interface";
import { Select } from "./lexer/select"

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
    query = program.file 
}

const selectChecks: IChecker[] = [];

const genericChecks: IChecker[] = [
    new OddCodePoint()
]

const allChecks = [selectChecks, genericChecks];
const tokenised = tokenise(query);

allChecks.forEach((checks) => {
    checks.forEach((check) => {
        console.log(check.check(tokenised));
    })
});
