import { JsonFormat } from "../../../../src/formatter/formats/json";
import { CheckerResult } from "../../../../src/checker/checkerResult";

test.each([
  [
    "test",
    new CheckerResult(1, "some content"),
    '{"source":"test","error":"some content","line":1}'
  ]
])(
  "The format returns the message in the correct format",
  (prefix, result, expected) => {
    const format = new JsonFormat();
    const actual = format.getMessage(prefix, result);
    expect(actual).toEqual(expected);
  }
);
