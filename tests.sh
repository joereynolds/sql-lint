# For times when unit tests aren't enough,
# you have to get some hair on your chest
# and resort to bash.

set -e

. assert.sh

echo "We expect a warning about a bad code point"
assert "./dist/src/main.js --query='SELECT � AS name;'" "query:1 Bad code point\nquery:1 [ER_BAD_FIELD_ERROR] Unknown column '�' in 'field list'"

echo "We expect a DELETE without a where to prompt us"
assert "./dist/src/main.js --query='DELETE FROM person ;'" "query:1 Delete missing WHERE, intentional?\nquery:1 [ER_PARSE_ERROR] You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'DELETE FROM person' at line 1"

echo "We expect stdin to work"
assert "echo 'DELETE FROM person ;' | ./dist/src/main.js" "stdin:1 Delete missing WHERE, intentional?\nstdin:1 [ER_PARSE_ERROR] You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'DELETE FROM person' at line 1"
assert_end sql-lint

# docker-compose down
# docker-compose rm -v
# docker-compose up --build -d --force-recreate
