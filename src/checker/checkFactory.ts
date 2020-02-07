import { IChecker } from "./interface";
import {
  InvalidAlterOption,
  InvalidCreateOption,
  MissingWhere,
  InvalidDropOption,
  MySqlError,
  OddCodePoint,
  UnmatchedParentheses,
  InvalidTruncateOption,
  InvalidLimitQuantifier,
  DatabaseNotFound
} from "../barrel/checks";

class CheckFactory {
  public build(check: string): IChecker {
    // any is actually IChecker
    const checkMap: { [key: string]: any } = {
      databaseNotFound: DatabaseNotFound,
      invalidAlterOption: InvalidAlterOption,
      invalidCreateOption: InvalidCreateOption,
      invalidDropOption: InvalidDropOption,
      invalidLimitQuantifier: InvalidLimitQuantifier,
      invalidTruncateOption: InvalidTruncateOption,
      missingWhere: MissingWhere,
      mySqlError: MySqlError,
      oddCodePoint: OddCodePoint,
      unmatchedParentheses: UnmatchedParentheses
    };

    return new checkMap[check]();
  }
}

export { CheckFactory };
