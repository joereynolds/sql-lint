import { PostgresInvalidDropOption } from "../../../../../src/checker/checks/postgres/postgresInvalidDropOption";
import { tokenise } from "../../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../../src/reader/reader";

test.each([
  ["DROP database;"],
  ["DROP event;"],
  ["DROP function;"],
  ["DROP index;"],
  ["DROP logfile;"],
  ["DROP procedure;"],
  ["DROP schema;"],
  ["DROP server;"],
  ["DROP table;"],
  ["DROP view;"],
  ["DROP trigger;"],
  ["DROP tablespace;"],
  ["DROP type;"],
])("it does not error about valid DROP options", (query) => {
  const checker = new PostgresInvalidDropOption();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toBeFalsy();
});