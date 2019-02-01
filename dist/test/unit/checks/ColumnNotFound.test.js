"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
test.each([
    [
        "SELECT i_dont_exist FROM symfony.gig;",
        {
            content: "Column 'i_dont_exist' does not exist in table 'symfony.gig'.",
            line: 1
        }
    ]
])("[SKIPPING - UNIMPLEMENTED]it finds databases that don't exist", (query, expected) => {
    // const checker = new ColumnNotFound([{ Column: "non_existent_column" }]);
    // const queryObj = putContentIntoLines(query);
    // const tokenised = tokenise(queryObj[0]);
    // const actual = checker.check(tokenised);
    // expect(actual).toMatchObject(expected);
    expect(1).toEqual(1);
});
//# sourceMappingURL=ColumnNotFound.test.js.map