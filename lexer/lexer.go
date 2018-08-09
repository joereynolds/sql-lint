package lexer

import (
	"fmt"
	"github.com/joereynolds/gauxilium/reader"
	"strings"
)

var token = map[string][]string{
	"keyword": {
		"select",
		"delete",
		"update",
		"from",
		"where",
		"set",
		"join",
		"having",
		"limit",
		"else",
		"if",
		"begin",
	},
	"comment":     {"#", "--"},
	"boolean":     {"true", "false", "null"},
	"conditional": {"and", "or"},
	"operator":    {"+", "-", "/"},
}

// Reads an SQL query and attempts to categorise it into
// the relevant statement.
// i.e.
// Categorise("SELECT name FROM users") -> "SELECT"
func Categorise(query []reader.Line) string {
	if strings.HasPrefix(strings.ToLower(strings.TrimSpace(query[0].Content)), "select") {
		return "select"
	}

	if strings.HasPrefix(strings.ToLower(strings.TrimSpace(query[0].Content)), "delete") {
		return "delete"
	}

	if strings.HasPrefix(strings.ToLower(strings.TrimSpace(query[0].Content)), "update") {
		return "update"
	}

	if strings.HasPrefix(strings.ToLower(strings.TrimSpace(query[0].Content)), "insert") {
		return "insert"
	}

	panic("Unknown query type, accepted types are [insert, update, delete, select]. Query: " + query[0].Content)
}

func Tokenise(query []reader.Line) []string {
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
		if strings.TrimSpace(strings.ToLower(item)) == strings.TrimSpace(strings.ToLower(s)) {
			return true
		}
	}

	return false
}
