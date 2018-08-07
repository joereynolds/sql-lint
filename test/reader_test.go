package lexer

import (
	"github.com/joereynolds/gauxilium/reader"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestReaderCorrectlyNumbersFileAndContents(t *testing.T) {

	expected := []reader.Line{
		reader.Line{
			Content:    "DELETE FROM \n",
			LineNumber: 1,
		},
		reader.Line{
			Content:    "person  \n",
			LineNumber: 2,
		},
		reader.Line{
			Content:    "WHERE\n",
			LineNumber: 3,
		},
		reader.Line{
			Content:    "age\n",
			LineNumber: 4,
		},
		reader.Line{
			Content:    "\n",
			LineNumber: 5,
		},
		reader.Line{
			Content:    "> \n",
			LineNumber: 6,
		},
		reader.Line{
			Content:    "\n",
			LineNumber: 7,
		},
		reader.Line{
			Content:    "6;\n",
			LineNumber: 8,
		},
		reader.Line{
			Content:    "",
			LineNumber: 9,
		},
	}

	actual, _ := reader.GetQueriesFromFileTwo("./test.sql")
	assert.Equal(t, expected, actual)
}
