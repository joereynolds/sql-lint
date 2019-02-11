"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonFormat {
    getMessage(prefix, result) {
        const message = {
            source: prefix,
            error: result.content,
            line: result.line
        };
        return JSON.stringify(message);
    }
}
exports.JsonFormat = JsonFormat;
//# sourceMappingURL=json.js.map