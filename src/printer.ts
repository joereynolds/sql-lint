import { IChecker } from "./checker/interface";
import { Query } from "./reader/query";
import { IFormat, IMessage } from "./formatter/interface";
import { Fixer } from "./fixer";

class Printer {
  public verbosity: number;
  public format: IFormat;
  public readonly messages: IMessage[] = [];

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

    if (this.verbosity > 1) {
      const queryForPrint = JSON.stringify(tokenised.getContent());
      const promptForPrint = `Linting Query: ${queryForPrint}`;
      const tokenisedForPrint = JSON.stringify(tokenised, null, 4);
      console.log(promptForPrint);
      console.log(tokenisedForPrint);
    }

    if (result.content) {
      const message = this.format.getMessage(
        prefix,
        result,
        this.verbosity,
      );

      if (typeof message !== "string") {
        this.messages.push(message);
        return;
      }

      console.log(message);

      // If there are any errors whatsoever, we want to exit
      // with 1 for build scripts and the like.
      process.exitCode = 1;
    }
  }

  public printFix(query: Query[]) {
    const fixer = new Fixer();
    const fixed = fixer.fix(query[0]);
    console.log(fixed);
  }

  public warnAboutUncategoriseableQuery(content: string, tokenised: Query, prefix: string) {
    const title = "Unable to lint query";
    const url = encodeURI(
      `https://github.com/joereynolds/sql-lint/issues/new?title=${title}&body=${content}`
    );

    const lineNumber = tokenised.lines[0].num;

    const errorMessage = `${prefix}:${lineNumber} sql-lint was unable to lint the following query "${content}".` +
        `This could be a bug with sql-lint. Visit this URL to create a bug report: ${url}`

    console.log(errorMessage);
  }

  public warnAboutNoStdinStream() {
    console.log(
`sql-lint requires either a file, directory or stdin as an argument
file/directory example:
    sql-lint .           # recurse from current directory
    sql-lint db/         # lint the db/ directory
    sql-lint my-file.sql # lint my-file.sql

stdin example:
    echo 'DELETE FROM person;' | sql-lint
`
    );
  }

  public warnAboutFileNotFound(file: string) {
    console.log(`Can't open file ${file}. Does it exist?`);
  }

  public warnAboutNoConfiguration(file: string) {
    if (this.verbosity) {
      console.log(
        `Can't open file ${file}. Does it exist?` +
          "\nA configuration file will enable errors from your DB server and give better error reporting." +
          "\nRead more here: https://sql-lint.readthedocs.io/en/latest/files/configuration.html" +
          "\n"
      );
    }
  }
}

export { Printer };
