import { IChecker } from "./checker/interface";
import { Query } from "./reader/reader";

import chalk from "chalk";

class Printer {
  public verbosity: number;

  constructor(verbosity: number) {
    this.verbosity = verbosity;
  }
  public printCheck(checker: IChecker, tokenised: Query, prefix: string) {
    const result = checker.check(tokenised);

    if (this.verbosity) {
      const queryForPrint = JSON.stringify(tokenised.getContent());
      const promptForPrint = `Linting Query: ${queryForPrint}`;
      const tokenisedForPrint = JSON.stringify(tokenised, null, 4);
      console.log(chalk.blue(promptForPrint))
      console.log(chalk.yellow(`${tokenisedForPrint}`));
    }

    if (result.content) {
      console.log(`${prefix}:${result.line} ${result.content}`);
    }

    if (this.verbosity) {
        console.log("\n-------------------------\n");
    }
  }

  public warnAboutFileNotFound(file: string) {
    console.log(`Can't open file ${file}. Does it exist?`);
  }
}

export { Printer };
