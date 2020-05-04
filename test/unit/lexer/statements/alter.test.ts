import { Alter } from "../../../../src/parser/statements/alter/alter";
import { putContentIntoLines } from "../../../../src/reader/reader";
import { Token } from "../../../../src/parser/token";

test.each([
  [
    "ALTER TABLE ;",
    {
      lines: [
        {
          content: "ALTER TABLE ;",
          num: 1,
          tokens: [new Token("keyword", "alter"), new Token("option", "table")]
        }
      ]
    }
  ]
])("It tokenises a `alter` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Alter();
  const actual = tokeniser.parse(q[0]);
  expect(actual).toEqual(expected);
});
