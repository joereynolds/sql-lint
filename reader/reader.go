// Checker for a query with no column specified in the select.
// e.g. "SELECT FROM person" is missing * or a column

package reader

import (
	"fmt"
    "strings"
	"io/ioutil"
)

// TODO -Make this return an array of queries, ';' is the terminator.
func GetQueriesFromFile(filepath string) []string {
	content, err := ioutil.ReadFile(filepath)

	if err != nil {
		fmt.Println(err)
	}

	return strings.Split(strings.TrimSpace(string(content)), ";")
}

// TODO -Make this return an array of queries, ';' is the terminator.
func GetQueriesFromString(query string) []string {
	return strings.Split(query, ";")
}
