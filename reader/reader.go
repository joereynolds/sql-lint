package reader

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
)

type Line struct {
	Content    string
	LineNumber int
}

func GetQueriesFromFile(filepath string) []string {
	content, err := ioutil.ReadFile(filepath)

	if err != nil {
		fmt.Println(err)
	}

	return strings.Split(strings.TrimSpace(string(content)), ";")
}

func GetQueriesFromString(query string) []string {
	return strings.Split(query, ";")
}

func GetQueriesFromFileTwo(filepath string) ([]Line, error) {

	file, err := os.Open(filepath)
	reader := bufio.NewReader(file)
	lines := []Line{}
	currentLineNumber := 1
	defer file.Close()

	if err != nil {
		return lines, err
	}

	for {
		line, err := reader.ReadString('\n')

		lines = append(lines, Line{
			line,
			currentLineNumber,
		})

		currentLineNumber++

		if err != nil {
			break
		}
	}

	return lines, err
}
