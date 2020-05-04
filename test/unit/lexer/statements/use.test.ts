import { Use } from "../../../../src/parser/statements/use/use";
import { putContentIntoLines } from "../../../../src/reader/reader";
import { Token } from "../../../../src/parser/token";

test.each([
  [
    "USE symfony ;",
    {
      lines: [
        {
          content: "USE symfony ;",
          num: 1,
          tokens: [
            new Token("keyword", "use"),
            new Token("table_reference", "symfony")
          ]
        }
      ]
    }
  ],

  [
    "use symfony_pricing ;",
    {
      lines: [
        {
          content: "use symfony_pricing ;",
          num: 1,
          tokens: [
            new Token("keyword", "use"),
            new Token("table_reference", "symfony_pricing")
          ]
        }
      ]
    }
  ]
])("It tokenises a `use` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Use();
  const actual = tokeniser.tokenise(q[0]);
  expect(expected).toEqual(actual);
});
