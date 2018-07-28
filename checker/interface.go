package checker

type Checker interface {
	Check() LintResult
}

type LintResult struct {
	Message  string
	HasError int
	Line     int
	Column   int
}
