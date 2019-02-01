"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Query {
    constructor() {
        this.lines = [];
    }
    getContent() {
        let content = "";
        this.lines.forEach(line => {
            content += line.content;
        });
        return content;
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map