import { categorise, tokenise } from "../../src/lexer/lexer";
import { Select } from "../../src/lexer/select";
import { Use } from "../../src/lexer/use";
import { Line, putContentIntoLines, Query } from "../../src/reader/reader";


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
            ["table_reference", "person;"]
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
            ["table_reference", "person;"]
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
])("It tokenises a select correctly", (query, expected) => {
  const tokeniser = new Select();
  const q = putContentIntoLines(query);
  const actual = tokeniser.tokenise(q[0]);
  expect(actual).toMatchObject(expected);
});

test.each([
  [
    "USE ;",
    {
      lines: [
        {
          content: "USE ;",
          num: 1,
          tokens: [["keyword", "use"], ["table_reference", ";"]]
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
            ["table_reference", ";"]
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
            ["table_reference", ";"]
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

test.each([
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
            ["table_reference", "person;"]
          ]
        }
      ]
    }
  ]
])("It tokenises correctly when called through tokenise", (query, expected) => {
  const q = putContentIntoLines(query);
  const actual = tokenise(q[0]);
  expect(actual).toMatchObject(expected);
});
