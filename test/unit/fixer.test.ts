import { Fixer } from "../../src/fixer";
import { Line } from "../../src/reader/line";
import { Query } from "../../src/reader/query";

test("A keyword is given its own line", () => { 


    const inputQuery = new Query();
    inputQuery.lines = [
      new Line("DELETE FROM person;", 1),
    ];

    const expectedQuery = new Query();
    expectedQuery.lines = [
      new Line("DELETE", 1),
      new Line("FROM", 2),
      new Line("person;", 3),
    ];

    const fixer = new Fixer();
    const expected = '\nSELECT\n';
    const actual = fixer.fix(inputQuery);
    expect(1).toEqual(expected);
});
