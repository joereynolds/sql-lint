package main

import (
	"fmt"
	"github.com/joereynolds/gauxilium/checker"
	"github.com/joereynolds/gauxilium/lexer"
)

func main() {
	b := lexer.Tokenise("SELECT person FROM person WHERE name = 'test'")

	fmt.Println(b)

	a := checker.NotFoundColumn{"SELECT * FROM person"}
	checks := []checker.Checker{a}

	for _, check := range checks {
		fmt.Println(check.Check())
	}
}
