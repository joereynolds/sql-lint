package lexer

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"os/exec"
	"testing"
)

func TestCommandGivesHelpIfNoArgsSupplied(t *testing.T) {
	actual, err := exec.Command("go", "run", "../main.go").CombinedOutput()

	if err != nil {
		fmt.Println(err)
	}

	expected := "Please supply either a query with the `--query` flag or a file with the `--file` flag.\n"

	assert.Equal(t, expected, string(actual))
}

// func TestCommandThroughActualUse(t *testing.T) {
// 	tables := []struct {
// 		actual   string
// 		expected string
// 	}{
// 		{
// 			// Normal select
// 			lexer.Categorise([]reader.Line{reader.Line{Content: "SELECT * FROM person"}}),
// 			"select",
// 		},
// 		{
// 			// Select with whitespace
// 			lexer.Categorise([]reader.Line{reader.Line{Content: "    SELECT * FROM person"}}),
// 			"select",
// 		},
// 		{
// 			// Select with lowercase
// 			lexer.Categorise([]reader.Line{reader.Line{Content: "    select * from person"}}),
// 			"select",
// 		},
// 		{
// 			// delete
// 			lexer.Categorise([]reader.Line{reader.Line{Content: "DELETE FROM person WHERE id = 5"}}),
// 			"delete",
// 		},
// 		{
// 			lexer.Categorise([]reader.Line{reader.Line{Content: "INSERT INTO person"}}),
// 			"insert",
// 		},
// 	}

// 	for _, test := range tables {
// 		assert.Equal(t, test.expected, test.actual)
// 	}
// }
