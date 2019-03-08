import { Query } from "../reader/query";
import { Database } from "../database";
import { Printer } from "../printer";
import { Keyword } from "../lexer/tokens";
import { categorise, tokenise } from "../lexer/lexer";
import {
  MySqlError,
  MissingWhere,
  OddCodePoint,
  DatabaseNotFound,
  InvalidCreateOption,
  InvalidDropOption,
  InvalidTruncateOption
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
    if (category === Keyword.Select) {
      printer.printCheck(checks.oddCodePoint, tokenised, prefix);
    } else if (category === Keyword.Delete) {
      printer.printCheck(checks.missingWhere, tokenised, prefix);
    } else if (category === Keyword.Drop) {
      printer.printCheck(checks.invalidDropOption, tokenised, prefix);
    } else if (category === Keyword.Create) {
      printer.printCheck(checks.invalidCreateOption, tokenised, prefix);
    } else if (category === Keyword.Truncate) {
      printer.printCheck(checks.invalidTruncateOption, tokenised, prefix);
    }
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
        const checker = new DatabaseNotFound(results);
        printer.printCheck(checker, tokenised, prefix);
      });
    }
  }

  public run(
    sqlQueries: Query[],
    printer: Printer,
    prefix: string,
    database?: Database
  ) {
    const checks = this.getSqlLintChecks();

    sqlQueries.forEach((query: any) => {
      const content = query.getContent().trim();

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

  private getSqlLintChecks() {
    return {
      oddCodePoint: new OddCodePoint(),
      missingWhere: new MissingWhere(),
      invalidDropOption: new InvalidDropOption(),
      invalidCreateOption: new InvalidCreateOption(),
      invalidTruncateOption: new InvalidTruncateOption()
    };
  }
}

export { CheckerRunner };
