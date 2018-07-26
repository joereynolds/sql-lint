package lexer

import (
	"strings"
    "fmt"
)

// Reads an SQL query and attempts to categorise it into
// the relevant statement.
// i.e.
// Categorise("SELECT name FROM users") -> "SELECT"
func Categorise(query string) string {
	if strings.HasPrefix(strings.ToLower(strings.TrimSpace(query)), "select") {
		return "select"
	}

	if strings.HasPrefix(strings.ToLower(strings.TrimSpace(query)), "delete") {
		return "delete"
	}

    panic("Unknown query type, query: " + query)
}

var token = map[string][]string{
	"keyword":     {"select", "update", "from", "where", "set", "join", "having", "limit"},
	"select_expr": {"*"},
	"comment":     {"#", "--"},
}

// The entry point for tokenisation.
// It proxies through to the relevant lexer depending on what kind of query you supply.
func Tokenise(query string) []string {
	tokens := []string{}

	category := Categorise(query)

	switch category {
	case "select":
        tokens = TokeniseSelect(query)
	case "delete":
		fmt.Println("delete lexxing here")
	}

	return tokens
}


func stringInSlice(s string, list []string) bool {
	for _, item := range list {
		if strings.ToLower(item) == strings.ToLower(s) {
			return true
		}
	}

	return false
}
