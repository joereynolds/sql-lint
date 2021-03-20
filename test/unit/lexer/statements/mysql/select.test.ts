import { Select } from "../../../../../src/lexer/statements/mysql/select";
import { putContentIntoLines } from "../../../../../src/reader/reader";
import { Token } from "../../../../../src/lexer/token";

test.each([
  [
    "SELECT * FROM person;",
    {
      lines: [
        {
          content: "SELECT * FROM person;",
          num: 1,
          tokens: [
            new Token("keyword", "select"),
            new Token("table_reference", "*"),
            new Token("keyword", "from"),
            new Token("table_reference", "person"),
          ],
        },
      ],
    },
  ],
  [
    "SELECT last_name FROM person;",

    {
      lines: [
        {
          content: "SELECT last_name FROM person;",
          num: 1,
          tokens: [
            new Token("keyword", "select"),
            new Token("table_reference", "last_name"),
            new Token("keyword", "from"),
            new Token("table_reference", "person"),
          ],
        },
      ],
    },
  ],
  [
    "SELECT * FROM person LIMIT 73;",

    {
      lines: [
        {
          content: "SELECT * FROM person LIMIT 73;",
          num: 1,
          tokens: [
            new Token("keyword", "select"),
            new Token("table_reference", "*"),
            new Token("keyword", "from"),
            new Token("table_reference", "person"),
            new Token("keyword", "limit"),
            new Token("row_count", "73"),
          ],
        },
      ],
    },
  ],
  [
    "SELECT * FROM person WHERE name = 'test';",

    {
      lines: [
        {
          content: "SELECT * FROM person WHERE name = 'test';",
          num: 1,
          tokens: [
            new Token("keyword", "select"),
            new Token("table_reference", "*"),
            new Token("keyword", "from"),
            new Token("table_reference", "person"),
            new Token("keyword", "where"),
            new Token("???", "name"),
            new Token("???", "="),
            new Token("???", "'test';"),
          ],
        },
      ],
    },
  ],
])("It tokenises a `select` correctly", (query, expected) => {
  const tokeniser = new Select();
  const q = putContentIntoLines(query);
  const actual = tokeniser.tokenise(q[0]);
  expect(actual).toMatchObject(expected);
});
