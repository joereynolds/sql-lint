import { Query } from "../reader/query";
import { CheckerResult } from "./checkerResult";
import { IChecker } from "./interface";
import { Check } from "./check";

class NullChecker extends Check implements IChecker {
  public message: string = "";
  public requiresConnection = false;
  public appliesTo = [];
  public additionalInformation = "";

  public check(query: Query): CheckerResult {
    return new CheckerResult(0, this.message);
  }
}

export { NullChecker };
