package lexer

var t = map[string][]string {
    "keyword": {"select", "update"},
    "comment": {"#", "--"},
    "splitAt": {" "},
}

func Tokenize() string {
    return "tokenize here"
}
