import { MySqlInvalidCreateOption } from "../../../../../src/checker/checks/mysql/mySqlInvalidCreateOption";
import { tokenise } from "../../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../../src/reader/reader";

test.each([
  ["CREATE TABLE person;"],
  ["CREATE SCHEMA person;"],
  ["CREATE OR REPLACE some_table;"],
  ["CREATE UNIQUE INDEX some_index;"],
])("it does not warn about valid CREATE options", (query) => {
  const checker = new MySqlInvalidCreateOption();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toBeFalsy();
});

test.each([["CREATE JIBBERISH person;"], ["CREATE TYPE blah;"]])(
  "it warns about mysql specific invalid options in CREATEs",
  (query) => {
    const checker = new MySqlInvalidCreateOption();

    const queryObj = putContentIntoLines(query);
    const tokenised = tokenise(queryObj[0]);

    const actual = checker.check(tokenised);

    // It's not false because it has content - The warning message
    // about an invalid type
    expect(actual.content).not.toBeFalsy();
  }
);
