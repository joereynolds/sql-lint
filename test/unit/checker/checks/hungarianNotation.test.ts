import { HungarianNotation } from "../../../../src/checker/checks/hungarianNotation";
import { tokenise } from "../../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  ["SELECT name FROM person LIMIT 5;", ""],
  [
    "SELECT name FROM sp_person LIMIT 'test';",
    "[sql-lint: hungarian-notation] Hungarian notation present in query",
  ],
  [
    "SELECT name FROM tbl_person LIMIT 'test';",
    "[sql-lint: hungarian-notation] Hungarian notation present in query",
  ],
])("It detects hungarian notation", (query, expected) => {
  const checker = new HungarianNotation();

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);
  const actual = checker.check(tokenised);
  expect(actual.content).toEqual(expected);
});
