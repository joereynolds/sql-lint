import { Create } from "../../../../src/lexer/statements/create";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  [
    "CREATE ;",
    {
      lines: [
        {
          content: "CREATE ;",
          num: 1,
          tokens: [["keyword", "create"]]
        }
      ]
    }
  ],
  [
    "CREATE TABLE ;",
    {
      lines: [
        {
          content: "CREATE TABLE ;",
          num: 1,
          tokens: [["keyword", "create"], ["option", "table"]]
        }
      ]
    }
  ],
  [
    "CREATE DATABASE ;",
    {
      lines: [
        {
          content: "CREATE DATABASE ;",
          num: 1,
          tokens: [["keyword", "create"], ["option", "database"]]
        }
      ]
    }
  ]
])("It tokenises a `create` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Create();
  const actual = tokeniser.tokenise(q[0]);
  expect(actual).toEqual(expected);
});
