import { putContentIntoLines } from "../../../../../src/reader/reader";
import { Token } from "../../../../../src/lexer/token";
import { Rename } from "../../../../../src/barrel/statements";

test.each([
  [
    "RENAME ;",
    {
      lines: [
        {
          content: "RENAME ;",
          num: 1,
          tokens: [new Token("keyword", "rename")],
        },
      ],
    },
  ],

  [
    "RENAME old_table TO new_table ;",
    {
      lines: [
        {
          content: "RENAME old_table TO new_table ;",
          num: 1,
          tokens: [
            new Token("keyword", "rename"),
            new Token("table_reference", "old_table"),
            new Token("keyword", "to"),
            new Token("table_reference", "new_table"),
          ],
        },
      ],
    },
  ],
])("It tokenises a `rename` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Rename();
  const actual = tokeniser.tokenise(q[0]);
  expect(actual).toEqual(expected);
});
