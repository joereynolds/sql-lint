import { CheckerRunner } from "../../../src/checker/checkerRunner";
import { Printer } from "../../../src/printer";
import { SimpleFormat } from "../../../src/formatter/formats/simple";
import { Query } from "../../../src/reader/query";

beforeEach(() => {
  this.mockRunDatabaseChecksFn = CheckerRunner.prototype.runDatabaseChecks = jest.fn();
  this.printer = new Printer(0, new SimpleFormat());
  this.database = jest.mock("../../../src/database");
  this.runner = new CheckerRunner();
  this.query = new Query();
});

test("It does not run database checks when a database is not supplied", () => {
  this.runner.run([], this.printer, "");
  expect(this.mockRunDatabaseChecksFn).toHaveBeenCalledTimes(0);
});

test("It does run database checks when a database is supplied", () => {
  Query.prototype.getContent = jest.fn().mockReturnValue("SELECT test");
  this.runner.run([this.query], this.printer, "", this.database);
  expect(this.mockRunDatabaseChecksFn).toHaveBeenCalledTimes(1);
});

test.each([
    ['select', 1],
    ['delete', 1],
    ['drop', 1],
    ['truncate', 1],
    ['non-existent-query-type', 0],
    ['create', 1]
])("It prints out select checks", (category, timesToHaveBeenCalled) => {
   const mockPrintCheckFn = Printer.prototype.printCheck = jest.fn();
    this.runner.runSimpleChecks(this.printer, 'something', category, this.Query, '')
   expect(mockPrintCheckFn).toHaveBeenCalledTimes(timesToHaveBeenCalled);
});

test("No checks are ran if a query doesn't have content", () => {
  const mockRunSimpleChecksFn = CheckerRunner.prototype.runSimpleChecks = jest.fn();
  this.runner.run([], this.printer, "");
  expect(mockRunSimpleChecksFn).toHaveBeenCalledTimes(0);
  expect(this.mockRunDatabaseChecksFn).toHaveBeenCalledTimes(0);
});

test("It runs basic checks when no database is supplied", () => {
  const mockRunSimpleChecksFn = CheckerRunner.prototype.runSimpleChecks = jest.fn();
  Query.prototype.getContent = jest.fn().mockReturnValue("SELECT test");
  this.runner.run([this.query], this.printer, "");
  expect(mockRunSimpleChecksFn).toHaveBeenCalledTimes(1);
});
