import { Select } from "../../../../src/lexer/statements/select";
import { putContentIntoLines } from "../../../../src/reader/reader";

test.each([
  [
    "SELECT * FROM person;",
    {
      lines: [
        {
          content: "SELECT * FROM person;",
          num: 1,
          tokens: [
            ["keyword", "select"],
            ["table_reference", "*"],
            ["keyword", "from"],
            ["table_reference", "person"]
          ]
        }
      ]
    }
  ],
  [
    "SELECT last_name FROM person;",

    {
      lines: [
        {
          content: "SELECT last_name FROM person;",
          num: 1,
          tokens: [
            ["keyword", "select"],
            ["table_reference", "last_name"],
            ["keyword", "from"],
            ["table_reference", "person"]
          ]
        }
      ]
    }
  ],
  [
    "SELECT * FROM person WHERE name = 'test';",

    {
      lines: [
        {
          content: "SELECT * FROM person WHERE name = 'test';",
          num: 1,
          tokens: [
            ["keyword", "select"],
            ["table_reference", "*"],
            ["keyword", "from"],
            ["table_reference", "person"],
            ["keyword", "where"],
            ["???", "name"],
            ["???", "="],
            ["???", "'test';"]
          ]
        }
      ]
    }
  ]
])("It tokenises a `select` correctly", (query, expected) => {
  const tokeniser = new Select();
  const q = putContentIntoLines(query);
  const actual = tokeniser.tokenise(q[0]);
  expect(actual).toMatchObject(expected);
});
