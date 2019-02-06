/**
 * This error is triggered when a DROP statement
 * has an invalid option following the 'DROP'.
 *
 * It would trigger for this:
 *   DROP RUBBISH thing;
 * It wouldn't trigger for this:
 *   DROP TABLE test;
 */

import { Query } from "../../../reader/query";
import { CheckerResult } from "../../checkerResult";
import { IChecker } from "../../interface";
import { Types } from "../../../lexer/tokens";
import { sprintf } from "sprintf-js";
import { Drop } from "../../../lexer/statements/drop";

class InvalidDropOption implements IChecker {
  public message = "Option '%s' is not a valid option, must be one of '%s'";

  public check(query: Query): CheckerResult {
    const dropStatement = new Drop();

    for (const line of query.lines) {
      for (const token of line.tokens) {
        if (
          token[0] === Types.DropItem &&
          !dropStatement.options.includes(token[1])
        ) {
          return new CheckerResult(
            line.num,
            sprintf(
              this.message,
              token[1],
              JSON.stringify(dropStatement.options)
            )
          );
        }
      }
    }

    return new CheckerResult(0, "");
  }
}

export { InvalidDropOption };
