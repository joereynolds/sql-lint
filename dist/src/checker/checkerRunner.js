"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckerRunner = void 0;
const fs = require("fs");
const path = require("path");
const checkFactory_1 = require("./checkFactory");
const lexer_1 = require("../lexer/lexer");
const checks_1 = require("../barrel/checks");
/**
 * Runs all the checks.
 */
class CheckerRunner {
    run(sqlQueries, printer, prefix, omittedErrors, driver, database) {
        const checks = fs
            .readdirSync(`${__dirname}/checks/any`)
            .map((check) => {
            return path.parse(check).name;
        })
            .filter((item) => {
            const ignoredChecks = [
                "invalidOption",
                "tableNotFound",
                "databaseNotFound",
            ];
            // We ignore the 3 above checks.
            // invalidOption - This is a base class and does actually have any checks
            // tableNotFound - This is built into most SQL servers so is redundant
            // databaseNotFound - This is built into most SQL servers so is redundant
            // .js - There seems to be a discrepancy with filenames when using the compiled
            //       version of sql-lint (./dist/src/main.js). They are finding checks and
            //       including the .js. We ignore those too
            return !ignoredChecks.includes(item) && !item.endsWith(".js");
        });
        const driverSpecificChecks = fs
            .readdirSync(`${__dirname}/checks/${driver}`)
            .map((check) => {
            return path.parse(check).name;
        })
            .filter((item) => {
            return !item.endsWith(".js");
        });
        checks.push(...driverSpecificChecks);
        const factory = new checkFactory_1.CheckFactory();
        sqlQueries.forEach((query) => {
            const content = query.getContent().trim();
            if (content) {
                const category = lexer_1.categorise(content);
                if (!category) {
                    printer.warnAboutUncategoriseableQuery(content);
                }
                const tokenised = lexer_1.tokenise(query);
                checks.forEach((check) => {
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