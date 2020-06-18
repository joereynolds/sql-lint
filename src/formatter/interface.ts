import { CheckerResult } from "../checker/checkerResult";

interface IFormat {
  getMessage(prefix: string, result: CheckerResult, verbosity: number): string;
}

export { IFormat };
