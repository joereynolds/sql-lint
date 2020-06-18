"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonFormat {
    getMessage(prefix, result, verbosity) {
        const message = {
            source: prefix,
            error: result.content,
            line: result.line,
            additionalInformation: ''
        };
        if (verbosity) {
            message.additionalInformation = result.additionalInformation;
        }
        return JSON.stringify(message);
    }
}
exports.JsonFormat = JsonFormat;
//# sourceMappingURL=json.js.map