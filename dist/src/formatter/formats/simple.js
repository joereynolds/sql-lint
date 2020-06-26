"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFormat = void 0;
class SimpleFormat {
    getMessage(prefix, result, verbosity) {
        if (verbosity) {
            return `${prefix}:${result.line} ${result.content} ${result.additionalInformation}`;
        }
        return `${prefix}:${result.line} ${result.content}`;
    }
}
exports.SimpleFormat = SimpleFormat;
//# sourceMappingURL=simple.js.map