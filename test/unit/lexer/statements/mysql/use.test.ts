import { Use } from "../../../../../src/lexer/statements/mysql/use";
import { putContentIntoLines } from "../../../../../src/reader/reader";
import { Token } from "../../../../../src/lexer/token";

test.each([
  [
    "USE ;",
    {
      lines: [
        {
          content: "USE ;",
          num: 1,
          tokens: [new Token("keyword", "use")],
        },
      ],
    },
  ],

  [
    "USE symfony ;",
    {
      lines: [
        {
          content: "USE symfony ;",
          num: 1,
          tokens: [
            new Token("keyword", "use"),
            new Token("table_reference", "symfony"),
          ],
        },
      ],
    },
  ],

  [
    "use symfony pricing ;",
    {
      lines: [
        {
          content: "use symfony pricing ;",
          num: 1,
          tokens: [
            new Token("keyword", "use"),
            new Token("table_reference", "symfony"),
            new Token("table_reference", "pricing"),
          ],
        },
      ],
    },
  ],
])("It tokenises a `use` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Use();
  const actual = tokeniser.tokenise(q[0]);
  expect(actual).toEqual(expected);
});
