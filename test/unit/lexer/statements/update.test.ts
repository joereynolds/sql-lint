import { Update } from "../../../../src/parser/statements/update/update";
import { putContentIntoLines } from "../../../../src/reader/reader";
import { Token } from "../../../../src/parser/token";

test.each([
    // TODO - Fix this
  /* [ */
  /*   "UPDATE ;", */
  /*   { */
  /*     lines: [ */
  /*       { */
  /*         content: "UPDATE ;", */
  /*         num: 1, */
  /*         tokens: [new Token("keyword", "update")] */
  /*       } */
  /*     ] */
  /*   } */
  /* ], */

  [
    "UPDATE symfony.gig ;",
    {
      lines: [
        {
          content: "UPDATE symfony.gig ;",
          num: 1,
          tokens: [
            new Token("keyword", "update"),
            new Token("table_reference", "symfony.gig")
          ]
        }
      ]
    }
  ]
])("It tokenises an `update` correctly", (query, expected) => {
  const q = putContentIntoLines(query);
  const tokeniser = new Update();
  const actual = tokeniser.parse(q[0]);
  expect(actual).toEqual(expected);
});
