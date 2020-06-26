import { SimpleFormat } from "../../../../src/formatter/formats/simple";
import { CheckerResult } from "../../../../src/checker/checkerResult";

test.each([
  ["test", new CheckerResult(1, "some content"), "test:1 some content", 0],
  [
    "test-extra",
    new CheckerResult(1, "some content", "more"),
    "test-extra:1 some content",
    0,
  ],
  [
    "test-again",
    new CheckerResult(1, "some content", "more"),
    "test-again:1 some content more",
    1,
  ],
])(
  "The format returns the message in the correct format",
  (prefix, result, expected, verbosity) => {
    const format = new SimpleFormat();
    const actual = format.getMessage(prefix, result, verbosity);
    expect(actual).toEqual(expected);
  }
);
