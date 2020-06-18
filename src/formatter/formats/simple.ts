import { IFormat } from "../interface";
import { CheckerResult } from "../../checker/checkerResult";

class SimpleFormat implements IFormat {
  public getMessage(prefix: string, result: CheckerResult, verbosity: number) {
    if (verbosity) {
      return `${prefix}:${result.line} ${result.content} ${result.additionalInformation}`;
    }
    return `${prefix}:${result.line} ${result.content}`;
  }
}

export { SimpleFormat };
