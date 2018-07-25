package lexer

import (
    "strings"
)

var token = map[string][]string {
    "keyword": {"select", "update", "from", "where", "set", "join", "having", "limit"},
    "comment": {"#", "--"},
}

func Tokenize(query string) []string {
    tokens := []string {}

    queryString := strings.Split(query, " ")

    for _, word := range queryString {
        if stringInSlice(word, token["keyword"]) {
            tokens = append(tokens, []string{"keyword", word}...)
        } else {
            //TODO once we're happy with the structure as a whole, turn this to a panic
            tokens = append(tokens, []string{"unknown token", word}...)
        }
    }

    return tokens
}

func stringInSlice(s string, list []string) (bool) {
    for _, item := range list {
        if strings.ToLower(item) == strings.ToLower(s) {
            return true
        }
    }

    return false
}
