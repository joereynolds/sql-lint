"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tokens {
    constructor(content) {
        /**
         * The tokens that have come from tokenising the query
         * i.e. ["keyword", "table_reference", "keyword", "table_reference"]
         */
        this.tokens = [];
        /**
         * The tokens and the query together
         * i.e. [
         *     ["keyword", "select"]
         *     ["table_reference", "*"]
         *     ["keyword", "from"]
         *     ["table_reference", "person"]
         * ]
         */
        this.tokenised = [];
        this.content = content;
    }
    getTokenised() {
        return this.tokenised;
    }
    getTokens() {
        return this.tokens;
    }
    getContent() {
        return this.content;
    }
    addToken(token) {
        this.tokens.push(token);
    }
    addTokenised(tokenised) {
        this.tokenised.push(tokenised);
    }
}
exports.Tokens = Tokens;
const TOKENS = {
    keyword: [
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
        "begin"
    ],
    comment: ["#", "--"],
    boolean: ["true", "false", "null"],
    conditional: ["and", "or"],
    operator: ["+", "-", "/"]
};
exports.TOKENS = TOKENS;
//# sourceMappingURL=tokens.js.map