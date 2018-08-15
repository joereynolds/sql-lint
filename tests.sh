# For times when unit tests aren't enough,
# you have to get some hair on your chest
# and resort to bash.

set -e

. assert.sh


# We expect a warning about a bad code point
assert "sql-lint --query='SELECT � AS name;'" "CheckerResult { line: 0, content: 'Bad code point', tokens: '' }"

# We expect a DELETE without a where to prompt us
assert "sql-lint --query='DELETE FROM person ;'" "CheckerResult {\n  line: 0,\n  content: 'Delete missing WHERE, intentional?',\n  tokens: '' }"

# end of test suite
assert_end sql-lint
