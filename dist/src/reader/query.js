"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
class Query {
    constructor() {
        this.lines = [];
    }
    getContent() {
        let content = "";
        this.lines.forEach((line) => {
            content += line.content;
        });
        return content;
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map