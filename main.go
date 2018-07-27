package main

import (
	"fmt"
	// "github.com/joereynolds/gauxilium/checker"
	"github.com/joereynolds/gauxilium/lexer"
)

func main() {
	b := lexer.Tokenise("SELECT * FROM person")

	fmt.Println(b)

	// a := checker.NotFoundColumn{"SELECT * FROM person"}
	// checks := []checker.Checker{a}

	// for _, check := range checks {
	// 	fmt.Println(check.Check())
	// }
}
