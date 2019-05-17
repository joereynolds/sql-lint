import * as fs from "fs";
import * as path from "path";
import { CheckFactory } from "./checkFactory";
import { Query } from "../reader/query";
import { Database } from "../database";
import { Printer } from "../printer";
import { categorise, tokenise } from "../lexer/lexer";
import { MySqlError } from "../barrel/checks";

/**
 * Runs all the checks.
 */
class CheckerRunner {
  public run(
    sqlQueries: Query[],
    printer: Printer,
    prefix: string,
    omittedErrors: string[],
    database?: Database
  ) {
    const checks = fs.readdirSync("./src/checker/checks").map(check => {
      return path.parse(check).name;
    });

    checks.splice(0, 1); // Removing the 'check.ts' file from the checks since it's not one.
    checks.splice(3, 1); // Remove the InvalidOption base class, gross I know.
    checks.splice(7, 1); // Remove the tableNotFound check for now.

    const factory = new CheckFactory();

    sqlQueries.forEach((query: any) => {
      const content = query.getContent().trim();

      if (content) {
        const category = categorise(content);
        const tokenised: Query = tokenise(query);
        checks.forEach(check => {
          const checker = factory.build(check);

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
            database.lintQuery(database.connection, content, (results: any) => {
              const sqlChecker = new MySqlError(results);
              printer.printCheck(sqlChecker, tokenised, prefix);
            });
          }
        });
      }
    });
  }
}

export { CheckerRunner };
