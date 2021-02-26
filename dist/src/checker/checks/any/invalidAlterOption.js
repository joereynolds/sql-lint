"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidAlterOption = void 0;
const statements_1 = require("../../../barrel/statements");
const invalidOption_1 = require("./invalidOption");
class InvalidAlterOption extends invalidOption_1.InvalidOption {
    constructor() {
        super(...arguments);
        this.checker = new statements_1.Alter();
        this.appliesTo = ["alter"];
    }
}
exports.InvalidAlterOption = InvalidAlterOption;
//# sourceMappingURL=invalidAlterOption.js.map