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
	verbose := flag.Bool("verbose", false, "Whether we want more information to be displayed")
	flag.Parse()

	if *file == "" && *query == "" {
		fmt.Println("Please supply either a query with the `--query` flag or a file with the `--file` flag.")
		return
	}

	if *query != "" {
		queryToLint, err := reader.GetQueriesFromString(*query)
		lintQueries(queryToLint, *verbose)
		if err != nil {
			fmt.Println(err)
		}
		return
	}

	if *file != "" {
		queryToLint, err := reader.GetQueriesFromFile(*file)
		lintQueries(queryToLint, *verbose)
		if err != nil {
			fmt.Println(err)
		}
		return
	}
}

func lintQueries(queries []reader.Line, verbose bool) {

	defer func() {
		if r := recover(); r != nil {
			fmt.Println(r)
			os.Exit(2)
		}
	}()

	if verbose {
		fmt.Println("Linting `" + reader.GetQueryFromLineStruct(queries) + "`")
	}

	tokenised := lexer.Tokenise(queries)
	category := lexer.Categorise(queries)

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
