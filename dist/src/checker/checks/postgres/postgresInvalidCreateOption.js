"use strict";
/**
 * This error is triggered when a CREATE statement
 * has an invalid option following the 'CREATE'.
 *
 * It would trigger for this:
 *   CREATE RUBBISH thing;
 * It wouldn't trigger for this:
 *   CREATE TABLE test;
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresInvalidCreateOption = void 0;
const statements_1 = require("../../../barrel/statements");
const invalidOption_1 = require("../invalidOption");
class PostgresInvalidCreateOption extends invalidOption_1.InvalidOption {
    constructor() {
        super(...arguments);
        this.checker = new statements_1.PostgresCreate();
        this.appliesTo = ["create"];
    }
}
exports.PostgresInvalidCreateOption = PostgresInvalidCreateOption;
//# sourceMappingURL=postgresInvalidCreateOption.js.map