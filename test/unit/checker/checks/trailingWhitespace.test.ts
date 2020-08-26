import { TrailingWhitespace } from "../../../../src/checker/checks/trailingWhitespace";
import { tokenise } from "../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  [
      "DELETE \nFROM person WHERE name = 'Jon';", 
      "[sql-lint: trailing-whitespace] Trailing whitespace",
  ]
])("it finds missing WHEREs in DELETEs", (query, expected) => {
  const checker = new TrailingWhitespace();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual.content).toEqual(expected);
});
