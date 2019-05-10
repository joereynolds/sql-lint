import * as fs from "fs";
import * as path from "path";
import { CheckFactory } from "./checkFactory";
import { Query } from "../reader/query";
import { Database } from "../database";
import { Printer } from "../printer";
import { Keyword } from "../syntax/keywords";
import { categorise, tokenise } from "../lexer/lexer";
import {
  DatabaseNotFound,
  InvalidAlterOption,
  InvalidCreateOption,
  InvalidDropOption,
  InvalidTruncateOption,
  MissingWhere,
  MySqlError,
  OddCodePoint,
  UnmatchedParentheses
} from "../barrel/checks";

/**
 * Runs all the checks.
 */
class CheckerRunner {
  /**
   * Simple checks are ones that don't require a database connection
   */
  public runSimpleChecks(
    printer: Printer,
    prefix: string,
    category: string,
    tokenised: Query,
    checks: any
  ) {
    if (category === Keyword.Delete) {
      printer.printCheck(checks["missing-where"], tokenised, prefix);
    } else if (category === Keyword.Drop) {
      printer.printCheck(checks["invalid-drop-option"], tokenised, prefix);
    } else if (category === Keyword.Alter) {
      printer.printCheck(checks["invalid-alter-option"], tokenised, prefix);
    } else if (category === Keyword.Create) {
      printer.printCheck(checks["invalid-create-option"], tokenised, prefix);
    } else if (category === Keyword.Truncate) {
      printer.printCheck(checks["invalid-truncate-option"], tokenised, prefix);
    }

    printer.printCheck(checks["odd-code-point"], tokenised, prefix);
    printer.printCheck(checks["unmatched-parentheses"], tokenised, prefix);
  }

  public runDatabaseChecks(
    database: Database,
    printer: Printer,
    prefix: string,
    category: string,
    tokenised: Query,
    content: string
  ) {
    database.lintQuery(database.connection, content, (results: any) => {
      const checker = new MySqlError(results);
      printer.printCheck(checker, tokenised, prefix);
    });

    if (category === Keyword.Use) {
      database.getDatabases(database.connection, (results: any) => {
        const checker = new DatabaseNotFound(results.rows);
        printer.printCheck(checker, tokenised, prefix);
      });
    }
  }

  public runAutomatic(
    sqlQueries: Query[],
    printer: Printer,
    prefix: string,
    omittedErrors: string[],
    database?: Database
  ) {
    const checks = fs.readdirSync("./src/checker/checks").map(check => {
      return path.parse(check).name;
    });


    // Removing the 'check.ts' file from the checks since it's not one.
    checks.splice(0, 1);
    // Remove the InvalidOption base class, gross I know.
    checks.splice(3, 1);

    // Remove the tableNotFound check for now.
    checks.splice(7, 1);

    // Remove the MySqlError check for now.
    checks.splice(5, 1);

    const factory = new CheckFactory();

    sqlQueries.forEach((query: any) => {
      const content = query.getContent().trim();

      if (content) {
        const category = categorise(content);
        const tokenised: Query = tokenise(query);
        checks.forEach(check => {
          const checker = factory.build(check);
          if (checker.appliesTo.includes(category)) {
            printer.printCheck(checker, tokenised, prefix);
          }
        });
      }
    });
  }

  public run(
    sqlQueries: Query[],
    printer: Printer,
    prefix: string,
    omittedErrors: string[],
    database?: Database
  ) {
    const checks = this.getSqlLintChecks(omittedErrors);

    sqlQueries.forEach((query: any) => {
      const content = query.getcontent().trim();

      if (content) {
        const category = categorise(content);
        const tokenised: Query = tokenise(query);
        if (database) {
          this.runDatabaseChecks(
            database,
            printer,
            prefix,
            category,
            tokenised,
            content
          );
          this.runSimpleChecks(printer, prefix, category, tokenised, checks);
        } else {
          this.runSimpleChecks(printer, prefix, category, tokenised, checks);
        }
      }
    });
  }

  private getSqlLintChecks(omittedErrors: string[]) {
    const checks = {
      "odd-code-point": new OddCodePoint(),
      "missing-where": new MissingWhere(),
      "invalid-drop-option": new InvalidDropOption(),
      "invalid-create-option": new InvalidCreateOption(),
      "invalid-truncate-option": new InvalidTruncateOption(),
      "invalid-alter-option": new InvalidAlterOption(),
      "unmatched-parentheses": new UnmatchedParentheses()
    };

    omittedErrors.forEach(error => {
      if (error in checks) {
        // @ts-ignore
        delete checks[error];
      }
    });

    return checks;
  }
}

export { CheckerRunner };
