import { Printer } from "../../src/printer";
import { NullChecker } from "../../src/checker/nullChecker";
import { Query } from "../../src/reader/query";
import { SimpleFormat } from "../../src/formatter/formats/simple";

test("It gets the queries content when the verbose option is set above 1", () => {
  const format = new SimpleFormat();
  const checker = new NullChecker();
  const query = new Query();
  const getContentFn = (Query.prototype.getContent = jest.fn());
  const printer = new Printer(2, format);
  printer.printCheck(checker, query, "");
  expect(getContentFn).toHaveBeenCalledTimes(1);
});

test("it calls console.log to output a fixed query", () => {
  const console = jest.spyOn(global.console, "log");
  const format = new SimpleFormat();
  const checker = new NullChecker();
  const query = new Query();
  const getContentFn = (Query.prototype.getContent = jest.fn());
  getContentFn.mockReturnValue("delete from person;");
  const printer = new Printer(2, format);
  printer.printFix([query]);
  expect(console).toHaveBeenCalled();
});

test("It calls console.log if a file is not found", () => {
  const console = jest.spyOn(global.console, "log");
  const format = new SimpleFormat();
  const printer = new Printer(1, format);
  printer.warnAboutFileNotFound("some-file");
  expect(console).toHaveBeenCalled();
});

test("It calls console.log if a config file is not found", () => {
  const console = jest.spyOn(global.console, "log");
  const format = new SimpleFormat();
  const printer = new Printer(1, format);
  printer.warnAboutNoConfiguration("some-file");
  expect(console).toHaveBeenCalled();
});

test("It does not console log if the checker is undefined", () => {
  const format = new SimpleFormat();
  const query = new Query();
  const printer = new Printer(1, format);
  printer.printCheck(undefined, query, "");

  // @ts-ignore
  global.console = { log: jest.fn() };
  expect(console.log).toHaveBeenCalledTimes(0);
});
