"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresInvalidAlterOption = void 0;
const statements_1 = require("../../../barrel/statements");
const invalidOption_1 = require("../invalidOption");
class PostgresInvalidAlterOption extends invalidOption_1.InvalidOption {
    constructor() {
        super(...arguments);
        this.checker = new statements_1.Alter();
        this.appliesTo = ["alter"];
    }
}
exports.PostgresInvalidAlterOption = PostgresInvalidAlterOption;
//# sourceMappingURL=postgresInvalidAlterOption.js.map