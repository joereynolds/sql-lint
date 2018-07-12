package main    

import (
    "fmt"
    "sqlcheck/checker"
    "sqlcheck/lexer"
)

func main() {
    a := checker.NotFoundColumn{"SELECT * FROM SOMETHING"}

    b := lexer.Tokenize("SELECT * FROM SOMETHING AND SOMETHING")
    fmt.Println(b)

    checks := []checker.Checker{a}

    for _, check := range checks {
        fmt.Println(check.Check())
    }
}
