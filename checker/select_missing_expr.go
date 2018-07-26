// Checker for columns that cannot be found in a certain table.
package checker

type SelectMissingExpr struct {
    SqlQuery string
}

func (sme SelectMissingExpr) Check() int {
    return 1
}
