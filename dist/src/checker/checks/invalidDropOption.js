"use strict";
/**
 * This error is triggered when a DROP statement
 * has an invalid option following the 'DROP'.
 *
 * It would trigger for this:
 *   DROP RUBBISH thing;
 * It wouldn't trigger for this:
 *   DROP TABLE test;
 */
Object.defineProperty(exports, "__esModule", { value: true });
const statements_1 = require("../../barrel/statements");
const invalidOption_1 = require("./invalidOption");
class InvalidDropOption extends invalidOption_1.InvalidOption {
    constructor() {
        super(...arguments);
        this.checker = new statements_1.Drop();
        this.appliesTo = ["drop"];
    }
}
exports.InvalidDropOption = InvalidDropOption;
//# sourceMappingURL=invalidDropOption.js.map