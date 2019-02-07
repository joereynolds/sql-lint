import { CheckerRunner } from "../../../src/checker/checkerRunner";
import { Printer } from "../../../src/printer";
import { SimpleFormat } from "../../../src/formatter/formats/simple";

test("It does not run database checks when a database is not supplied", () => {
  const mockRunDatabaseChecksFn = (CheckerRunner.prototype.runDatabaseChecks = jest.fn());
  const format = new SimpleFormat();
  const printer = new Printer(0, format);
  const runner = new CheckerRunner();
  runner.run([], printer, "");

  expect(mockRunDatabaseChecksFn).toHaveBeenCalledTimes(0);
});

test("It runs basic checks when no database is supplied", () => {
  const mockRunSimpleChecksFn = (CheckerRunner.prototype.runSimpleChecks = jest.fn());
  const format = new SimpleFormat();
  const printer = new Printer(0, format);
  const runner = new CheckerRunner();
  runner.run([], printer, "");

  expect(mockRunSimpleChecksFn).toHaveBeenCalledTimes(1);
});
