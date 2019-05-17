"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const checkFactory_1 = require("./checkFactory");
const lexer_1 = require("../lexer/lexer");
const checks_1 = require("../barrel/checks");
/**
 * Runs all the checks.
 */
class CheckerRunner {
    run(sqlQueries, printer, prefix, omittedErrors, database) {
        const checks = fs.readdirSync("./src/checker/checks").map(check => {
            return path.parse(check).name;
        });
        checks.splice(0, 1); // Removing the 'check.ts' file from the checks since it's not one.
        checks.splice(3, 1); // Remove the InvalidOption base class, gross I know.
        checks.splice(7, 1); // Remove the tableNotFound check for now.
        const factory = new checkFactory_1.CheckFactory();
        sqlQueries.forEach((query) => {
            const content = query.getContent().trim();
            if (content) {
                const category = lexer_1.categorise(content);
                const tokenised = lexer_1.tokenise(query);
                checks.forEach(check => {
                    const checker = factory.build(check);
                    // Simple checks
                    if (checker.appliesTo.includes(category) &&
                        !checker.requiresConnection) {
                        printer.printCheck(checker, tokenised, prefix);
                    }
                    // DB server checks
                    if (checker.requiresConnection &&
                        database &&
                        checker.appliesTo.includes(category)) {
                        database.lintQuery(database.connection, content, (results) => {
                            const sqlChecker = new checks_1.MySqlError(results);
                            printer.printCheck(sqlChecker, tokenised, prefix);
                        });
                    }
                });
            }
        });
    }
}
exports.CheckerRunner = CheckerRunner;
//# sourceMappingURL=checkerRunner.js.map