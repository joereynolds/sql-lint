package main    

import (
    "fmt"
    "sqlcheck/checker"
    "sqlcheck/lexer"
    "sqlcheck/lexer/manipulation"
)

func main() {
    a := checker.NotFoundColumn{"SELECT * FROM SOMETHING"}

    b := lexer.Tokenise("SELECT * FROM SOMETHING AND SOMETHING")
    category := lexer.Categorise(" SELECT * FROM whatever")

    fmt.Println(category)
    fmt.Println(b)

    manipulation.Tokenise()

    checks := []checker.Checker{a}

    for _, check := range checks {
        fmt.Println(check.Check())
    }
}
