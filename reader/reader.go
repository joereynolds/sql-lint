package reader

import (
	"bufio"
	"os"
)

type Line struct {
	Content    string
	LineNumber int
}

func GetQueriesFromString(query string) ([]Line, error) {
	return []Line{Line{Content: query}}, nil
}

func GetQueriesFromFile(filepath string) ([]Line, error) {

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

func GetQueryFromLineStruct(lines []Line) string {
	var query string

	for _, line := range lines {
		query += line.Content
	}

	return query
}
