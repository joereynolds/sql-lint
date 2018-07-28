package lexer

import (
	"strings"
)

func TokeniseDelete(query string) []string {

	tokens := []string{}
	queryString := strings.Split(query, " ")

	lastAdded := ""
	for i, word := range queryString {

		if StringInSlice(word, token["keyword"]) {
			tokens = append(tokens, []string{"keyword", word}...)
		} else if i > 0 && lastAdded == "FROM" {
			tokens = append(tokens, []string{"table_reference", word}...)
		} else {
			//TODO once we're happy with the structure as a whole, turn this to a panic
			tokens = append(tokens, []string{"???", word}...)
		}
		lastAdded = word
	}

	return tokens
}
