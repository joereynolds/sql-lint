const TOKENS = {
    "keyword": [
        "select",
		"delete",
		"update",
		"from",
		"where",
		"set",
		"join",
		"having",
		"limit",
		"else",
		"if",
		"begin",
    ],

    "comment": ["#", "--"],
	"boolean":     ["true", "false", "null"],
	"conditional": ["and", "or"],
	"operator":    ["+", "-", "/"],
};

export { TOKENS };
