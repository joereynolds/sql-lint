"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const checkFactory_1 = require("./checkFactory");
const keywords_1 = require("../syntax/keywords");
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
        if (category === keywords_1.Keyword.Delete) {
            printer.printCheck(checks["missing-where"], tokenised, prefix);
        }
        else if (category === keywords_1.Keyword.Drop) {
            printer.printCheck(checks["invalid-drop-option"], tokenised, prefix);
        }
        else if (category === keywords_1.Keyword.Alter) {
            printer.printCheck(checks["invalid-alter-option"], tokenised, prefix);
        }
        else if (category === keywords_1.Keyword.Create) {
            printer.printCheck(checks["invalid-create-option"], tokenised, prefix);
        }
        else if (category === keywords_1.Keyword.Truncate) {
            printer.printCheck(checks["invalid-truncate-option"], tokenised, prefix);
        }
        printer.printCheck(checks["odd-code-point"], tokenised, prefix);
        printer.printCheck(checks["unmatched-parentheses"], tokenised, prefix);
    }
    runDatabaseChecks(database, printer, prefix, category, tokenised, content) {
        database.lintQuery(database.connection, content, (results) => {
            const checker = new checks_1.MySqlError(results);
            printer.printCheck(checker, tokenised, prefix);
        });
        if (category === keywords_1.Keyword.Use) {
            database.getDatabases(database.connection, (results) => {
                const checker = new checks_1.DatabaseNotFound(results.rows);
                printer.printCheck(checker, tokenised, prefix);
            });
        }
    }
    runAutomatic(sqlQueries, printer, prefix, omittedErrors, database) {
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
        const factory = new checkFactory_1.CheckFactory();
        sqlQueries.forEach((query) => {
            const content = query.getContent().trim();
            if (content) {
                const category = lexer_1.categorise(content);
                const tokenised = lexer_1.tokenise(query);
                checks.forEach(check => {
                    const checker = factory.build(check);
                    if (checker.appliesTo.includes(category)) {
                        printer.printCheck(checker, tokenised, prefix);
                    }
                });
            }
        });
    }
    run(sqlQueries, printer, prefix, omittedErrors, database) {
        const checks = this.getSqlLintChecks(omittedErrors);
        sqlQueries.forEach((query) => {
            const content = query.getcontent().trim();
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
            "invalid-alter-option": new checks_1.InvalidAlterOption(),
            "unmatched-parentheses": new checks_1.UnmatchedParentheses()
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