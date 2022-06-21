import { PostgresInvalidCreateOption } from "../../../../../src/checker/checks/postgres/postgresInvalidCreateOption";
import { tokenise } from "../../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../../src/reader/reader";

test.each([
  ["CREATE TABLE person;"],
  ["CREATE SCHEMA person;"],
  ["CREATE TYPE blah;"],
  ["CREATE EXTENSION blah;"],
  ["CREATE SEQUENCE blah;"],
])("it does not warn about valid CREATE options", (query) => {
  const checker = new PostgresInvalidCreateOption();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toBeFalsy();
});

test.each([["CREATE JIBBERISH person;"]])(
  "it warns about postgres specific invalid options in CREATEs",
  (query) => {
    const checker = new PostgresInvalidCreateOption();

    const queryObj = putContentIntoLines(query);
    const tokenised = tokenise(queryObj[0]);

    const actual = checker.check(tokenised);

    // It's not false because it has content - The warning message
    // about an invalid type
    expect(actual.content).not.toBeFalsy();
  }
);
