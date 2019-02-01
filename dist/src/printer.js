"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
class Printer {
    constructor(verbosity) {
        this.verbosity = verbosity;
    }
    printCheck(checker, tokenised, prefix) {
        const result = checker.check(tokenised);
        if (this.verbosity) {
            const queryForPrint = JSON.stringify(tokenised.getContent());
            const promptForPrint = `Linting Query: ${queryForPrint}`;
            const tokenisedForPrint = JSON.stringify(tokenised, null, 4);
            console.log(chalk_1.default.blue(promptForPrint));
            console.log(chalk_1.default.yellow(`${tokenisedForPrint}`));
        }
        if (result.content) {
            console.log(`${prefix}:${result.line} ${result.content}`);
        }
        if (this.verbosity) {
            console.log("\n-------------------------\n");
        }
    }
    warnAboutFileNotFound(file) {
        console.log(`Can't open file ${file}. Does it exist?`);
    }
}
exports.Printer = Printer;
//# sourceMappingURL=printer.js.map