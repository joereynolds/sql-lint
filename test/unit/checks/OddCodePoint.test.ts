import * as mysql from "mysql";

import { OddCodePoint } from "../../../src/checker/Generic_OddCodePoint";
import { tokenise } from "../../../src/lexer/lexer";
import { putContentIntoLines, Query } from "../../../src/reader/reader";

test.each([
  ["SELECT 1;", ""],
  ["SELECT name FROM person WHERE name ='Jane Doe';", ""],
  ["SELECT name FROM person WHERE name ='�';", "Bad code point"]
])("it finds bad codepoints in a query", (query, expected) => {
  const checker = new OddCodePoint();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);
  const actual = checker.check(tokenised);
  expect(actual.content).toEqual(expected);
});
