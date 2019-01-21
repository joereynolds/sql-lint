#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fs = require("fs");
const process = require("process");
const lexer_1 = require("./lexer/lexer");
const mySqlError_1 = require("./checker/checks/generic/mySqlError");
const missingWhere_1 = require("./checker/checks/delete/missingWhere");
const oddCodePoint_1 = require("./checker/checks/generic/oddCodePoint");
const databaseNotFound_1 = require("./checker/checks/use/databaseNotFound");
const database_1 = require("./database");
const printer_1 = require("./printer");
const tokens_1 = require("./lexer/tokens");
const reader_1 = require("./reader/reader");
const config_1 = require("./config");
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
const db = new database_1.Database(program.host || configuration.host, program.user || configuration.user, program.password || configuration.password);
gatherCheckResults(queries, db);
// TODO move this elsewhere and make it return an
// array of checks rather than immediately
// printing them out.
//
// Then sort them by line number.
function gatherCheckResults(sqlQueries, database) {
    const checkOddCodePoint = new oddCodePoint_1.OddCodePoint();
    const checkMissingWhere = new missingWhere_1.MissingWhere();
    sqlQueries.forEach((query) => {
        const content = query.getContent().trim();
        if (content) {
            const category = lexer_1.categorise(content);
            const tokenised = lexer_1.tokenise(query);
            database.lintQuery(database.connection, content, (results) => {
                const checker = new mySqlError_1.MySqlError(results);
                printer.printCheck(checker, tokenised, prefix);
            });
            if (category === tokens_1.Keyword.Select) {
                const checker = checkOddCodePoint;
                printer.printCheck(checker, tokenised, prefix);
            }
            else if (category === tokens_1.Keyword.Use) {
                database.getDatabases(database.connection, (results) => {
                    const checker = new databaseNotFound_1.DatabaseNotFound(results);
                    printer.printCheck(checker, tokenised, prefix);
                });
            }
            else if (category === tokens_1.Keyword.Delete) {
                const checker = checkMissingWhere;
                printer.printCheck(checker, tokenised, prefix);
            }
        }
    });
}
db.connection.end();
//# sourceMappingURL=main.js.map