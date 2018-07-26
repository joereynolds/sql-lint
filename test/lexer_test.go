package lexer

import (
    "github.com/joereynolds/gauxilium/lexer"
    "testing"
)

func TestLexerCategorisesQueriesCorrectly(t *testing.T) {

    tables := []struct {
        actual string 
        expected string
    } {
        {
            // Normal select
            "select",
            lexer.Categorise("SELECT * FROM person"),
        },
        {
            // Select with whitespace
            "select",
            lexer.Categorise("    SELECT * FROM person"),
        },
        {
            // Select with lowercase
            "select",
            lexer.Categorise("    select * from person"),
        },
        {
            // Select with lowercase
            "delete",
            lexer.Categorise("DELETE FROM person WHERE id = 5"),
        },
    }

    for _,test := range tables {
        if (test.actual != test.expected) {
            t.Errorf("[Actual] '" + test.actual + "' [Expected] '" + test.expected + "'")
        }
    }
}

