#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const process = require("process");
const version = "0.0.2";
program
    .version(version)
    .option("-f, --file <path>", "The .sql file to lint")
    .option("-q, --query <string>", "The query to lint")
    .option("-v, --verbose", "Brings back information on the what it's linting and the tokens generated")
    .parse(process.argv);
if (program.query) {
    console.log("Linting query");
}
if (program.file) {
    console.log("Linting file");
}
console.log("working");
//# sourceMappingURL=main.js.map