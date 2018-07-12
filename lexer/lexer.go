package lexer

import (
    "strings"
    "fmt"
)

var token = map[string][]string {
    "keyword": {"select", "update"},
    "comment": {"#", "--"},
}

func Tokenize(query string) string {

    tokens := map [string][]string {
        "keyword": {},
        "comment": {},
        "uncategorised": {},
    }

    l := strings.Split(query, " ")

    for _, word := range l {
        if stringInSlice(word, token["keyword"]) {
            tokens["keyword"] = append(tokens["keyword"], word)
        } else if stringInSlice(word, token["comment"]) {
            tokens["comment"] = append(tokens["comment"], word)
        } else {
            tokens["uncategorised"] = append(tokens["uncategorised"], word)
        }

    }

    fmt.Println(tokens)

    return "tokenize here"
}

func stringInSlice(s string, list []string) (bool) {
    for _, item := range list {
        if strings.ToLower(item) == strings.ToLower(s) {
            return true
        }
    }

    return false
}
