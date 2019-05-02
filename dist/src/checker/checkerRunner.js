"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("../lexer/tokens");
const lexer_1 = require("../lexer/lexer");
const checks_1 = require("../barrel/checks");
/**
 * Runs all the checks.
 */
class CheckerRunner {
    /**
     * Simple checks are ones that don't require a database connection
     */
    runSimpleChecks(printer, prefix, category, tokenised, checks) {
        if (category === tokens_1.Keyword.Select) {
            printer.printCheck(checks["odd-code-point"], tokenised, prefix);
        }
        else if (category === tokens_1.Keyword.Delete) {
            printer.printCheck(checks["missing-where"], tokenised, prefix);
        }
        else if (category === tokens_1.Keyword.Drop) {
            printer.printCheck(checks["invalid-drop-option"], tokenised, prefix);
        }
        else if (category === tokens_1.Keyword.Alter) {
            printer.printCheck(checks["invalid-alter-option"], tokenised, prefix);
        }
        else if (category === tokens_1.Keyword.Create) {
            printer.printCheck(checks["invalid-create-option"], tokenised, prefix);
        }
        else if (category === tokens_1.Keyword.Truncate) {
            printer.printCheck(checks["invalid-truncate-option"], tokenised, prefix);
        }
    }
    runDatabaseChecks(database, printer, prefix, category, tokenised, content) {
        database.lintQuery(database.connection, content, (results) => {
            const checker = new checks_1.MySqlError(results);
            printer.printCheck(checker, tokenised, prefix);
        });
        if (category === tokens_1.Keyword.Use) {
            database.getDatabases(database.connection, (results) => {
                const checker = new checks_1.DatabaseNotFound(results.rows);
                printer.printCheck(checker, tokenised, prefix);
            });
        }
    }
    run(sqlQueries, printer, prefix, omittedErrors, database) {
        const checks = this.getSqlLintChecks(omittedErrors);
        sqlQueries.forEach((query) => {
            const content = query.getContent().trim();
            if (content) {
                const category = lexer_1.categorise(content);
                const tokenised = lexer_1.tokenise(query);
                if (database) {
                    this.runDatabaseChecks(database, printer, prefix, category, tokenised, content);
                    this.runSimpleChecks(printer, prefix, category, tokenised, checks);
                }
                else {
                    this.runSimpleChecks(printer, prefix, category, tokenised, checks);
                }
            }
        });
    }
    getSqlLintChecks(omittedErrors) {
        const checks = {
            "odd-code-point": new checks_1.OddCodePoint(),
            "missing-where": new checks_1.MissingWhere(),
            "invalid-drop-option": new checks_1.InvalidDropOption(),
            "invalid-create-option": new checks_1.InvalidCreateOption(),
            "invalid-truncate-option": new checks_1.InvalidTruncateOption(),
            "invalid-alter-option": new checks_1.InvalidAlterOption()
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
exports.CheckerRunner = CheckerRunner;
//# sourceMappingURL=checkerRunner.js.map