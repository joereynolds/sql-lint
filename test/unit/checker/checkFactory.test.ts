import { CheckFactory } from "../../../src/checker/checkFactory";
import {
  MissingWhere,
  MySqlError,
  OddCodePoint,
} from "../../../src/barrel/checks";

test.each([
  ["missingWhere", MissingWhere],
  ["mySqlError", MySqlError],
  ["oddCodePoint", OddCodePoint],
])("The CheckFactory builds the correct check", (format: string, expected) => {
  const factory = new CheckFactory();
  const actual = factory.build(format);
  expect(actual).toBeInstanceOf(expected);
});
