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
  DatabaseNotFound
} from "../barrel/checks";

class CheckFactory {
  public build(check: string): IChecker {
    // any is actually IChecker
    const checkMap: { [key: string]: any } = {
      missingWhere: MissingWhere,
      mySqlError: MySqlError,
      invalidAlterOption: InvalidAlterOption,
      invalidDropOption: InvalidDropOption,
      invalidCreateOption: InvalidCreateOption,
      invalidTruncateOption: InvalidTruncateOption,
      oddCodePoint: OddCodePoint,
      unmatchedParentheses: UnmatchedParentheses,
      databaseNotFound: DatabaseNotFound
    };

    return new checkMap[check]();
  }
}

export { CheckFactory };
