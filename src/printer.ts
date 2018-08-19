import { IChecker } from "./checker/interface";
import { Query } from "./reader/reader";

class Printer {
  public printCheck(checker: IChecker, tokenised: Query, prefix: string) {
    const result = checker.check(tokenised);
    if (result.content) {
        console.log(`${prefix}:${result.line} ${result.content}`);
    }
  }
}

export { Printer };
