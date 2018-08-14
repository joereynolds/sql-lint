import * as mysql from "mysql";

import { MissingWhere } from "../../src/checker/Delete_MissingWhere";
import { OddCodePoint } from "../../src/checker/Generic_OddCodePoint";
import { DatabaseNotFound } from "../../src/checker/Use_DatabaseNotFound";
import { tokenise } from "../../src/lexer/lexer";

test.each([
  ["SELECT 1", ""],
  ["SELECT name FROM person WHERE name ='Jane Doe'", ""],
  ["SELECT name FROM person WHERE name ='�'", "Bad code point"]
])("it finds bad codepoints in a query", (query, expected) => {
  const checker = new OddCodePoint();
  const tokenised = tokenise(query);
  const actual = checker.check(tokenised);
  expect(actual.content).toEqual(expected);
});

test.each([
  ["DELETE FROM person WHERE name = 'Jon'", ""],
  ["DELETE FROM person", "Delete missing WHERE, intentional?"]
])("it finds missing WHEREs in DELETEs", (query, expected) => {
  const checker = new MissingWhere();
  const tokenised = tokenise(query);
  const actual = checker.check(tokenised);
  expect(actual.content).toEqual(expected);
});

test.each([
  ["USE existing_db", ""],
  ["use non_existent_db", "Database 'non_existent_db' does not exist."]
])("it finds databases that don't exist", (query, expected) => {
  const checker = new DatabaseNotFound([{ Database: "existing_db" }]);
  const tokenised = tokenise(query);
  const actual = checker.check(tokenised);
  expect(actual.content).toEqual(expected);
});
