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

	reader.GetQueriesFromFileTwo(*file)

	lintQueries(queryToLint)
}

func lintQueries(queries []string) {

	defer func() {
		if r := recover(); r != nil {
			fmt.Println(r)
			os.Exit(2)

		}
	}()

	for _, query := range queries {
		if len(query) > 0 {
			fmt.Println(len(query))
			fmt.Println("Linting `" + query + "`")

			tokenised := lexer.Tokenise(query)
			category := lexer.Categorise(query)

			selectChecks := []checker.Checker{
				checker.SelectMissingExpr{tokenised},
			}

			deleteChecks := []checker.Checker{
				checker.DeleteNoWhere{tokenised},
			}

			switch category {
			case "select":
				for _, check := range selectChecks {
					fmt.Println(check.Check())
				}
			case "delete":
				for _, check := range deleteChecks {
					fmt.Println(check.Check())
				}
			}
		}
	}
}
