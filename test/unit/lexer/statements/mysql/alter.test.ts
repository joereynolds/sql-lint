import { Alter } from "../../../../../src/lexer/statements/mysql/alter";
import { putContentIntoLines } from "../../../../../src/reader/reader";
import { Token } from "../../../../../src/lexer/token";

test.each([
  [
    "ALTER ;",
    {
      lines: [
        {
          content: "ALTER ;",
          num: 1,
          tokens: [new Token("keyword", "alter")],
        },
      ],
    },
  ],
  [
    "ALTER TABLE ;",
    {
      lines: [
        {
          content: "ALTER TABLE ;",
          num: 1,
          tokens: [new Token("keyword", "alter"), new Token("option", "table")],
        },
      ],
    },
  ],
])("It tokenises a `alter` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Alter();
  const actual = tokeniser.tokenise(q[0]);
  expect(actual).toEqual(expected);
});
