// Checker for columns that cannot be found in a certain table.
package checker

type NotFoundColumn struct {
    SqlQuery string
}

func (nfc NotFoundColumn) Check() int {
    return 1
}
