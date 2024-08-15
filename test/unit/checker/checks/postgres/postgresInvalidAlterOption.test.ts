import { PostgresInvalidAlterOption } from "../../../../../src/checker/checks/postgres/postgresInvalidAlterOption";
import { tokenise } from "../../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../../src/reader/reader";

test.each([
  ["ALTER column;"],
  ["ALTER online;"],
  ["ALTER offline;"],
  ["ALTER ignore;"],
  ["ALTER database;"],
  ["ALTER event;"],
  ["ALTER function;"],
  ["ALTER procedure;"],
  ["ALTER sequence;"],
  ["ALTER server;"],
  ["ALTER table;"],
  ["ALTER tablespace;"],
  ["ALTER TYPE blah;"],
  ["ALTER view;"],
])("it does not error about valid ALTER options", (query) => {
  const checker = new PostgresInvalidAlterOption();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toBeFalsy();
});
