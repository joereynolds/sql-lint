"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Printer = void 0;
const fixer_1 = require("./fixer");
class Printer {
    constructor(verbosity, format) {
        this.messages = [];
        this.verbosity = verbosity;
        this.format = format;
    }
    printCheck(checker, tokenised, prefix) {
        /**
         * If the checker is undefined, we make the assumption
         * that the check was specified in the 'ignore-errors'
         * array in the config and so we skip over it.
         */
        if (typeof checker === "undefined") {
            return;
        }
        const result = checker.check(tokenised);
        if (this.verbosity > 1) {
            const queryForPrint = JSON.stringify(tokenised.getContent());
            const promptForPrint = `Linting Query: ${queryForPrint}`;
            const tokenisedForPrint = JSON.stringify(tokenised, null, 4);
            console.log(promptForPrint);
            console.log(tokenisedForPrint);
        }
        if (result.content) {
            const message = this.format.getMessage(prefix, result, this.verbosity);
            if (typeof message !== "string") {
                this.messages.push(message);
                return;
            }
            console.log(message);
            // If there are any errors whatsoever, we want to exit
            // with 1 for build scripts and the like.
            process.exitCode = 1;
        }
    }
    printFix(query) {
        const fixer = new fixer_1.Fixer();
        const fixed = fixer.fix(query[0]);
        console.log(fixed);
    }
    warnAboutUncategoriseableQuery(content) {
        const title = "Unable to lint query";
        const url = encodeURI(`https://github.com/joereynolds/sql-lint/issues/new?title=${title}&body=${content}`);
        console.log(`sql-lint was unable to lint the following query "${content}".` +
            `This could be a bug with sql-lint. Visit this URL to create a bug report: ${url}`);
    }
    warnAboutFileNotFound(file) {
        console.log(`Can't open file ${file}. Does it exist?`);
    }
    warnAboutNoConfiguration(file) {
        if (this.verbosity) {
            console.log(`Can't open file ${file}. Does it exist?` +
                "\nA configuration file will enable errors from your DB server and give better error reporting." +
                "\nRead more here: https://sql-lint.readthedocs.io/en/latest/files/configuration.html" +
                "\n");
        }
    }
}
exports.Printer = Printer;
//# sourceMappingURL=printer.js.map