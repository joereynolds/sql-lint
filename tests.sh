# For times when unit tests aren't enough,
# you have to get some hair on your chest
# and resort to bash.

set -e

. assert.sh


 
echo "We expect a warning about a bad code point"
assert "./dist/src/main.js --query='SELECT � AS name;'" "CheckerResult { line: 0, content: 'Bad code point', tokens: '' }"

echo "We expect a DELETE without a where to prompt us"
assert "./dist/src/main.js --query='DELETE FROM person ;'" "CheckerResult {\n  line: 1,\n  content: 'Delete missing WHERE, intentional?',\n  tokens: '' }"

# end of test suite
assert_end sql-lint
