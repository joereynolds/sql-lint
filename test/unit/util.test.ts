import { titleCase } from "../../src/util";

test("A keyword is given its own line", () => {
  const expected = "Select";
  const actual = titleCase("select");
  expect(actual).toEqual(expected);
});
