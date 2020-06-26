import { StatementFactory } from "../../../src/lexer/statementFactory";
import { Select, Use, Drop, Create } from "../../../src/barrel/statements";

test.each([
  // Invalid ones default to Select
  ["an-invalid-format", Select],
  ["select", Select],
  ["use", Use],
  ["drop", Drop],
  ["create", Create],
  // Empty options default to Select
  ["", Select],
])(
  "The StatementFactory builds the correct statement",
  (format: string, expected) => {
    const factory = new StatementFactory();
    const actual = factory.build(format);
    expect(actual).toBeInstanceOf(expected);
  }
);
