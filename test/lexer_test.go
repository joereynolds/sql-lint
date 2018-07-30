package lexer

import (
	"github.com/joereynolds/gauxilium/lexer"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestLexerCategorisesQueriesCorrectly(t *testing.T) {

	tables := []struct {
		actual   string
		expected string
	}{
		{
			// Normal select
			lexer.Categorise("SELECT * FROM person"),
			"select",
		},
		{
			// Select with whitespace
			lexer.Categorise("    SELECT * FROM person"),
			"select",
		},
		{
			// Select with lowercase
			lexer.Categorise("    select * from person"),
			"select",
		},
		{
			// delete
			lexer.Categorise("DELETE FROM person WHERE id = 5"),
			"delete",
		},
		{
			lexer.Categorise("INSERT INTO person"),
			"insert",
		},
	}

	for _, test := range tables {
		assert.Equal(t, test.expected, test.actual)
	}
}

func TestLexerCategorisesSelectStatementsCorrectly(t *testing.T) {

	tables := []struct {
		actual   []string
		expected []string
	}{
		{
			// *
			lexer.TokeniseSelect("SELECT * FROM person"),
			[]string{"keyword", "SELECT", "table_reference", "*", "keyword", "FROM", "table_reference", "person"},
		},
		{
			// A named column
			lexer.TokeniseSelect("SELECT surname FROM person"),
			[]string{"keyword", "SELECT", "table_reference", "surname", "keyword", "FROM", "table_reference", "person"},
		},
		{
			//Missing a table_reference
			lexer.TokeniseSelect("SELECT FROM person"),
			[]string{"keyword", "SELECT", "keyword", "FROM", "table_reference", "person"},
		},
		{
			//KEYWORD in place of table_reference
			lexer.TokeniseSelect("SELECT UPDATE FROM person"),
			[]string{"keyword", "SELECT", "keyword", "UPDATE", "keyword", "FROM", "table_reference", "person"},
		},
	}

	for _, test := range tables {
		assert.Equal(t, test.expected, test.actual)
	}

}

func TestLexerCategorisesDeleteStatementsCorrectly(t *testing.T) {

	tables := []struct {
		actual   []string
		expected []string
	}{
		{
			// Delete without a where
			lexer.TokeniseSelect("DELETE FROM person"),
			[]string{"keyword", "DELETE", "keyword", "FROM", "table_reference", "person"},
		},
	}

	for _, test := range tables {
		assert.Equal(t, test.expected, test.actual)
	}

}
