import { CheckerResult } from "../checker/checkerResult";

export interface IFormat {
  getMessage(
    prefix: string,
    result: CheckerResult,
    verbosity: number
  ): string | IMessage;
}

export interface IMessage {
  line: number;
  error: string;
  source: string;
  additionalInformation: string;
}
