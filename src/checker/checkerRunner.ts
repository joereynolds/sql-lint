import { Query } from "../reader/reader";
import { Database } from "../database";
import { Printer } from "../printer";
import { Keyword } from "../lexer/tokens";
import { categorise, tokenise } from "../lexer/lexer";
import { MySqlError } from "../checker/checks/generic/mySqlError";
import { MissingWhere } from "../checker/checks/delete/missingWhere";
import { OddCodePoint } from "../checker/checks/generic/oddCodePoint";
import { DatabaseNotFound } from "../checker/checks/use/databaseNotFound";
import { InvalidDropOption } from "../checker/checks/drop/invalidDropOption";

/**
 * Runs all the checks.
 */
class CheckerRunner {
  /**
   * The line number of the content
   */
  public line: number;

  /**
   *  The content for the current line
   */
  public content: string;

  /**
   * Simple checks are ones that don't require a database connection
   */
  public runSimpleChecks(
    sqlQueries: Query[],
    printer: Printer,
    prefix: string
  ) {
    const checkOddCodePoint = new OddCodePoint();
    const checkMissingWhere = new MissingWhere();
    const invalidDropOption = new InvalidDropOption();

    sqlQueries.forEach((query: any) => {
      const content = query.getContent().trim();

      if (content) {
        const category = categorise(content);
        const tokenised: Query = tokenise(query);

        if (category === Keyword.Select) {
          const checker = checkOddCodePoint;
          printer.printCheck(checker, tokenised, prefix);
        } else if (category === Keyword.Delete) {
          const checker = checkMissingWhere;
          printer.printCheck(checker, tokenised, prefix);
        } else if (category === Keyword.Drop) {
          const checker = invalidDropOption;
          printer.printCheck(checker, tokenised, prefix);
        }
      }
    });
  }

  public runDatabaseChecks(
    sqlQueries: Query[],
    database: Database,
    printer: Printer,
    prefix: string
  ) {
    const checkOddCodePoint = new OddCodePoint();
    const checkMissingWhere = new MissingWhere();
    const invalidDropOption = new InvalidDropOption();

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
        } else if (category === Keyword.Drop) {
          const checker = invalidDropOption;
          printer.printCheck(checker, tokenised, prefix);
        }
      }
    });
  }

  public run(
    sqlQueries: Query[],
    printer: Printer,
    prefix: string,
    database?: Database
  ) {
    if (database) {
      return this.runDatabaseChecks(sqlQueries, database, printer, prefix);
    }

    return this.runSimpleChecks(sqlQueries, printer, prefix);
  }
}

export { CheckerRunner };
