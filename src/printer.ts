import { IChecker } from "./checker/interface";
import { Query } from "./reader/query";
import { IFormat } from "./formatter/interface";

import chalk from "chalk";

class Printer {
  public verbosity: number;
  public format: IFormat;

  constructor(verbosity: number, format: IFormat) {
    this.verbosity = verbosity;
    this.format = format;
  }
  public printCheck(
    checker: IChecker | undefined,
    tokenised: Query,
    prefix: string
  ) {
    /**
     * If the checker is undefined, we make the assumption
     * that the check was specified in the 'ignore-errors'
     * array in the config and so we skip over it.
     */
    if (typeof checker === "undefined") {
      return;
    }

    const result = checker.check(tokenised);

    if (this.verbosity) {
      const queryForPrint = JSON.stringify(tokenised.getContent());
      const promptForPrint = `Linting Query: ${queryForPrint}`;
      const tokenisedForPrint = JSON.stringify(tokenised, null, 4);
      console.log(chalk.blue(promptForPrint));
      console.log(chalk.yellow(`${tokenisedForPrint}`));
    }

    if (result.content) {
      console.log(this.format.getMessage(prefix, result));

      // If there are any errors whatsoever, we want to exit 
      // with 1 for build scripts and the like.
      process.exitCode  = 1;
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
