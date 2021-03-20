"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresInvalidTruncateOption = void 0;
const statements_1 = require("../../../barrel/statements");
const invalidOption_1 = require("../invalidOption");
class PostgresInvalidTruncateOption extends invalidOption_1.InvalidOption {
    constructor() {
        super(...arguments);
        this.checker = new statements_1.Truncate();
        this.appliesTo = ["truncate"];
    }
}
exports.PostgresInvalidTruncateOption = PostgresInvalidTruncateOption;
//# sourceMappingURL=postgresInvalidTruncateOption.js.map