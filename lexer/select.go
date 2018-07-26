package lexer

import (
    "strings"
)

func TokeniseSelect(query string) []string {

	tokens := []string{}
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
