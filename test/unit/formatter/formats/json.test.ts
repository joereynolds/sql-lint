import { JsonFormat } from "../../../../src/formatter/formats/json";
import { CheckerResult } from "../../../../src/checker/checkerResult";

test.each([
  [
    "test",
    new CheckerResult(1, "some content"),
    {
      line:1,
      source: "test",
      error: "some content",
      additionalInformation: "",
    },
    1,
  ],
  [
    "test-another",
    new CheckerResult(1, "some content", "some extras"),
    {
      line: 1,
      error: "some content",
      source: "test-another",
      additionalInformation: "some extras",
    },
    1,
  ],
  [
    "test-more",
    new CheckerResult(1, "some content", "some extras"),
    {
      line: 1,
      source: "test-more",
      error: "some content",
      additionalInformation: "" ,
    },
    0,
  ],
])(
  "The format returns the message in the correct format and additionalInformation if verbosity exists",
  (prefix, result, expected, verbosity) => {
    const format = new JsonFormat();
    const actual = format.getMessage(prefix, result, verbosity);
    expect(actual).toMatchObject(expected);
  }
);
