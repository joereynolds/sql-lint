package lexer

import (
	"strings"
    "fmt"
)

var token = map[string][]string{
	"keyword":     {"select", "update", "from", "where", "set", "join", "having", "limit"},
	"select_expr": {"*"},
	"comment":     {"#", "--"},
}

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

	return "Unknown query"
}

// The entry point for tokenisation.
// It proxies through to the relevant lexer depending on what kind of query you supply.
func Tokenise(query string) []string {
	tokens := []string{}

	category := Categorise(query)

	switch category {
	case "select":
		fmt.Println("select lexxing here")
	case "delete":
		fmt.Println("delete lexxing here")
	}

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

func stringInSlice(s string, list []string) bool {
	for _, item := range list {
		if strings.ToLower(item) == strings.ToLower(s) {
			return true
		}
	}

	return false
}
