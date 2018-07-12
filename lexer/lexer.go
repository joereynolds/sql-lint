package lexer

import (
    "strings"
    "fmt"
)

var token = map[string][]string {
    "keyword": {"select", "update", "from", "where", "set", "join", "having", "limit"},
    "comment": {"#", "--"},
}

func Tokenize(query string) map[string][]string {
    //TODO make this a struct
    tokens := map [string][]string {
        //MySQL keywords
        "keyword": {},

        //MySQL comments (-- or #)
        "comment": {},

        //Anything we haven't yet figured out
        "uncategorised": {},

        //Anything after a FROM statement is a table_reference
        "table_reference": {},
    }

    queryString := strings.Split(query, " ")

    for _, word := range queryString {
        //TODO loop through each key of the tokens array instead of hardcoding keyword, comment and uncategorised
        //TODO retain the order of the statement, we'll need to refactor this a bit to handle that.
        if stringInSlice(word, token["keyword"]) {
            tokens["keyword"] = append(tokens["keyword"], word)
        } else if stringInSlice(word, token["comment"]) {
            tokens["comment"] = append(tokens["comment"], word)
        } else {
            //TODO once we're happy with the structure as a whole, turn this to a panic
            fmt.Println("Didn't recognise word '" + word + "', continuing..." )
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
