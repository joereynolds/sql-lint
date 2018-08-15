#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fs = require("fs");
const os = require("os");
const process = require("process");
const lexer_1 = require("./lexer/lexer");
const Delete_MissingWhere_1 = require("./checker/Delete_MissingWhere");
const Generic_OddCodePoint_1 = require("./checker/Generic_OddCodePoint");
const Use_DatabaseNotFound_1 = require("./checker/Use_DatabaseNotFound");
const database_1 = require("./database");
const reader_1 = require("./reader/reader");
const version = "0.0.2";
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
const config = JSON.parse(fs.readFileSync(`${os.homedir}/.config/sql-lint/config.json`, "utf8"));
if (program.query) {
    queries = reader_1.getQueryFromLine(program.query);
}
if (program.file) {
    queries = reader_1.getQueryFromFile(program.file);
}
// Read from stdin if no args are supplied
// if (!program.file && !program.query) {
//   queries = [new Query()fs.readFileSync(0).toString()];
// }
const db = new database_1.Database(program.host || config.host, program.user || config.user, program.password || config.password);
const checkOddCodePoint = new Generic_OddCodePoint_1.OddCodePoint();
const checkMissingWhere = new Delete_MissingWhere_1.MissingWhere();
queries.forEach(query => {
    const content = query.getContent().trim();
    if (content) {
        const category = lexer_1.categorise(content);
        const tokenised = lexer_1.tokenise(query);
        if (category === "select") {
            console.log(checkOddCodePoint.check(tokenised));
        }
        else if (category === "use") {
            db.getDatabases(db.connection, (results) => {
                const checker = new Use_DatabaseNotFound_1.DatabaseNotFound(results);
                console.log(checker.check(tokenised));
            });
        }
        else if (category === "delete") {
            console.log(checkMissingWhere.check(tokenised));
        }
    }
});
db.connection.end();
//# sourceMappingURL=main.js.map