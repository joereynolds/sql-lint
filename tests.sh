# For times when unit tests aren't enough,
# you have to get some hair on your chest
# and resort to bash.

set -e

. assert.sh

echo "We expect a warning about a bad code point"
assert "./dist/src/main.js --query='SELECT � AS name;'" "query:1 Bad code point\nquery:1 [ER_BAD_FIELD_ERROR] Unknown column '�' in 'field list'"

echo "We expect a DELETE without a where to prompt us"
assert "./dist/src/main.js --query='DELETE FROM person ;'" "query:1 Delete missing WHERE, intentional?"

echo "We expect stdin to work"
assert "echo 'DELETE FROM person ;' | ./dist/src/main.js" "stdin:1 Delete missing WHERE, intentional?"

echo "We expect it to tell us if it can't find a file"
assert "./dist/src/main.js -f non-existent-file.here" "Can't open file non-existent-file.here. Does it exist?"

echo "We expect a version number to be output"
assert "./dist/src/main.js --version" "0.0.7"




assert_end sql-lint

# docker-compose down
# docker-compose rm -v
# docker-compose up --build -d --force-recreate
