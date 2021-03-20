import { IChecker } from "./interface";
import {
  DatabaseNotFound,
  HungarianNotation,
  InvalidLimitQuantifier,
  MissingWhere,
  MySqlError,
  OddCodePoint,
  TrailingWhitespace,
  UnmatchedParentheses,
  MySqlInvalidAlterOption,
  MySqlInvalidCreateOption,
  MySqlInvalidDropOption,
  MySqlInvalidTruncateOption,
  PostgresInvalidAlterOption,
  PostgresInvalidCreateOption,
  PostgresInvalidDropOption,
  PostgresInvalidTruncateOption,
} from "../barrel/checks";

class CheckFactory {
  public build(check: string): IChecker {
    // any is actually IChecker
    const checkMap: { [key: string]: any } = {
      databaseNotFound: DatabaseNotFound,
      hungarianNotation: HungarianNotation,
      invalidLimitQuantifier: InvalidLimitQuantifier,
      missingWhere: MissingWhere,
      mySqlError: MySqlError,
      oddCodePoint: OddCodePoint,
      trailingWhitespace: TrailingWhitespace,
      unmatchedParentheses: UnmatchedParentheses,

      mySqlInvalidAlterOption: MySqlInvalidAlterOption,
      mySqlInvalidCreateOption: MySqlInvalidCreateOption,
      mySqlInvalidDropOption: MySqlInvalidDropOption,
      mySqlInvalidTruncateOption: MySqlInvalidTruncateOption,

      postgresInvalidAlterOption: PostgresInvalidAlterOption,
      postgresInvalidCreateOption: PostgresInvalidCreateOption,
      postgresInvalidDropOption: PostgresInvalidDropOption,
      postgresInvalidTruncateOption: PostgresInvalidTruncateOption,
    };

    return new checkMap[check]();
  }
}

export { CheckFactory };
