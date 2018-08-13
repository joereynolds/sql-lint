#!/usr/bin/env node

import * as program from "commander";
import * as fs from "fs";
import * as os from "os";
import * as process from "process";

import { categorise, tokenise } from "./lexer/lexer"

import { MissingWhere } from "./checker/Delete_MissingWhere";
import { OddCodePoint } from "./checker/Generic_OddCodePoint";
import { IChecker } from "./checker/interface";
import { Database } from "./database";
import { Select } from "./lexer/select";

const version = "0.0.2";

program
    .version(version)
    .option("-f, --file <path>", "The .sql file to lint")
    .option("-q, --query <string>", "The query to lint")
    .option("-v, --verbose", "Brings back information on the what it's linting and the tokens generated")
    .parse(process.argv);

let query = null;


const config = JSON.parse(fs.readFileSync(`${os.homedir}/.config/sql-lint/config.json`, "utf8"));

const db = new Database(config.host, config.user, config.password)

db.getDatabases(db.connection);

if (program.query) {
    query = program.query;
}

if (program.file) {
    query = program.file 
}

if (!program.file && !program.query) {
    query = fs.readFileSync(0).toString();
}

const selectChecks: IChecker[] = [];
const deleteChecks: IChecker[] = [];

const genericChecks: IChecker[] = [
    new OddCodePoint(),
    new MissingWhere()
]

const allChecks = [selectChecks, genericChecks];
const tokenised = tokenise(query);

allChecks.forEach((checks) => {
    checks.forEach((check) => {
        console.log(check.check(tokenised));
    })
});

db.connection.end();
