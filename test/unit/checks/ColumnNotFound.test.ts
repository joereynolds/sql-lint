import * as mysql from "mysql";

import { ColumnNotFound } from "../../../src/checker/Generic_ColumnNotFound";
import { tokenise } from "../../../src/lexer/lexer";
import { putContentIntoLines, Query } from "../../../src/reader/reader";

test.each([
  [
    "SELECT i_dont_exist FROM symfony.gig;",
    { content: "Column 'i_dont_exist' does not exist in table 'symfony.gig'.", line: 1 }
  ]
])("it finds databases that don't exist", (query, expected) => {
  const checker = new ColumnNotFound([{ Column: "non_existent_column" }]);

  const queryObj = putContentIntoLines(query);
  const tokenised = tokenise(queryObj[0]);

  const actual = checker.check(tokenised);
  expect(actual).toMatchObject(expected);
});
