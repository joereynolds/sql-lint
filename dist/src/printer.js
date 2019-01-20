"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Printer {
    printCheck(checker, tokenised, prefix) {
        const result = checker.check(tokenised);
        if (result.content) {
            console.log(`${prefix}:${result.line} ${result.content}`);
        }
    }
    warnAboutFileNotFound(file) {
        console.log(`Can't open file ${file}. Does it exist?`);
    }
}
exports.Printer = Printer;
//# sourceMappingURL=printer.js.map