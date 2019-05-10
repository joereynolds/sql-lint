import { IChecker } from "./interface";
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
  DatabaseNotFound,
} from "../barrel/checks";

class CheckFactory {
  public build(check: string): IChecker {

      // any is actually IChecker
    const checkMap: { [key: string]: any} = {
      "missingWhere": MissingWhere,
      "mySqlError": MySqlError,
      "invalidAlterOption": InvalidAlterOption,
      "invalidDropOption": InvalidDropOption,
      // "invalidOption": InvalidOption,
      "invalidCreateOption": InvalidCreateOption,
      "invalidTruncateOption": InvalidTruncateOption,
      "oddCodePoint": OddCodePoint,
      "tableNotFound": TableNotFound,
      "unmatchedParentheses": UnmatchedParentheses,
    };

    return new checkMap[check]();
  }
}

export { CheckFactory };
