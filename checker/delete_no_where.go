// Triggered when a delete has no where clause
package checker

type DeleteNoWhere struct {
	SqlQuery string
}

func (dnw DeleteNoWhere) Check() int {
	return 1
}
