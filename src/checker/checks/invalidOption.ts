import { Query } from "../../reader/query";
import { CheckerResult } from "../checkerResult";
import { IChecker } from "../interface";
import { Types } from "../../lexer/types";
import { sprintf } from "sprintf-js";
import { Check } from "../check";
import { ILexer } from "../../lexer/interface";

class InvalidOption extends Check implements IChecker {
  public message = "Option '%s' is not a valid option, must be one of '%s'.";
  public additionalInformation = "";
  public checker: ILexer;
  public requiresConnection = false;
  public appliesTo = ["select", "create", "update", "drop", "insert"];

  public check(query: Query): CheckerResult {
    for (const line of query.lines) {
      for (const token of line.tokens) {
        if (
          token.type === Types.Option &&
          !this.checker.options.includes(token.value)
        ) {
          return new CheckerResult(
            line.num,
            sprintf(
              this.prefix + this.message,
              token.value,
              JSON.stringify(this.checker.options)
            )
          );
        }
      }
    }

    return new CheckerResult(0, "");
  }
}

export { InvalidOption };
