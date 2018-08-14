#!/usr/bin/env node

import * as program from "commander";
import * as fs from "fs";
import * as os from "os";
import * as process from "process";

import { categorise, tokenise } from "./lexer/lexer";

import { MissingWhere } from "./checker/Delete_MissingWhere";
import { OddCodePoint } from "./checker/Generic_OddCodePoint";
import { IChecker } from "./checker/interface";
import { DatabaseNotFound } from "./checker/Use_DatabaseNotFound";
import { Database } from "./database";
import { Select } from "./lexer/select";
import { getQueryFromFile } from "./reader/reader";

const version = "0.0.2";

program
  .version(version)
  .option("-f, --file <path>", "The .sql file to lint")
  .option("-q, --query <string>", "The query to lint")
  .option(
    "-v, --verbose",
    "Brings back information on the what it's linting and the tokens generated"
  )
  .parse(process.argv);

let queries: string[] = [];

const config = JSON.parse(
  fs.readFileSync(`${os.homedir}/.config/sql-lint/config.json`, "utf8")
);

if (program.query) {
  queries = [program.query];
}

if (program.file) {
  queries = getQueryFromFile(program.file);
}

// Read from stdin if no args are supplied
if (!program.file && !program.query) {
  queries = [fs.readFileSync(0).toString()];
}

const db = new Database(config.host, config.user, config.password);
const checkOddCodePoint = new OddCodePoint();
const checkMissingWhere = new MissingWhere();

queries.forEach(query => {
  query = query.trim();

  if (query) {
    const category = categorise(query);
    const tokenised = tokenise(query);

    if (category === "select") {
      console.log(checkOddCodePoint.check(tokenised));
    } else if (category === "use") {
      db.getDatabases(db.connection, (results: any) => {
        const checker = new DatabaseNotFound(results);
        console.log(checker.check(tokenised));
      });
    } else if (category === "delete") {
      console.log(checkMissingWhere.check(tokenised));
    }
  }
});

db.connection.end();
