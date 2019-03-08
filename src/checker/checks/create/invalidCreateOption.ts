/**
 * This error is triggered when a CREATE statement
 * has an invalid option following the 'CREATE'.
 *
 * It would trigger for this:
 *   CREATE RUBBISH thing;
 * It wouldn't trigger for this:
 *   CREATE TABLE test;
 */

import { Query } from "../../../reader/query";
import { CheckerResult } from "../../checkerResult";
import { IChecker } from "../../interface";
import { Types } from "../../../lexer/tokens";
import { sprintf } from "sprintf-js";
import { Create } from "../../../barrel/statements";
import { Check } from "../check";

class InvalidCreateOption extends Check implements IChecker {
  public message = "Option '%s' is not a valid option, must be one of '%s'";

  public check(query: Query): CheckerResult {
    const createStatement = new Create();

    for (const line of query.lines) {
      for (const token of line.tokens) {
        if (
          token.type === Types.Option &&
          !createStatement.options.includes(token.value)
        ) {
          return new CheckerResult(
            line.num,
            sprintf(
              this.prefix + this.message,
              token.value,
              JSON.stringify(createStatement.options)
            )
          );
        }
      }
    }

    return new CheckerResult(0, "");
  }
}

export { InvalidCreateOption };
