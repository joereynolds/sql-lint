import { IFormat } from "../interface";
import { CheckerResult } from "../../checker/checkerResult";

class JsonFormat implements IFormat {
  public getMessage(prefix: string, result: CheckerResult) {
    const message = {
      source: prefix,
      error: result.content,
      line: result.line
    };
    return JSON.stringify(message);
  }
}

export { JsonFormat };
