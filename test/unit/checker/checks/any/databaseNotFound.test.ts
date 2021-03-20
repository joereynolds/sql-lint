import { DatabaseNotFound } from "../../../../../src/checker/checks/any/databaseNotFound";
import { tokenise } from "../../../../..//src/lexer/lexer";
import { putContentIntoLines } from "../../../../../src/reader/reader";

test.each([
  [
    "USE non_existent_db ;",
    {
      content:
        "[sql-lint: database-not-found] Database 'non_existent_db' does not exist.",
      line: 1,
    },
  ],
  [
    "USE other_db;",
    {
      content:
        "[sql-lint: database-not-found] Database 'other_db' does not exist.",
      line: 1,
    },
  ],
  ["USE existing_db ;", { content: "", line: 0 }],
  ["USE existing_db;", { content: "", line: 0 }],
])("it finds databases that don't exist", (query, expected) => {
  const checker = new DatabaseNotFound([{ Database: "existing_db" }]);

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual).toMatchObject(expected);
});
