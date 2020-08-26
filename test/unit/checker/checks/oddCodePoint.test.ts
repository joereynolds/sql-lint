import { OddCodePoint } from "../../../../src/checker/checks/oddCodePoint";
import { tokenise } from "../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  ["SELECT 1;", ""],
  ["SELECT name FROM person WHERE name ='Jane Doe';", ""],
  [
    "SELECT name FROM person WHERE name ='�';",
    "[sql-lint: odd-code-point] Unexpected code point.",
  ],
])("it finds bad codepoints in a query", (query, expected) => {
  const checker = new OddCodePoint();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);
  const actual = checker.check(tokenised);
  expect(actual.content).toEqual(expected);
});
