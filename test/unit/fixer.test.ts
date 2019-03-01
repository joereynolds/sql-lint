import { Fixer } from "../../src/fixer";
import { Line } from "../../src/reader/line";
import { Query } from "../../src/reader/query";

test.each([
  // Single keyword
  [new Line("SELECT", 1), "SELECT\n"],
  // Single keyword (lowercase)
  [new Line("select", 1), "SELECT\n"],
  [new Line("DELETE", 1), "DELETE\n"],
  // Multiple keywords
  [new Line("DELETE FROM", 1), "DELETE\nFROM\n"],
  // A query with a non-keyword in it
  [new Line("DELETE FROM some_table;", 1), "DELETE\nFROM\nsome_table;"]
])("A keyword is given its own line", (input, expected) => {
  const inputQuery = new Query();
  inputQuery.lines = [input];

  const fixer = new Fixer();
  const actual = fixer.fix(inputQuery);
  expect(actual).toEqual(expected);
});
