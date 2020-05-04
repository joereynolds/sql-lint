import { Create } from "../../../../src/parser/statements/create";
import { putContentIntoLines } from "../../../../src/reader/reader";
import { Token } from "../../../../src/parser/token";

test.each([
  [
    "CREATE ;",
    {
      lines: [
        {
          content: "CREATE ;",
          num: 1,
          tokens: [new Token("keyword", "create")]
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
          tokens: [new Token("keyword", "create"), new Token("option", "table")]
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
          tokens: [
            new Token("keyword", "create"),
            new Token("option", "database")
          ]
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
