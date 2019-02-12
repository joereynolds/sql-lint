import { Printer } from "../../src/printer";
import { NullChecker } from "../../src/checker/nullChecker";
import { Query } from "../../src/reader/query";
import { SimpleFormat } from "../../src/formatter/formats/simple";

test("It gets the queries content when the verbose option is set", () => {
  const format = new SimpleFormat();
  const checker = new NullChecker();
  const query = new Query();
  const getContentFn = (Query.prototype.getContent = jest.fn());
  const printer = new Printer(1, format);
  printer.printCheck(checker, query, "");
  expect(getContentFn).toHaveBeenCalledTimes(1);
});

test("It calls console.log if a file is not found", () => {
  const console = jest.spyOn(global.console, 'log');
  const format = new SimpleFormat();
  const printer = new Printer(1, format);
  printer.warnAboutFileNotFound('some-file');
  expect(console).toHaveBeenCalledTimes(1);
});
