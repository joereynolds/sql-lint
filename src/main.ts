#!/usr/bin/env node

import * as program from "commander";
import * as fs from "fs";
import * as process from "process";

import { Database } from "./database";
import { Printer } from "./printer";
import { getQueryFromFile, getQueryFromLine, Query } from "./reader/reader";
import { file, getConfiguration } from "./config";
import { CheckerRunner } from "./checker/checkerRunner";

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
const configuration = getConfiguration(file);
const runner = new CheckerRunner();
let runSimpleChecks: boolean = false;

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

if (configuration === null) {
  printer.warnAboutFileNotFound(file);
  runSimpleChecks = true;
}

if (runSimpleChecks) {
  runner.runSimpleChecks(queries, printer, prefix);
} else {
  const db = new Database(
    program.host || configuration.host,
    program.user || configuration.user,
    program.password || configuration.password
  );
  runner.run(queries, db, printer, prefix);
  db.connection.end();
}
