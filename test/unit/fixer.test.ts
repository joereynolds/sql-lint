import { Fixer } from "../../src/fixer";
import { Line } from "../../src/reader/line";
import { Query } from "../../src/reader/query";

test.each([
  // Single keyword
  [new Line("SELECT", 1), "SELECT"],

  // Single keyword (lowercase)
  [new Line("select", 1), "SELECT"],
  [new Line("DELETE", 1), "DELETE"],

  // Multiple keywords
  [new Line("DELETE FROM", 1), "DELETE\nFROM"],

  // A query with a non-keyword in it
  [new Line("DELETE FROM some_table", 1), "DELETE\nFROM\nsome_table"],

  // Select *
  [new Line("SELECT * FROM test", 1), "SELECT\n*\nFROM\ntest"],
])("A keyword is given its own line", (input, expected) => {
  const inputQuery = new Query();
  inputQuery.lines = [input];

  const fixer = new Fixer();
  const actual = fixer.fix(inputQuery);
  expect(actual).toEqual(expected);
});

test.each([
  [new Line("select", 1), "SELECT"],
  [new Line("delete from", 1), "DELETE\nFROM"],
  [new Line("delete from person", 1), "DELETE\nFROM\nperson"],
])("A keyword is uppercased", (input, expected) => {
  const inputQuery = new Query();
  inputQuery.lines = [input];

  const fixer = new Fixer();
  const actual = fixer.fix(inputQuery);
  expect(actual).toEqual(expected);
});

test.each([
  // A query with extra spaces
  [new Line("DELETE     FROM   some_table", 1), "DELETE\nFROM\nsome_table"],
])("Trailing whitespace is removed", (input, expected) => {
  const inputQuery = new Query();
  inputQuery.lines = [input];

  const fixer = new Fixer();
  const actual = fixer.fix(inputQuery);
  expect(actual).toEqual(expected);
});
