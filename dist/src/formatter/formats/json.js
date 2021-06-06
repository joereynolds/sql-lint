"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFormat = void 0;
class JsonFormat {
    getMessage(prefix, result, verbosity) {
        const message = {
            source: prefix,
            error: result.content,
            line: result.line,
            additionalInformation: "",
        };
        if (verbosity) {
            message.additionalInformation = result.additionalInformation;
        }
        return message;
    }
}
exports.JsonFormat = JsonFormat;
//# sourceMappingURL=json.js.map