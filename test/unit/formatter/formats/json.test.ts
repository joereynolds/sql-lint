import { JsonFormat } from "../../../../src/formatter/formats/json";
import { CheckerResult } from "../../../../src/checker/checkerResult";

test.each([
  [
    "test",
    new CheckerResult(1, "some content"),
    '{"source":"test","error":"some content","line":1,"additionalInformation":""}',
    1,
  ],
  [
    "test-another",
    new CheckerResult(1, "some content", "some extras"),
    '{"source":"test-another","error":"some content","line":1,"additionalInformation":"some extras"}',
    1,
  ],
  [
    "test-more",
    new CheckerResult(1, "some content", "some extras"),
    '{"source":"test-more","error":"some content","line":1,"additionalInformation":""}',
    0,
  ],
])(
  "The format returns the message in the correct format and additionalInformation if verbosity exists",
  (prefix, result, expected, verbosity) => {
    const format = new JsonFormat();
    const actual = format.getMessage(prefix, result, verbosity);
    expect(actual).toEqual(expected);
  }
);
