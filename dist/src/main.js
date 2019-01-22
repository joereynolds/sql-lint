#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fs = require("fs");
const process = require("process");
const database_1 = require("./database");
const printer_1 = require("./printer");
const reader_1 = require("./reader/reader");
const config_1 = require("./config");
const checkerRunner_1 = require("./checker/checkerRunner");
const version = "0.0.7";
program
    .version(version)
    .option("-f, --file <path>", "The .sql file to lint")
    .option("-q, --query <string>", "The query to lint")
    .option("-v, --verbose", "Brings back information on the what it's linting and the tokens generated")
    .option("--host <string>", "The host for the connection")
    .option("--user <string>", "The user for the connection")
    .option("--password <string>", "The password for the connection")
    .parse(process.argv);
let queries = [];
let prefix = "";
const printer = new printer_1.Printer();
const configuration = config_1.getConfiguration(config_1.file);
const runner = new checkerRunner_1.CheckerRunner();
let runSimpleChecks = false;
if (program.query) {
    queries = reader_1.getQueryFromLine(program.query);
    prefix = "query";
}
if (program.file) {
    if (!fs.existsSync(program.file) && program.file !== 0) {
        printer.warnAboutFileNotFound(program.file);
        process.exit(0);
    }
    queries = reader_1.getQueryFromFile(program.file);
    prefix = program.file;
}
// Read from stdin if no args are supplied
if (!program.file && !program.query) {
    queries = reader_1.getQueryFromLine(fs.readFileSync(0).toString());
    prefix = "stdin";
}
if (configuration === null) {
    printer.warnAboutFileNotFound(config_1.file);
    runSimpleChecks = true;
}
if (runSimpleChecks) {
    runner.runSimpleChecks(queries, printer, prefix);
}
else {
    const db = new database_1.Database(program.host || configuration.host, program.user || configuration.user, program.password || configuration.password);
    runner.run(queries, db, printer, prefix);
    db.connection.end();
}
//# sourceMappingURL=main.js.map