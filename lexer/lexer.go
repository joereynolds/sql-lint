package lexer

import (
	"fmt"
	"strings"
)

var token = map[string][]string{
	"keyword":     {"select", "delete", "update", "from", "where", "set", "join", "having", "limit", "else", "if", "begin"},
	"comment":     {"#", "--"},
	"boolean":     {"true", "false", "null"},
	"conditional": {"and", "or"},
	"operator":    {"+", "-", "/"},
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

	if strings.HasPrefix(strings.ToLower(strings.TrimSpace(query)), "update") {
		return "update"
	}

	panic("Unknown query type, query: " + query)
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
		tokens = TokeniseDelete(query)
	case "update":
		fmt.Println("update lexxing here")
	}

	return tokens
}

func StringInSlice(s string, list []string) bool {
	for _, item := range list {
		if strings.TrimSpace(strings.ToLower(item)) == strings.ToLower(s) {
			return true
		}
	}

	return false
}
