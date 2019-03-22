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
            printer.printCheck(checks.oddCodePoint, tokenised, prefix);
        }
        else if (category === tokens_1.Keyword.Delete) {
            printer.printCheck(checks.missingWhere, tokenised, prefix);
        }
        else if (category === tokens_1.Keyword.Drop) {
            printer.printCheck(checks.invalidDropOption, tokenised, prefix);
        }
        else if (category === tokens_1.Keyword.Alter) {
            printer.printCheck(checks.invalidAlterOption, tokenised, prefix);
        }
        else if (category === tokens_1.Keyword.Create) {
            printer.printCheck(checks.invalidCreateOption, tokenised, prefix);
        }
        else if (category === tokens_1.Keyword.Truncate) {
            printer.printCheck(checks.invalidTruncateOption, tokenised, prefix);
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
    run(sqlQueries, printer, prefix, database) {
        const checks = this.getSqlLintChecks();
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
    getSqlLintChecks() {
        return {
            oddCodePoint: new checks_1.OddCodePoint(),
            missingWhere: new checks_1.MissingWhere(),
            invalidDropOption: new checks_1.InvalidDropOption(),
            invalidCreateOption: new checks_1.InvalidCreateOption(),
            invalidTruncateOption: new checks_1.InvalidTruncateOption(),
            invalidAlterOption: new checks_1.InvalidAlterOption()
        };
    }
}
exports.CheckerRunner = CheckerRunner;
//# sourceMappingURL=checkerRunner.js.map