import { Use } from "../../../../src/lexer/statements/use";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  [
    "USE ;",
    {
      lines: [
        {
          content: "USE ;",
          num: 1,
          tokens: [["keyword", "use"]]
        }
      ]
    }
  ],

  [
    "USE symfony ;",
    {
      lines: [
        {
          content: "USE symfony ;",
          num: 1,
          tokens: [
            ["keyword", "use"],
            ["table_reference", "symfony"],
          ]
        }
      ]
    }
  ],

  [
    "use symfony pricing ;",
    {
      lines: [
        {
          content: "use symfony pricing ;",
          num: 1,
          tokens: [
            ["keyword", "use"],
            ["table_reference", "symfony"],
            ["table_reference", "pricing"],
          ]
        }
      ]
    }
  ]
])("It tokenises a `use` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Use();
  const actual = tokeniser.tokenise(q[0]);
  expect(actual).toEqual(expected);
});
