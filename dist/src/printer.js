"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
class Printer {
    constructor(verbosity, format) {
        this.verbosity = verbosity;
        this.format = format;
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
            console.log(this.format.getMessage(prefix, result));
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