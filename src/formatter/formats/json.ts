import { IFormat } from "../interface";
import { CheckerResult } from "../../checker/checkerResult";

class JsonFormat implements IFormat {
  public getMessage(prefix: string, result: CheckerResult, verbosity: number) {
    const message = {
      source: prefix,
      error: result.content,
      line: result.line,
      additionalInformation: "",
    };

    if (verbosity) {
      message.additionalInformation = result.additionalInformation;
    }

    return message;
  }
}

export { JsonFormat };
