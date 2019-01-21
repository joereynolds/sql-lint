
import { TableNotFound } from "../../../src/checker/checks/generic/tableNotFound";
import { tokenise } from "../../../src/lexer/lexer";
import { putContentIntoLines } from "../../../src/reader/reader";

test.each([
  [
    "SELECT * FROM symfony.dont_exist ;",
    { content: "Table 'dont_exist' does not exist in database 'symfony'.", line: 1 }
  ]
])("it finds tables that don't exist", (query, expected) => {

  const checker = new TableNotFound([{ Table: "non_existent_table" }]);

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual).toMatchObject(expected);
});
