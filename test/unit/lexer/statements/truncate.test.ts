import { Truncate } from "../../../../src/parser/statements/truncate/truncate";
import { putContentIntoLines } from "../../../../src/reader/reader";
import { Token } from "../../../../src/parser/token";

test.each([
// TODO - FIX THIS, we should allow graceful failures
  /* [ */
  /*   "TRUNCATE ;", */
  /*   { */
  /*     lines: [ */
  /*       { */
  /*         content: "TRUNCATE ;", */
  /*         num: 1, */
  /*         tokens: [new Token("keyword", "truncate")] */
  /*       } */
  /*     ] */
  /*   } */
  /* ], */
  [
    "TRUNCATE TABLE ;",
    {
      lines: [
        {
          content: "TRUNCATE TABLE ;",
          num: 1,
          tokens: [
            new Token("keyword", "truncate"),
            new Token("option", "table")
          ]
        }
      ]
    }
  ]
])("It tokenises a `truncate` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Truncate();
  const actual = tokeniser.tokenise(q[0]);
  expect(actual).toEqual(expected);
});
