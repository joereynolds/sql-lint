import { Drop } from "../../../../src/lexer/statements/drop";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  [
    "DROP ;",
    {
      lines: [
        {
          content: "DROP ;",
          num: 1,
          tokens: [["keyword", "drop"]]
        }
      ]
    }
  ],
  [
    "DROP TABLE ;",
    {
      lines: [
        {
          content: "DROP TABLE ;",
          num: 1,
          tokens: [["keyword", "drop"], ["option", "table"]]
        }
      ]
    }
  ],
  [
    "DROP DATABASE ;",
    {
      lines: [
        {
          content: "DROP DATABASE ;",
          num: 1,
          tokens: [["keyword", "drop"], ["option", "database"]]
        }
      ]
    }
  ]
])("It tokenises a `drop` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Drop();
  const actual = tokeniser.tokenise(q[0]);
  expect(actual).toEqual(expected);
});
