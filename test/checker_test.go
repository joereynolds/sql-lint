package lexer

import (
    "github.com/joereynolds/gauxilium/checker"
    "github.com/joereynolds/gauxilium/lexer"
    "github.com/stretchr/testify/assert"
    "testing"
)

func TestDeleteCheckerWarnsAboutMissingWhere(t *testing.T) {

    lex := lexer.Tokenise("DELETE FROM person")
    check := checker.DeleteNoWhere{lex}

    actual := check.Check()

    assert.Equal(
        t,
        actual,
        checker.LintResult {
            Message: "Delete contains no WHERE clause, is this intentional?",
            HasError: 1,
            Line: 1,
            Column: 1,
        },
    )
}

func TestDeleteCheckerDoesNotWarnIfWherePresent(t *testing.T) {

    lex := lexer.Tokenise("DELETE FROM person WHERE name = 'john'")
    check := checker.DeleteNoWhere{lex}

    actual := check.Check()

    assert.Equal(
        t,
        actual,
        checker.LintResult {
            Message: "",
            HasError: 0,
            Line: 0,
            Column: 0,
        },
    )
}
