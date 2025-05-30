#!/usr/bin/env node

import * as program from "commander";
import * as fs from "fs";
import * as process from "process";

import { CheckerRunner } from "./checker/checkerRunner";
import { file, getConfiguration, findConfiguration } from "./config";
import { findByExtension } from "./file";
import { FormatterFactory } from "./formatter/formatterFactory";
import { getQueryFromFile, getQueryFromLine } from "./reader/reader";
import { Printer } from "./printer";
import { Query } from "./reader/query";
import { version } from "../package.json";
import databaseFactory from "./database/databaseFactory";

(async () => {
  program
    .version(version)
    .description("Lint sql files and stdin for errors, oddities, and bad practices.")
    .option("--fix [string]", "The .sql string to fix (experimental and alpha)")
    .option(
      "-d, --driver <string>",
      "The driver to use, must be one of ['mysql', 'postgres']"
    )
    .option(
      "-v, --verbose",
      "Brings back information on the what it's linting and the tokens generated",
      increaseVerbosity,
      0
    )
    .option(
      "--format <string>",
      "The format of the output, can be one of ['simple', 'json']",
      "simple"
    )
    .option("--host <string>", "The host for the database connection")
    .option("--user <string>", "The user for the database connection")
    .option("--password <string>", "The password for the database connection")
    .option("--database <string>", "The database for the database connection")
    .option("--port <string>", "The port for the database connection")
    .option("--config <string>", "The path to the configuration file")
    .option("--ignore-errors <string...>", "The errors to ignore (comma separated)")
    .parse(process.argv);

  let queries: Query[] = [];
  let prefix: string = "";

  const formatterFactory = new FormatterFactory();
  const format = formatterFactory.build(program.format);
  const printer: Printer = new Printer(program.verbose, format);
  const configuration = (program.config)
    ? getConfiguration(program.config)
    : findConfiguration();
  const runner = new CheckerRunner();
  const programFile = program.args[0];

  if (program.fix) {
    let query: Query[];

    // Read from stdin if nothing is specified.
    // We default to '-'' if no argument is supplied to --fix
    // so we don't nag the user
    if (typeof program.fix === "boolean") {
      query = getQueryFromLine(fs.readFileSync(0).toString());
    } else {
      query = getQueryFromLine(program.fix);
    }

    printer.printFix(query);
    process.exit(0);
  }

  if (programFile && !fs.existsSync(programFile)) {
    printer.warnAboutFileNotFound(programFile);
    process.exit(1);
  }

  // Read from stdin if no args are supplied
  if (!programFile) {
    try {
        queries = getQueryFromLine(fs.readFileSync(0).toString());
        prefix = "stdin";
    } catch (error) {
        printer.warnAboutNoStdinStream();
    }
  }


  let omittedErrors: string[] = [];
  if (configuration !== null && "ignore-errors" in configuration) {
    omittedErrors = configuration["ignore-errors"] || [];
  }

  if (program.ignoreErrors) {
      omittedErrors = program.ignoreErrors.split(',')
  }

  let db: any;

  if (configuration === null) {
    if (program.config) {
      printer.warnAboutFileNotFound(program.config);
    } else {
      printer.warnAboutNoConfiguration(file);
    }
  }

  const driver = program.driver || configuration?.driver || "mysql";

  if (program.host || configuration?.host) {
    db = databaseFactory(
      driver,
      program.host || configuration?.host || "localhost",
      program.user || configuration?.user || "root", // bad practice but unfortunately common, make it easier for the user
      program.password || configuration?.password,
      program.port || configuration?.port || undefined, // let mysql2 or pg figure out the default port
      program.database || configuration?.database || undefined,
    );
  }

  if (programFile) {
    if (fs.lstatSync(programFile).isDirectory()) {
      const sqlFiles = findByExtension(programFile, "sql");
      for (const sqlFile of sqlFiles) {
        queries = getQueryFromFile(sqlFile);
        await runner.run(queries, printer, sqlFile, omittedErrors, driver, db);
      }
    } else {
      queries = getQueryFromFile(programFile);
      prefix = programFile;
    }
  }

  await runner.run(queries, printer, prefix, omittedErrors, driver, db);

  if (program.host || configuration?.host) {
    db.end();
  }

  if (printer.messages.length) {
    console.log(JSON.stringify(printer.messages));
    process.exit(1);
  }
})();

function increaseVerbosity(v: any, total: any) {
  return total + 1;
}
