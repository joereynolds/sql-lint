import { SimpleFormat } from "../../../../src/formatter/formats/simple";
import { CheckerResult } from "../../../../src/checker/checkerResult";

test.each([
  ["test", new CheckerResult(1, "some content"), "test:1 some content"]
])(
  "The format returns the message in the correct format",
  (prefix, result, expected) => {
    const format = new SimpleFormat();
    const actual = format.getMessage(prefix, result);
    expect(actual).toEqual(expected);
  }
);
