"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tokens {
    constructor(content) {
        this.content = content;
    }
    getTokenised() {
        return [["nothing"]];
    }
    getTokens() {
        return ["nothing"];
    }
    getContent() {
        return "nothing";
    }
    addToken(token) {
        console.log('t');
    }
}
exports.Tokens = Tokens;
const TOKENS = {
    "keyword": [
        "select",
        "delete",
        "update",
        "from",
        "where",
        "set",
        "join",
        "having",
        "limit",
        "else",
        "if",
        "begin",
    ],
    "comment": ["#", "--"],
    "boolean": ["true", "false", "null"],
    "conditional": ["and", "or"],
    "operator": ["+", "-", "/"],
};
exports.TOKENS = TOKENS;
//# sourceMappingURL=tokens.js.map