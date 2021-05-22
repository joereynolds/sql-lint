import { CheckerResult } from "../checker/checkerResult";

interface IFormat {
  getMessage(prefix: string, result: CheckerResult, verbosity: number): string|any;
}

interface IMessage {
  line: number
  error: string
  source: string
  additionalInformation: string
}

export { IFormat, IMessage };
