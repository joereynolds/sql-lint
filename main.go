package main

import (
	"flag"
	"fmt"
	"github.com/joereynolds/gauxilium/checker"
	"github.com/joereynolds/gauxilium/lexer"
	"github.com/joereynolds/gauxilium/reader"
	"os"
)

func main() {
	file := flag.String("file", "", "The path of the file to lint")
	query := flag.String("query", "", "The query to execute")
	flag.Parse()

	if *file == "" && *query == "" {
		fmt.Println("Please supply either a query with the `--query` flag or a file with the `--file` flag.")
		os.Exit(2)
	}

	queryToLint := reader.GetQueriesFromString(*query)

	if *file != "" {
		queryToLint = reader.GetQueriesFromFile(*file)
	}

	lintQueries(queryToLint)
}

func lintQueries(queries []string) {
	for _, query := range queries {
		fmt.Println("Linting `" + query + "`")

		b := lexer.Tokenise(query)

		deleteNoWhere := checker.DeleteNoWhere{b}
		selectMissingExpr := checker.SelectMissingExpr{b}

		checks := []checker.Checker{
			deleteNoWhere,
			selectMissingExpr,
		}

		for _, check := range checks {
			fmt.Println(check.Check())
		}
	}

}
