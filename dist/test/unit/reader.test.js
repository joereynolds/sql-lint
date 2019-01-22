"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../../src/reader/reader");
test("We correctly read a file", () => {
    const query = new reader_1.Query();
    query.lines = [
        new reader_1.Line("DELETE", 1),
        new reader_1.Line(" FROM ", 2),
        new reader_1.Line(" person WHERE ", 4),
        new reader_1.Line(" age > 5;", 5)
    ];
    const expected = [query];
    const input = "DELETE\n FROM \n\n person WHERE \n age > 5;";
    const actual = reader_1.putContentIntoLines(input);
    expect(actual).toEqual(expected);
});
test("We ignore '--' comments in files", () => {
    const query = new reader_1.Query();
    query.lines = [
        new reader_1.Line("DELETE", 1),
        new reader_1.Line(" FROM ", 2),
        new reader_1.Line(" person WHERE ", 4),
        new reader_1.Line(" age > 5;", 6)
    ];
    const expected = [query];
    const input = "DELETE\n FROM \n\n person WHERE \n-- Remove old people\n age > 5;";
    const actual = reader_1.putContentIntoLines(input);
    expect(actual).toEqual(expected);
});
test("We ignore '#' comments in files", () => {
    const query = new reader_1.Query();
    query.lines = [
        new reader_1.Line("DELETE", 1),
        new reader_1.Line(" FROM ", 2),
        new reader_1.Line(" person WHERE ", 4),
        new reader_1.Line(" age > 5;", 6)
    ];
    const expected = [query];
    const input = "DELETE\n FROM \n\n person WHERE \n# Remove old people\n age > 5;";
    const actual = reader_1.putContentIntoLines(input);
    expect(actual).toEqual(expected);
});
test("We ignore '--' comments in files", () => {
    const query = new reader_1.Query();
    query.lines = [
        new reader_1.Line("DELETE", 1),
        new reader_1.Line(" FROM ", 2),
        new reader_1.Line(" person WHERE ", 4),
        new reader_1.Line(" age > 5;", 6)
    ];
    const expected = [query];
    const input = "DELETE\n FROM \n\n person WHERE \n/* Remove old people*/\n age > 5;";
    const actual = reader_1.putContentIntoLines(input);
    expect(actual).toEqual(expected);
});
test("We correctly reconstruct our query from lines", () => {
    const query = new reader_1.Query();
    query.lines = [
        new reader_1.Line("DELETE", 1),
        new reader_1.Line(" FROM ", 2),
        new reader_1.Line(" person WHERE ", 4),
        new reader_1.Line(" age > 5;", 5)
    ];
    const expected = "DELETE FROM  person WHERE  age > 5;";
    const actual = query.getContent();
    expect(actual).toEqual(expected);
});
//# sourceMappingURL=reader.test.js.map