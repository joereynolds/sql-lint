"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable-next-line */
const paramCase = require("param-case");
class Check {
    constructor() {
        this.prefix = `[sql-lint: ${this.getName()}] `;
    }
    /**
     * Infers the name of the error message from the child's
     * class name.
     */
    getName() {
        return paramCase(this.constructor.name);
    }
}
exports.Check = Check;
//# sourceMappingURL=check.js.map