package main    

import (
    "fmt"
    "github.com/joereynolds/gauxilium/checker"
    "github.com/joereynolds/gauxilium/lexer"
)

func main() {
    a := checker.NotFoundColumn{"SELECT * FROM SOMETHING"}
    b := lexer.Tokenise("SELECT * FROM SOMETHING AND SOMETHING")

    fmt.Println(b)

    checks := []checker.Checker{a}

    for _, check := range checks {
        fmt.Println(check.Check())
    }
}
