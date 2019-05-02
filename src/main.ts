#!/usr/bin/env node

import * as program from "commander";
import * as fs from "fs";
import * as process from "process";

import { Database } from "./database";
import { Printer } from "./printer";
import { getQueryFromFile, getQueryFromLine } from "./reader/reader";
import { Query } from "./reader/query";
import { file, getConfiguration } from "./config";
import { CheckerRunner } from "./checker/checkerRunner";
import { version } from "../package.json";
import { FormatterFactory } from "./formatter/formatterFactory";

program
  .version(version)
  .option("-f, --file <path>", "The .sql file to lint")
  .option("-q, --query <string>", "The query to lint")
  .option(
    "-d, --driver <string>",
    "The driver to use, must be one of ['mysql', 'postgres']"
  )
  .option(
    "-v, --verbose",
    "Brings back information on the what it's linting and the tokens generated"
  )
  .option(
    "--format <string>",
    "The format of the output, can be one of ['simple', 'json']",
    "simple"
  )
  .option("--host <string>", "The host for the connection")
  .option("--user <string>", "The user for the connection")
  .option("--password <string>", "The password for the connection")
  .parse(process.argv);

let queries: Query[] = [];
let prefix: string = "";

const formatterFactory = new FormatterFactory();
const format = formatterFactory.build(program.format);
const printer: Printer = new Printer(program.verbose, format);
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

const omittedErrors: string[] = configuration["ignore-errors"] || [];

if (runSimpleChecks) {
  runner.run(queries, printer, prefix, omittedErrors);
} else {
  const db = new Database(
    program.driver || configuration.driver || "mysql",
    program.host || configuration.host,
    program.user || configuration.user,
    program.password || configuration.password
  );
  runner.run(queries, printer, prefix, omittedErrors, db);
  db.connection.end();
}
