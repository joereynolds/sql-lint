"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleFormat {
    getMessage(prefix, result) {
        return `${prefix}:${result.line} ${result.content}`;
    }
}
exports.SimpleFormat = SimpleFormat;
//# sourceMappingURL=simple.js.map