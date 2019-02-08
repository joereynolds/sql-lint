import { IFormat } from "../interface";
import { CheckerResult } from "../../checker/checkerResult";

class SimpleFormat implements IFormat {
  public getMessage(prefix: string, result: CheckerResult) {
    return `${prefix}:${result.line} ${result.content}`;
  }
}

export { SimpleFormat };
