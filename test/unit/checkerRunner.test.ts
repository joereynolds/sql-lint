import { CheckerRunner } from "../../src/checker/checkerRunner";
import { Printer } from "../../src/printer";

test("It does not run database checks when a database is not supplied", () => {
  const mockRunDatabaseChecksFn = (CheckerRunner.prototype.runDatabaseChecks = jest.fn());
  const printer = new Printer(0);
  const runner = new CheckerRunner();
  runner.run([], printer, "");

  expect(mockRunDatabaseChecksFn).toHaveBeenCalledTimes(0);
});

test("It runs basic checks when no database is supplied", () => {
  const mockRunSimpleChecksFn = (CheckerRunner.prototype.runSimpleChecks = jest.fn());
  const printer = new Printer(0);
  const runner = new CheckerRunner();
  runner.run([], printer, "");

  expect(mockRunSimpleChecksFn).toHaveBeenCalledTimes(1);
});
