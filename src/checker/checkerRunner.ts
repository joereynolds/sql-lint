import * as fs from "fs";
import * as path from "path";
import { CheckFactory } from "./checkFactory";
import { Query } from "../reader/query";
import IDatabase, { sqlError } from "../database/interface";
import { Printer } from "../printer";
import { categorise, tokenise } from "../lexer/lexer";
import { MySqlError } from "../barrel/checks";

/**
 * Runs all the checks.
 */
class CheckerRunner {
  public async run(
    sqlQueries: Query[],
    printer: Printer,
    prefix: string,
    omittedErrors: string[],
    driver: string,
    database?: IDatabase,
  ) {
    const checks = fs
      .readdirSync(`${__dirname}/checks/any`)
      .map((check) => {
        return path.parse(check).name;
      })
      .filter((item) => {
        const ignoredChecks = ["tableNotFound", "databaseNotFound"];

        // We ignore the 3 above checks.
        // invalidOption - This is a base class and does actually have any checks
        // tableNotFound - This is built into most SQL servers so is redundant
        // databaseNotFound - This is built into most SQL servers so is redundant
        // .js - There seems to be a discrepancy with filenames when using the compiled
        //       version of sql-lint (./dist/src/main.js). They are finding checks and
        //       including the .js. We ignore those too
        return (
          !ignoredChecks.includes(item) &&
          !item.endsWith(".js") &&
          !item.endsWith(".d")
        );
      });

    const driverSpecificChecks = fs
      .readdirSync(`${__dirname}/checks/${driver}`)
      .map((check) => {
        return path.parse(check).name;
      })
      .filter((item) => {
        return !item.endsWith(".js") && !item.endsWith(".d");
      });

    checks.push(...driverSpecificChecks);

    const factory = new CheckFactory();

    for (const query of sqlQueries) {
      const content = query.getContent().trim();

      if (content) {
        const category = categorise(content);

        const tokenised: Query = tokenise(query);

        if (!category) {
          printer.warnAboutUncategoriseableQuery(content, tokenised, prefix);
        }

        for (const check of checks) {
          const checker = factory.build(check);

          // Don't print out errors that should be ignored
          if (omittedErrors.includes(checker.getName())) {
            continue;
          }

          // Simple checks
          if (
            checker.appliesTo.includes(category) &&
            !checker.requiresConnection
          ) {
            printer.printCheck(checker, tokenised, prefix);
          }

          // DB server checks
          if (
            checker.requiresConnection &&
            database &&
            checker.appliesTo.includes(category)
          ) {
            const results: sqlError | null = await database.lintQuery(content);

            // Only `printCheck` if there was an error
            if (results !== null) {
              const sqlChecker = new MySqlError(results);
              printer.printCheck(sqlChecker, tokenised, prefix);
            }
          }
        }
      }
    }
  }
}

export { CheckerRunner };
