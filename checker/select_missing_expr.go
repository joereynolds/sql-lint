// Checker for a query with no column specified in the select.
// e.g. "SELECT FROM person" is missing * or a column

package checker

import (
// "github.com/joereynolds/gauxilium/lexer"
// "regexp"
// "fmt"
// "strings"
)

type SelectMissingExpr struct {
	SqlQuery []string
}

func (sme SelectMissingExpr) Check() LintResult {

	return LintResult{
		"SELECT statement is missing a column name after `SELECT`. This is a hardcoded response. FIXME",
		1,
		1,
		1,
	}
}
