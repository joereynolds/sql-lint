import { Query } from "../reader/reader";
import { CheckerResult } from "./checkerResult";
import { IChecker } from "./interface";

class NullChecker implements IChecker {

  public message: string = "";
  
  public check(query: Query): CheckerResult {
    return new CheckerResult(0, this.message);
  }
}

export { NullChecker };
