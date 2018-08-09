package lexer

import (
	"github.com/joereynolds/gauxilium/reader"
	"strings"
)

func TokeniseDelete(query []reader.Line) []string {

	tokens := []string{}
	queryString := strings.Split(reader.GetQueryFromLineStruct(query), " ")

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
