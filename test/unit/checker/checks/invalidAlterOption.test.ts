import { InvalidAlterOption } from "../../../../src/checker/checks/invalidAlterOption";

test("It is applied to the correct category", () => {
  const checker = new InvalidAlterOption();
  const expected = "alter";
  const actual = checker.appliesTo[0];
  expect(actual).toEqual(expected);
});
