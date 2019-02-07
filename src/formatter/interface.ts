import { CheckerResult } from "../checker/checkerResult";

interface IFormat {
  getMessage(prefix: string, result: CheckerResult ): string;
}

export { IFormat };
