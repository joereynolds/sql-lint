#!/usr/bin/env node

import * as program from "commander";
import * as fs from "fs";
import * as os from "os";
import * as process from "process";

import { categorise, tokenise } from "./lexer/lexer";
import { MySqlError } from "./checker/Generic_MySqlError";
import { MissingWhere } from "./checker/Delete_MissingWhere";
import { OddCodePoint } from "./checker/Generic_OddCodePoint";
import { DatabaseNotFound } from "./checker/Use_DatabaseNotFound";
import { Database } from "./database";
import { Printer } from "./printer";
import { Keyword } from "./lexer/tokens";
import { getQueryFromFile, getQueryFromLine, Query } from "./reader/reader";

const version = "0.0.7";

program
  .version(version)
  .option("-f, --file <path>", "The .sql file to lint")
  .option("-q, --query <string>", "The query to lint")
  .option(
    "-v, --verbose",
    "Brings back information on the what it's linting and the tokens generated"
  )
  .option("--host <string>", "The host for the connection")
  .option("--user <string>", "The user for the connection")
  .option("--password <string>", "The password for the connection")
  .parse(process.argv);

let queries: Query[] = [];
let prefix: string = "";
const printer: Printer = new Printer();

const config = JSON.parse(
  fs.readFileSync(`${os.homedir}/.config/sql-lint/config.json`, "utf8")
);

if (program.query) {
  queries = getQueryFromLine(program.query);
  prefix = "query";
}

if (program.file) {
  if (!fs.existsSync(program.file) && program.file !== 0) {
    printer.warnAboutFileNotFound(program.file);
    process.exit(0);
  }

  queries = getQueryFromFile(program.file);
  prefix = program.file;
}

// Read from stdin if no args are supplied
if (!program.file && !program.query) {
  queries = getQueryFromLine(fs.readFileSync(0).toString());
  prefix = "stdin";
}

const db = new Database(
  program.host || config.host,
  program.user || config.user,
  program.password || config.password
);

gatherCheckResults(queries, db);

// TODO move this elsewhere and make it return an       
// array of checks rather than immediately
// printing them out. 
//
// Then sort them by line number.
function gatherCheckResults(sqlQueries: Query[], database: Database) {

  const checkOddCodePoint = new OddCodePoint();
  const checkMissingWhere = new MissingWhere();

  sqlQueries.forEach((query: any) => {
    const content = query.getContent().trim();

    if (content) {
      const category = categorise(content);
      const tokenised: Query = tokenise(query);

      database.lintQuery(database.connection, content, (results: any) => {
        const checker = new MySqlError(results);
        printer.printCheck(checker, tokenised, prefix);
      });

      if (category === Keyword.Select) {
        const checker = checkOddCodePoint;
        printer.printCheck(checker, tokenised, prefix);
      } else if (category === Keyword.Use) {
        database.getDatabases(database.connection, (results: any) => {
          const checker = new DatabaseNotFound(results);
          printer.printCheck(checker, tokenised, prefix);
        });
      } else if (category === Keyword.Delete) {
        const checker = checkMissingWhere;
        printer.printCheck(checker, tokenised, prefix);
      }
    }
  });
}

db.connection.end();
