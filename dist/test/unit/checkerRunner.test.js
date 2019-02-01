"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkerRunner_1 = require("../../src/checker/checkerRunner");
const printer_1 = require("../../src/printer");
test("It does not run database checks when a database is not supplied", () => {
    const mockRunDatabaseChecksFn = (checkerRunner_1.CheckerRunner.prototype.runDatabaseChecks = jest.fn());
    const printer = new printer_1.Printer(0);
    const runner = new checkerRunner_1.CheckerRunner();
    runner.run([], printer, "");
    expect(mockRunDatabaseChecksFn).toHaveBeenCalledTimes(0);
});
test("It runs basic checks when no database is supplied", () => {
    const mockRunSimpleChecksFn = (checkerRunner_1.CheckerRunner.prototype.runSimpleChecks = jest.fn());
    const printer = new printer_1.Printer(0);
    const runner = new checkerRunner_1.CheckerRunner();
    runner.run([], printer, "");
    expect(mockRunSimpleChecksFn).toHaveBeenCalledTimes(1);
});
//# sourceMappingURL=checkerRunner.test.js.map