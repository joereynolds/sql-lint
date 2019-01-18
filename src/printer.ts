import { IChecker } from "./checker/interface";
import { Query } from "./reader/reader";

class Printer {
  public printCheck(checker: IChecker, tokenised: Query, prefix: string) {
    const result = checker.check(tokenised);
    if (result.content) {
      console.log(`${prefix}:${result.line} ${result.content}`);
    }
  }

  public warnAboutFileNotFound(file: string) {
    console.log(`Can't open file ${file}. Does it exist?`);
  }
}

export { Printer };
