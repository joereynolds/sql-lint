"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlInvalidAlterOption = void 0;
const statements_1 = require("../../../barrel/statements");
const invalidOption_1 = require("../invalidOption");
class MySqlInvalidAlterOption extends invalidOption_1.InvalidOption {
    constructor() {
        super(...arguments);
        this.checker = new statements_1.Alter();
        this.appliesTo = ["alter"];
    }
}
exports.MySqlInvalidAlterOption = MySqlInvalidAlterOption;
//# sourceMappingURL=mySqlInvalidAlterOption.js.map