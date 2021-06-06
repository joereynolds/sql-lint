import { IChecker } from "./interface";
import {
  DatabaseNotFound,
  HungarianNotation,
  InvalidLimitQuantifier,
  MissingWhere,
  OddCodePoint,
  TrailingWhitespace,
  UnmatchedParentheses,
  MySqlError,
  MySqlInvalidAlterOption,
  MySqlInvalidCreateOption,
  MySqlInvalidDropOption,
  MySqlInvalidTruncateOption,
  PostgresError,
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
      oddCodePoint: OddCodePoint,
      trailingWhitespace: TrailingWhitespace,
      unmatchedParentheses: UnmatchedParentheses,

      mySqlError: MySqlError,
      mySqlInvalidAlterOption: MySqlInvalidAlterOption,
      mySqlInvalidCreateOption: MySqlInvalidCreateOption,
      mySqlInvalidDropOption: MySqlInvalidDropOption,
      mySqlInvalidTruncateOption: MySqlInvalidTruncateOption,

      postgresError: PostgresError,
      postgresInvalidAlterOption: PostgresInvalidAlterOption,
      postgresInvalidCreateOption: PostgresInvalidCreateOption,
      postgresInvalidDropOption: PostgresInvalidDropOption,
      postgresInvalidTruncateOption: PostgresInvalidTruncateOption,
    };

    return new checkMap[check]();
  }
}

export { CheckFactory };
