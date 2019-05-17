import { CheckFactory } from "../../../src/checker/checkFactory";
import {
  InvalidAlterOption,
  InvalidCreateOption,
  MissingWhere,
  InvalidDropOption,
  MySqlError,
  OddCodePoint,
  TableNotFound,
  UnmatchedParentheses,
  InvalidTruncateOption,
  DatabaseNotFound
} from "../../../src/barrel/checks";


test.each([
  ["missingWhere", MissingWhere],
  ["mySqlError", MySqlError],
  ["oddCodePoint", OddCodePoint],
])(
  "The StatementFactory builds the correct statement",
  (format: string, expected) => {
    const factory = new CheckFactory();
    const actual = factory.build(format);
    expect(actual).toBeInstanceOf(expected);
  }
);
