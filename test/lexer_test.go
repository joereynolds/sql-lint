package lexer

import (
    "sqlcheck/lexer"
    "testing"
)

func TextLexerSplitsAtSpace(t *testing.T) {

    lexer.Tokenize("")
}

func TestLexer(t *testing.T) {
    if 1 != 2 {
        t.Errorf("1 does not equal 2")
    }
}
