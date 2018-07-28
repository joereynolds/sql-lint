// Triggered when a delete has no where clause
package checker

import (
    "github.com/joereynolds/gauxilium/lexer"
)

type DeleteNoWhere struct {
	SqlQuery []string
}

func (dnw DeleteNoWhere) Check() LintResult {

    // Very naive for now
    if lexer.StringInSlice("where", dnw.SqlQuery) {
        return LintResult {
            "",
            0,
            0,
            0,
        }
    }
    
    return LintResult {
        "Delete contains no WHERE clause, is this intentional?",
        1,
        1,
        1,
    }
}
